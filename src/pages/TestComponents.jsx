import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ScoreBadge from '../components/ScoreBadge';
import QuoteCard from '../components/QuoteCard';
import RoleCard from '../components/RoleCard';
import ProfileCard from '../components/ProfileCard';
import PlaceholderChip from '../components/PlaceholderChip';
import DocumentViewer from '../components/DocumentViewer';

export default function TestComponents() {
  // Test props passed to components - verifying zero hardcoded text inside components
  const testSectionData = {
    numeral: 'IV',
    title: 'Component Showcase & Verification',
    subtitle: 'Sandbox testing ground for Section 4 reusable portfolio UI components.',
    tags: ['Architecture', 'Section 4', 'Testing', 'Static Ready'],
    journeyNote:
      'This note reflects on the development of core UI primitives, ensuring consistent typography, color tokens, and accessible document scaling.',
  };

  const testScoreData = {
    score: '98',
    maxScore: '100',
    label: 'Evaluation Rating',
    category: 'Demonstration Teaching',
    variant: 'maroon',
  };

  const testQuoteData = {
    quote:
      'The pre-service teacher exhibited high pedagogical fluency, active engagement with learners, and well-structured lesson execution throughout the entire observation period.',
    author: 'Resource Teacher Evaluator',
    role: 'Master Teacher II / Cooperating Mentor',
    context: 'Post-Observation Evaluation',
    date: 'Episode 5 Verification',
  };

  const testRoleData = {
    title: 'Teaching Assistant & Instructional Designer',
    role: 'Pre-Service Practicum Intern',
    period: 'Weeks 1–6 (First Half)',
    tag: 'Core Duty',
    description:
      'Collaborated directly with the cooperating teacher to prepare differentiated learning tasks and interactive whiteboard resources.',
    responsibilities: [
      'Facilitated small group collaborative reading circles.',
      'Developed contextualized formative assessment worksheets.',
      'Managed digital presentation slides and attendance tracking.',
    ],
  };

  const testProfileData = {
    name: 'Pre-Service Teacher Candidate',
    role: 'Student Teacher Intern',
    institution: 'College of Teacher Education',
    cooperatingSchool: 'Demonstration Laboratory High School',
    specialization: 'Bachelor of Secondary Education - English',
    bio: 'Dedicated future educator committed to evidence-based pedagogical design, inclusive classroom environments, and reflective practitioner inquiry.',
    details: [
      { label: 'Term & Academic Year', value: 'First Semester, A.Y. 2024–2025' },
      { label: 'Teaching Load', value: 'Grade 9 English (4 Sections)' },
      { label: 'Total Rendered Hours', value: '120 Hours (Verified via DTR)' },
      { label: 'Evaluation Status', value: 'Complete / All Task Sheets Passed' },
    ],
  };

  const testPlaceholderData = {
    label: 'PENDING MENTOR SIGNATURE',
    field: 'episode.evaluatorSignature',
    hint: 'Physical signature pending clearance from cooperating school office',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* 1. SectionHeader */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          1. SectionHeader Component
        </h2>
        <SectionHeader
          numeral={testSectionData.numeral}
          title={testSectionData.title}
          subtitle={testSectionData.subtitle}
          tags={testSectionData.tags}
          journeyNote={testSectionData.journeyNote}
        />
      </section>

      {/* 2. ScoreBadge */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          2. ScoreBadge Component
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ScoreBadge
            score={testScoreData.score}
            maxScore={testScoreData.maxScore}
            label={testScoreData.label}
            category={testScoreData.category}
            variant={testScoreData.variant}
          />
          <ScoreBadge
            score="4.00"
            maxScore="4.00"
            label="GPA Equivalent"
            category="Academic Rating"
            variant="teal"
          />
          <ScoreBadge
            score="Exemplary"
            label="Practicum Grade"
            variant="maroon"
          />
        </div>
      </section>

      {/* 3. PlaceholderChip */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          3. PlaceholderChip Component
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <PlaceholderChip
            label={testPlaceholderData.label}
            field={testPlaceholderData.field}
            hint={testPlaceholderData.hint}
          />
          <PlaceholderChip
            label="UNRESOLVED SCORE"
            field="taskSheet7.score"
          />
          <PlaceholderChip
            label="MISSING ATTACHMENT"
          />
        </div>
      </section>

      {/* 4. QuoteCard */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          4. QuoteCard Component
        </h2>
        <QuoteCard
          quote={testQuoteData.quote}
          author={testQuoteData.author}
          role={testQuoteData.role}
          context={testQuoteData.context}
          date={testQuoteData.date}
        />
      </section>

      {/* 5. RoleCard */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          5. RoleCard Component
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RoleCard
            title={testRoleData.title}
            role={testRoleData.role}
            period={testRoleData.period}
            tag={testRoleData.tag}
            description={testRoleData.description}
            responsibilities={testRoleData.responsibilities}
          />
          <RoleCard
            title="Action Research Investigator"
            role="Classroom Inquirer"
            period="Weeks 4–8"
            tag="CBAR Focus"
            description="Conducted diagnostic assessments on student reading comprehension and implemented graphic organizer interventions."
            responsibilities={[
              'Identified target instructional challenge.',
              'Administered pre-intervention diagnostic test.',
              'Logged behavioral response during intervention cycles.',
            ]}
          />
        </div>
      </section>

      {/* 6. ProfileCard */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
          6. ProfileCard Component
        </h2>
        <ProfileCard
          name={testProfileData.name}
          role={testProfileData.role}
          institution={testProfileData.institution}
          cooperatingSchool={testProfileData.cooperatingSchool}
          specialization={testProfileData.specialization}
          bio={testProfileData.bio}
          details={testProfileData.details}
        />
      </section>

      {/* 7. DocumentViewer */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
            7. DocumentViewer Component (Embedding local sample.pdf)
          </h2>
          <DocumentViewer
            url="/sample.pdf"
            title="Field Study 2: Verified Task Sheet Sample"
            height="400px"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-dark-teal/60">
            7b. DocumentViewer Pending Fallback (Testing missing / placeholder PDF)
          </h2>
          <DocumentViewer
            url="[ts-pending-artifact.pdf]"
            title="Task Sheet Pending Verification"
            height="320px"
          />
        </div>
      </section>
    </div>
  );
}

