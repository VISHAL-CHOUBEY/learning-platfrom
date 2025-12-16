import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, Lesson, Badge } from '../types';
import { INITIAL_USER, COURSES, BADGES } from '../data';

interface LearningContextType {
  user: User;
  courses: Course[];
  completeLesson: (lessonId: string, xpReward: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  addXP: (amount: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [courses] = useState<Course[]>(COURSES);

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      // Simple level up logic: Level = 1 + floor(xp / 1000)
      const newLevel = 1 + Math.floor(newXP / 1000);
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const completeLesson = (lessonId: string, xpReward: number = 50) => {
    if (user.completedLessons.includes(lessonId)) return;

    setUser(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId]
    }));
    addXP(xpReward);
  };

  const isLessonCompleted = (lessonId: string) => {
    return user.completedLessons.includes(lessonId);
  };

  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    let totalLessons = 0;
    let completed = 0;

    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        totalLessons++;
        if (user.completedLessons.includes(l.id)) {
          completed++;
        }
      });
    });

    if (totalLessons === 0) return 0;
    return Math.round((completed / totalLessons) * 100);
  };

  return (
    <LearningContext.Provider value={{ user, courses, completeLesson, isLessonCompleted, getCourseProgress, addXP }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
