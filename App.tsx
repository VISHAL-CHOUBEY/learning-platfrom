import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, LogOut, LayoutDashboard, Zap } from 'lucide-react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Dashboard } from './pages/Dashboard';
import { CourseView } from './pages/CourseView';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';

// Sidebar Link Component
const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-600'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
      <span>{label}</span>
    </Link>
  );
};

// Main Layout Shell
const Layout = ({ children }: { children?: React.ReactNode }) => {
    const { user } = useLearning();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-40 hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Zap className="w-6 h-6 text-white fill-current" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">SkillForge</span>
                    </div>

                    <nav className="space-y-2">
                        <NavLink to="/" icon={LayoutDashboard} label="Dashboard" />
                        <NavLink to="/leaderboard" icon={Trophy} label="Leaderboard" />
                        <NavLink to="/profile" icon={User} label="My Profile" />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-100">
                     <div className="flex items-center gap-3 mb-4">
                        <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-slate-200" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500">Lvl {user.level} • {user.xp} XP</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Nav Placeholder (Simple) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-3">
                 <Link to="/" className="p-2 text-slate-500"><LayoutDashboard /></Link>
                 <Link to="/leaderboard" className="p-2 text-slate-500"><Trophy /></Link>
                 <Link to="/profile" className="p-2 text-slate-500"><User /></Link>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pb-20 md:pb-8 max-w-[1600px] mx-auto w-full">
                {children}
            </main>
        </div>
    );
};

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/course/:courseId" element={<CourseView />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

const App = () => {
  return (
    <HashRouter>
      <LearningProvider>
        <Layout>
            <AppContent />
        </Layout>
      </LearningProvider>
    </HashRouter>
  );
};

export default App;