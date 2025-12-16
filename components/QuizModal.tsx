import React, { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';
import Confetti from 'react-canvas-confetti';

interface QuizModalProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onComplete, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) return;
    const correct = quiz.options.find(o => o.id === selectedOption)?.isCorrect || false;
    setIsCorrect(correct);
    setSubmitted(true);
    
    if (correct) {
      setTimeout(() => {
        onComplete(100);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Knowledge Check</h2>
            <p className="text-indigo-100">Win {quiz.xpReward} XP</p>
        </div>

        {/* Content */}
        <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">{quiz.question}</h3>
            
            <div className="space-y-3">
                {quiz.options.map((opt) => {
                    let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ";
                    
                    if (submitted) {
                        if (opt.isCorrect) btnClass += "border-green-500 bg-green-50 text-green-800";
                        else if (opt.id === selectedOption) btnClass += "border-red-500 bg-red-50 text-red-800";
                        else btnClass += "border-slate-100 text-slate-400";
                    } else {
                        if (selectedOption === opt.id) btnClass += "border-indigo-600 bg-indigo-50 text-indigo-700";
                        else btnClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                    }

                    return (
                        <button
                            key={opt.id}
                            onClick={() => !submitted && setSelectedOption(opt.id)}
                            disabled={submitted}
                            className={btnClass}
                        >
                            <span className="font-medium">{opt.text}</span>
                            {submitted && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                            {submitted && !opt.isCorrect && opt.id === selectedOption && <XCircle className="w-5 h-5 text-red-600" />}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-slate-500 font-medium hover:text-slate-700"
            >
                Cancel
            </button>
            {!submitted ? (
                 <button 
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all"
                >
                    Submit Answer
                </button>
            ) : (
                <button 
                    onClick={() => { if(!isCorrect) { setSubmitted(false); setSelectedOption(null); } else { onClose(); } }}
                    className={`px-6 py-2 rounded-lg font-bold shadow-lg text-white transition-all ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-800 hover:bg-slate-900'}`}
                >
                    {isCorrect ? 'Continue' : 'Try Again'}
                </button>
            )}
           
        </div>
      </div>
    </div>
  );
};
