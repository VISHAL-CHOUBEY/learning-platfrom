import React from 'react';
import { Clock, BarChart } from 'lucide-react';
import { Course } from '../types';
import { ProgressBar } from './ui/ProgressBar';

interface CourseCardProps {
  course: Course;
  progress?: number;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, progress = 0, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 group"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
          {course.level}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex gap-2 mb-2">
            {course.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-sm">
                    {tag}
                </span>
            ))}
        </div>
        <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {course.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.totalDuration}
          </div>
          <div className="flex items-center gap-1">
             <span className="font-medium text-slate-600">{course.instructor}</span>
          </div>
        </div>

        {progress > 0 ? (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">{progress}% Complete</span>
            </div>
            <ProgressBar progress={progress} className="h-1.5" />
          </div>
        ) : (
            <div className="w-full py-2 text-center text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Start Learning
            </div>
        )}
      </div>
    </div>
  );
};
