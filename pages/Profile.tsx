import React from 'react';
import { useLearning } from '../context/LearningContext';
import { BADGES } from '../data';
import { Lock } from 'lucide-react';

export const Profile = () => {
  const { user } = useLearning();

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Stats */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-indigo-100" />
            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white">
                Lvl {user.level}
            </div>
        </div>
        <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.name}</h1>
            <p className="text-slate-500 mb-6">Passionate learner • React Enthusiast</p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div>
                    <div className="text-2xl font-bold text-slate-800">{user.xp}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-400">Total XP</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">{user.streak}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-400">Day Streak</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-800">{user.badges.length}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-400">Badges</div>
                </div>
            </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BADGES.map(badge => {
                const isUnlocked = user.badges.includes(badge.id);
                return (
                    <div 
                        key={badge.id}
                        className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                            isUnlocked 
                                ? 'bg-white border-indigo-100 shadow-sm' 
                                : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
                        }`}
                    >
                        <div className="text-4xl mb-3 relative">
                            {badge.icon}
                            {!isUnlocked && (
                                <div className="absolute -bottom-1 -right-1 bg-slate-500 rounded-full p-1 text-white">
                                    <Lock className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                        <h3 className="font-bold text-sm text-slate-800 mb-1">{badge.name}</h3>
                        <p className="text-xs text-slate-500">{badge.description}</p>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
