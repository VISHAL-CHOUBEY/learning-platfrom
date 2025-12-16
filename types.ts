export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[]; // Badge IDs
  completedLessons: string[]; // Lesson IDs
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or Lucide icon name
  xpRequired: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "10 min"
  type: 'video' | 'article' | 'quiz';
  content: string; // Markdown or text content
  videoUrl?: string; // Placeholder for video ID/URL
  quiz?: Quiz;
  summary: string; // For AI context
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  tags: string[];
  totalDuration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  avatar: string;
  rank: number;
}
