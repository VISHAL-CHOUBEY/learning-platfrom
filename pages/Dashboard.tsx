import React from 'react';
import { useLearning } from '../context/LearningContext';
import { CourseCard } from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { Flame, Star } from 'lucide-react';

export const Dashboard = () => {
  const { courses, getCourseProgress, user } = useLearning();
  const navigate = useNavigate();

  const inProgressCourses = courses.filter(c => {
    const prog = getCourseProgress(c.id);
    return prog > 0 && prog < 100;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Hero / Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {user.name}!</h1>
            <p className="text-indigo-100 text-lg mb-6">
                You're on a <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">{user.streak} day streak</span>. 
                Keep learning to unlock the "Consistency King" badge!
            </p>
            <div className="flex gap-4">
                 <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-300 fill-current" />
                    <span className="font-bold">{user.xp} XP</span>
                 </div>
                 <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="font-bold">Lvl {user.level}</span>
                 </div>
            </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"></div>
      </div>

      {/* In Progress */}
      {inProgressCourses.length > 0 && (
        <section>
             <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
                Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map(course => (
                    <CourseCard 
                        key={course.id} 
                        course={course} 
                        progress={getCourseProgress(course.id)}
                        onClick={() => navigate(`/course/${course.id}`)}
                    />
                ))}
            </div>
        </section>
      )}

      {/* All Courses */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-8 bg-slate-800 rounded-full"></div>
            Explore Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard 
                    key={course.id} 
                    course={course} 
                    progress={getCourseProgress(course.id)}
                    onClick={() => navigate(`/course/${course.id}`)}
                />
            ))}
        </div>
      </section>
    </div>
  );
};
