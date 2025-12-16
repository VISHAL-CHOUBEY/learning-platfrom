import React from 'react';
import { LEADERBOARD } from '../data';
import { Trophy, Medal } from 'lucide-react';

export const Leaderboard = () => {
  const sortedUsers = [...LEADERBOARD].sort((a, b) => b.xp - a.xp);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Leaderboard</h1>
            <p className="text-slate-500">See who's leading the charts this week!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Top 3 Podium (Visual concept represented as list for now) */}
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                <span className="font-bold tracking-widest text-sm uppercase opacity-80">Rank</span>
                <span className="font-bold tracking-widest text-sm uppercase opacity-80">Student</span>
                <span className="font-bold tracking-widest text-sm uppercase opacity-80">XP</span>
            </div>
            
            <div>
                {sortedUsers.map((entry, index) => {
                    let rankIcon;
                    let rowClass = "flex items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors";
                    
                    if (index === 0) rankIcon = <Trophy className="w-6 h-6 text-yellow-500" />;
                    else if (index === 1) rankIcon = <Medal className="w-6 h-6 text-slate-400" />;
                    else if (index === 2) rankIcon = <Medal className="w-6 h-6 text-orange-400" />;
                    else rankIcon = <span className="font-bold text-slate-400 w-6 text-center">{index + 1}</span>;

                    return (
                        <div key={entry.id} className={rowClass}>
                            <div className="w-12 flex justify-center">{rankIcon}</div>
                            <div className="flex-1 flex items-center gap-4 ml-4">
                                <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full border border-slate-200" />
                                <span className={`font-bold ${index === 0 ? 'text-lg text-indigo-700' : 'text-slate-700'}`}>
                                    {entry.name}
                                </span>
                            </div>
                            <div className="font-mono font-bold text-slate-600">
                                {entry.xp.toLocaleString()} XP
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};
