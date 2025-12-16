import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { PlayCircle, CheckCircle, FileText, HelpCircle, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { AiTutor } from '../components/AiTutor';
import { QuizModal } from '../components/QuizModal';
import { Lesson } from '../types';

export const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, completeLesson, isLessonCompleted } = useLearning();
  
  const course = courses.find(c => c.id === courseId);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Set initial lesson
  useEffect(() => {
    if (course && course.modules.length > 0 && !activeLesson) {
      setActiveLesson(course.modules[0].lessons[0]);
    }
  }, [course]);

  if (!course || !activeLesson) return <div className="p-8">Loading...</div>;

  const handleLessonComplete = () => {
    if(activeLesson.type === 'quiz') {
        setShowQuiz(true);
    } else {
        completeLesson(activeLesson.id);
        // Maybe auto-advance logic here
    }
  };

  const handleQuizResult = (score: number) => {
    if (score >= 100) {
        completeLesson(activeLesson.id, activeLesson.quiz?.xpReward || 50);
        setShowQuiz(false);
    }
  };

  const isCompleted = isLessonCompleted(activeLesson.id);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6 animate-in slide-in-from-bottom-2 duration-500">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 text-sm font-medium">
                <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h2 className="font-bold text-slate-800">{course.title}</h2>
        </div>

        {/* Player / Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
            {activeLesson.type === 'video' ? (
                <div className="aspect-video bg-black w-full flex items-center justify-center relative group">
                    {/* Mock Video Player */}
                    {activeLesson.videoUrl ? (
                         <iframe 
                         width="100%" 
                         height="100%" 
                         src={activeLesson.videoUrl} 
                         title={activeLesson.title}
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                         className="w-full h-full"
                       ></iframe>
                    ) : (
                        <div className="text-white flex flex-col items-center gap-4">
                            <PlayCircle className="w-16 h-16 opacity-80" />
                            <p>Video Placeholder for "{activeLesson.title}"</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-8 max-w-3xl mx-auto">
                     <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
                        <h1 className="text-3xl font-bold mb-4">{activeLesson.title}</h1>
                        <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
                            {activeLesson.content}
                        </div>
                     </div>
                </div>
            )}
            
            {/* Description / Actions under content */}
            <div className="p-6 bg-white border-t border-slate-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{activeLesson.title}</h3>
                        <p className="text-slate-500 text-sm">{activeLesson.summary}</p>
                    </div>
                    <button 
                        onClick={handleLessonComplete}
                        disabled={isCompleted && activeLesson.type !== 'quiz'}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all
                            ${isCompleted 
                                ? 'bg-green-100 text-green-700 cursor-default' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
                            }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircle className="w-5 h-5" /> Completed
                            </>
                        ) : activeLesson.type === 'quiz' ? (
                            <>
                                <HelpCircle className="w-5 h-5" /> Start Quiz
                            </>
                        ) : (
                            <>
                                Mark Complete <ChevronRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Sidebar Curriculum */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">Course Curriculum</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {course.modules.map(module => (
                <div key={module.id}>
                    <h4 className="font-bold text-slate-800 mb-3 text-sm">{module.title}</h4>
                    <div className="space-y-2">
                        {module.lessons.map(lesson => {
                            const completed = isLessonCompleted(lesson.id);
                            const isActive = activeLesson.id === lesson.id;
                            
                            let Icon = FileText;
                            if (lesson.type === 'video') Icon = PlayCircle;
                            if (lesson.type === 'quiz') Icon = HelpCircle;

                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => setActiveLesson(lesson)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm transition-all border
                                        ${isActive 
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                                            : 'border-transparent hover:bg-slate-50 text-slate-600'
                                        }
                                    `}
                                >
                                    <div className={`${completed ? 'text-green-500' : isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                        {completed ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium line-clamp-1">{lesson.title}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{lesson.duration}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
      </div>

      <AiTutor context={`Course: ${course.title}\nLesson: ${activeLesson.title}\nContent: ${activeLesson.content}`} />
      
      {showQuiz && activeLesson.quiz && (
        <QuizModal 
            quiz={activeLesson.quiz} 
            onClose={() => setShowQuiz(false)} 
            onComplete={handleQuizResult} 
        />
      )}

    </div>
  );
};
