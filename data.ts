import { Course, Badge, LeaderboardEntry, User } from './types';

export const CURRENT_USER_ID = 'user_1';

export const INITIAL_USER: User = {
  id: CURRENT_USER_ID,
  name: "Alex Dev",
  avatar: "https://picsum.photos/id/64/100/100",
  xp: 1250,
  level: 5,
  streak: 3,
  badges: ['badge_1'],
  completedLessons: []
};

export const BADGES: Badge[] = [
  { id: 'badge_1', name: 'First Steps', description: 'Complete your first lesson', icon: '🌱', xpRequired: 0 },
  { id: 'badge_2', name: 'Quiz Master', description: 'Score 100% on 3 quizzes', icon: '🧠', xpRequired: 500 },
  { id: 'badge_3', name: 'React Rockstar', description: 'Finish the React Advanced course', icon: '⚛️', xpRequired: 2000 },
  { id: 'badge_4', name: 'AI Pioneer', description: 'Use the AI Tutor 10 times', icon: '🤖', xpRequired: 800 },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { id: 'u2', name: 'Sarah J.', xp: 3400, avatar: 'https://picsum.photos/id/65/100/100', rank: 1 },
  { id: 'u3', name: 'Mike T.', xp: 2850, avatar: 'https://picsum.photos/id/91/100/100', rank: 2 },
  { id: 'user_1', name: 'Alex Dev', xp: 1250, avatar: 'https://picsum.photos/id/64/100/100', rank: 3 },
  { id: 'u4', name: 'Emily R.', xp: 900, avatar: 'https://picsum.photos/id/103/100/100', rank: 4 },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced React Patterns',
    description: 'Master higher-order components, render props, and custom hooks to build scalable applications.',
    instructor: 'Cassidy Williams',
    thumbnail: 'https://picsum.photos/id/1/800/600',
    tags: ['React', 'Frontend', 'JavaScript'],
    totalDuration: '4h 30m',
    level: 'Advanced',
    modules: [
      {
        id: 'm1',
        title: 'Component Composition',
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to Compound Components',
            duration: '15 min',
            type: 'video',
            content: 'Compound components provide a flexible way to share state between parent and child components implicitly.',
            summary: 'Learn how to build compound components in React using Context API.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0' // Placeholder
          },
          {
            id: 'l2',
            title: 'Context API Best Practices',
            duration: '10 min',
            type: 'article',
            content: `
# Using Context Effectively

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## When to use Context

- Global state management (Theme, User Auth)
- Compound components
- Localization

## Pitfalls

- Avoid overusing Context for state that should be local.
- Be mindful of re-renders. Use \`useMemo\` for context values.
            `,
            summary: 'Deep dive into React Context API, when to use it, and performance considerations.'
          },
          {
            id: 'l3',
            title: 'Quiz: Composition',
            duration: '5 min',
            type: 'quiz',
            content: 'Test your knowledge on component patterns.',
            summary: 'Assessment on compound components and context.',
            quiz: {
              id: 'q1',
              question: 'Which hook is primarily used to consume a Context?',
              xpReward: 100,
              options: [
                { id: 'o1', text: 'useContext', isCorrect: true },
                { id: 'o2', text: 'useState', isCorrect: false },
                { id: 'o3', text: 'useEffect', isCorrect: false },
                { id: 'o4', text: 'useReducer', isCorrect: false },
              ]
            }
          }
        ]
      },
       {
        id: 'm2',
        title: 'Performance Optimization',
        lessons: [
          {
            id: 'l4',
            title: 'Memoization with useMemo and useCallback',
            duration: '20 min',
            type: 'video',
            content: 'Understanding when and how to memoize values and functions to prevent unnecessary re-renders.',
            summary: 'Learn about useMemo and useCallback hooks.',
          }
        ]
       }
    ]
  },
  {
    id: 'c2',
    title: 'Python for Data Science',
    description: 'From zero to hero in Data Analysis using Pandas, NumPy, and Matplotlib.',
    instructor: 'Dr. Angela Yu',
    thumbnail: 'https://picsum.photos/id/20/800/600',
    tags: ['Python', 'Data Science', 'Backend'],
    totalDuration: '6h 15m',
    level: 'Beginner',
    modules: [
        {
            id: 'm2_1',
            title: 'Introduction to Pandas',
            lessons: [
                {
                    id: 'l2_1',
                    title: 'DataFrames Basics',
                    duration: '12 min',
                    type: 'video',
                    content: 'Pandas DataFrames are 2-dimensional labeled data structures with columns of potentially different types.',
                    summary: 'Intro to Pandas DataFrames.'
                }
            ]
        }
    ]
  },
  {
    id: 'c3',
    title: 'UI/UX Principles for Developers',
    description: 'Learn the fundamentals of design, color theory, and typography to make your apps look great.',
    instructor: 'Gary Simon',
    thumbnail: 'https://picsum.photos/id/60/800/600',
    tags: ['Design', 'CSS', 'Figma'],
    totalDuration: '3h 45m',
    level: 'Intermediate',
    modules: []
  }
];
