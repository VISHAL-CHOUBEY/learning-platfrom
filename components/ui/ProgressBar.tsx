import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '', colorClass = 'bg-indigo-600' }) => {
  return (
    <div className={`w-full bg-slate-200 rounded-full h-2.5 ${className}`}>
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      ></div>
    </div>
  );
};
