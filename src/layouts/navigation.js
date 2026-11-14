export const SECTIONS = [
  {
    id: 'home',
    numeral: 'I',
    title: 'Overview & Contents',
    description: 'Portfolio overview, summary of episodes, and complete table of contents.',
    path: '/',
    isHome: true,
  },
  {
    id: 'introduction',
    numeral: 'II',
    title: 'Introduction',
    description: 'Statement of purpose, course overview, and portfolio framework.',
    path: '/introduction',
  },
  {
    id: 'about',
    numeral: 'III',
    title: 'About the Pre-Service Teacher',
    description: 'Teacher profile, biographical context, and placement background.',
    path: '/about',
  },
  {
    id: 'learning-environment',
    numeral: 'IV',
    title: 'Learning Environment',
    description: 'Classroom atmosphere and physical/virtual learning spaces.',
    path: '/learning-environment',
  },
  {
    id: 'curriculum',
    numeral: 'V',
    title: 'Understanding Curriculum',
    description: 'Curriculum alignment, competencies, and lesson delivery.',
    path: '/curriculum',
  },
  {
    id: 'professional-development',
    numeral: 'VI',
    title: 'Professional Development',
    description: 'Continuing growth, mentoring sessions, and development goals.',
    path: '/professional-development',
  },
  {
    id: 'microteaching',
    numeral: 'VII',
    title: 'Microteaching Practice',
    description: 'Demonstration teaching episodes, peer feedback, and teaching evaluations.',
    path: '/microteaching',
  },
  {
    id: 'cbar',
    numeral: 'VIII',
    title: 'Classroom-Based Action Research',
    description: 'Action research cycle, classroom inquiry, and instructional intervention.',
    path: '/cbar',
  },
  {
    id: 'philosophy',
    numeral: 'IX',
    title: 'Teaching Philosophy',
    description: 'Core pedagogical beliefs, learner-centered values, and teacher identity.',
    path: '/philosophy',
  },
  {
    id: 'appendices',
    numeral: 'X',
    title: 'Appendices',
    description: 'Documentary evidence, evaluation rubrics, certificates, and records.',
    path: '/appendices',
  },
];

export const VISIBLE_SECTIONS = SECTIONS.filter((s) => !s.hidden);

export function getAdjacentSections(currentPath) {
  const currentIndex = VISIBLE_SECTIONS.findIndex((s) => s.path === currentPath);
  if (currentIndex === -1) return { prev: null, next: null };
  const prev = currentIndex > 0 ? VISIBLE_SECTIONS[currentIndex - 1] : null;
  const next = currentIndex < VISIBLE_SECTIONS.length - 1 ? VISIBLE_SECTIONS[currentIndex + 1] : null;
  return { prev, next };
}
