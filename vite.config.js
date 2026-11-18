import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Scans public/assets recursively and returns all image paths relative to public/assets
 * with natural numeric sorting.
 */
function getAssetFiles() {
  const assetsDir = path.resolve(__dirname, 'public/assets');
  if (!fs.existsSync(assetsDir)) return [];

  function scan(dir, baseDir) {
    let results = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(scan(fullPath, baseDir));
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
            const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
            results.push(relPath);
          }
        }
      }
    } catch {
      // safely handle any directory read permissions
    }
    return results;
  }

  const files = scan(assetsDir, assetsDir);
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  return files;
}

/**
 * Vite plugin exposing dynamic virtual:asset-manifest module
 */
function assetManifestPlugin() {
  const virtualModuleId = 'virtual:asset-manifest';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'asset-manifest-plugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = getAssetFiles();
        return `export const assetFiles = ${JSON.stringify(files)};\nexport default assetFiles;`;
      }
    },
    configureServer(server) {
      const assetsDir = path.resolve(__dirname, 'public/assets');
      server.watcher.add(assetsDir);
      const reload = (filePath) => {
        const norm = filePath.replace(/\\/g, '/');
        if (norm.includes('/public/assets/')) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
          }
          server.ws.send({ type: 'full-reload' });
        }
      };
      server.watcher.on('add', reload);
      server.watcher.on('unlink', reload);
      server.watcher.on('change', reload);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), assetManifestPlugin()],
  base: '/e-portfolio/',
});
