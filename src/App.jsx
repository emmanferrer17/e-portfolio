import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import About from './pages/About';
import LearningEnvironment from './pages/LearningEnvironment';
import Curriculum from './pages/Curriculum';
import ProfessionalDevelopment from './pages/ProfessionalDevelopment';
import Microteaching from './pages/Microteaching';
import Cbar from './pages/Cbar';
import Philosophy from './pages/Philosophy';
import Appendices from './pages/Appendices';
import TestComponents from './pages/TestComponents';
import Completeness from './pages/Completeness';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          {/* Section I: Home / Overview */}
          <Route index element={<Home />} />

          {/* Section II: Introduction */}
          <Route path="introduction" element={<Introduction />} />

          {/* Section III: About */}
          <Route path="about" element={<About />} />

          {/* Section IV: Learning Environment */}
          <Route path="learning-environment" element={<LearningEnvironment />} />

          {/* Section V: Curriculum and Planning (TS2 to TS7) */}
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="curriculum/:tsId" element={<Curriculum />} />

          {/* Section VI: Professional Development */}
          <Route path="professional-development" element={<ProfessionalDevelopment />} />

          {/* Section VII: Microteaching */}
          <Route path="microteaching" element={<Microteaching />} />

          {/* Section VIII: CBAR */}
          <Route path="cbar" element={<Cbar />} />

          {/* Section IX: Philosophy */}
          <Route path="philosophy" element={<Philosophy />} />

          {/* Section X: Appendices */}
          <Route path="appendices" element={<Appendices />} />

          {/* Hidden Internal Completeness Audit Dashboard (Not in Sidebar) */}
          <Route path="completeness" element={<Completeness />} />

          {/* Component Showcase Verification Route */}
          <Route path="test" element={<TestComponents />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
