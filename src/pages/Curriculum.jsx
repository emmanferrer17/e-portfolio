import React from 'react';
import { useParams } from 'react-router-dom';
import curriculumData from '../data/curriculum.json';
import SectionHeader from '../components/SectionHeader';
import TaskSheetSection from '../components/TaskSheetSection';

export default function Curriculum() {
  const { tsId } = useParams();
  const { checklistItem, title, journeyNote, overview, taskSheets } = curriculumData;

  // Find requested task sheet or default to TS2
  const activeTaskSheet =
    (tsId ? taskSheets.find((ts) => ts.id.toLowerCase() === tsId.toLowerCase()) : null) ||
    taskSheets[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="Where planning became practice: verified lesson logs, instructional materials, and assessment tools."
        tags={['Curriculum Design', 'Daily Lesson Logs', 'Task Sheets 2–7']}
        journeyNote={journeyNote}
      />

      {/* Section Overview Narrative Pill */}
      {overview && (
        <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] shadow-xs text-base leading-relaxed text-[#1E1B18]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] block mb-1">
            Section Overview
          </span>
          <p>{overview}</p>
        </div>
      )}

      {/* Architectural Studio Folder-Tab Console */}
      <TaskSheetSection
        taskSheet={activeTaskSheet}
        journeyNote={journeyNote}
        allTaskSheets={taskSheets}
      />
    </div>
  );
}
