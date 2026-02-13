import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, ChevronLeft } from 'lucide-react';
import { useDailyProgress } from './hooks/useDailyProgress';
import { StampCalendar } from './features/division/StampCalendar';

// --- Shared Types ---
type Screen = 'home' | 'game';
type DivisionLevel = 1 | 2 | 3 | 4 | 5 | 6;

// --- Components ---

// 1. Home Screen
const Home = ({ onStartGame, progressData }: { onStartGame: (level: DivisionLevel) => void, progressData: any }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row items-start gap-8 justify-center">
      {/* Left Column: Level Selection */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl border-4 border-app-green/30 flex flex-col items-center w-full max-w-lg"
      >
        <div className="w-24 h-24 bg-app-green rounded-full flex items-center justify-center text-5xl text-white font-black mb-6 shadow-md">
          ÷
        </div>
        <h2 className="text-3xl font-black text-slate-700 mb-8">わりざん</h2>

        <div className="grid grid-cols-1 gap-4 w-full">
          <LevelButton level={1} color="bg-app-green" onClick={() => onStartGame(1)} label="Lv.1 (九九でなおせる)" />
          <LevelButton level={2} color="bg-app-blue" onClick={() => onStartGame(2)} label="Lv.2 (2桁÷1桁=2桁)" />
          <LevelButton level={3} color="bg-app-purple" onClick={() => onStartGame(3)} label="Lv.3 (3桁÷1桁)" />
          <LevelButton level={4} color="bg-app-pink" onClick={() => onStartGame(4)} label="Lv.4 (2桁÷2桁)" />
          <LevelButton level={5} color="bg-app-yellow" onClick={() => onStartGame(5)} label="Lv.5 (3桁÷2桁)" />
          <LevelButton level={6} color="bg-orange-400" onClick={() => onStartGame(6)} label="Lv.6 (3桁÷3桁)" />
        </div>
      </motion.div>

      {/* Right Column: Calendar */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        <StampCalendar
          progress={progressData.progress}
          todayCount={progressData.todayCount}
          dailyGoal={progressData.dailyGoal}
        />
      </motion.div>
    </div>
  );
};

const LevelButton = ({ level, color, onClick, label }: { level: number, color: string, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className="w-full py-4 px-6 rounded-xl border-b-4 border-slate-200 bg-white hover:bg-slate-50 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-between group shadow-sm"
  >
    <div className="flex items-center gap-3">
      <span className={`w-10 h-10 rounded-full ${color} text-white font-black flex items-center justify-center text-xl shadow-sm`}>
        {level}
      </span>
      <span className="font-bold text-slate-600 text-lg text-left">{label}</span>
    </div>
    <ArrowRight size={24} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
  </button>
);

// 2. Game Screen
const DivisionGame = ({ level, onBack, onCorrect }: { level: DivisionLevel, onBack: () => void, onCorrect: () => void }) => {
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState(() => generateProblem(level));
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  function generateProblem(lvl: DivisionLevel) {
    let a, b;

    switch (lvl) {
      case 1: // Level 1: 九九 (Multiplication Table Inverse)
        {
          const ans = Math.floor(Math.random() * 9) + 1; // 1-9
          b = Math.floor(Math.random() * 9) + 1; // 1-9
          a = ans * b;
        }
        break;
      case 2: // Level 2: 2-digit / 1-digit = 2-digit answer
        {
          b = Math.floor(Math.random() * 8) + 2; // 2-9
          const maxAns = Math.floor(99 / b); // e.g., b=2 -> 49, b=9 -> 11
          const minAns = 10;
          const ans = Math.floor(Math.random() * (maxAns - minAns + 1)) + minAns;
          a = ans * b;
        }
        break;
      case 3: // 3-digit / 1-digit
        do {
          b = Math.floor(Math.random() * 8) + 2; // 2-9
          const maxAns = Math.floor(999 / b);
          const minAns = Math.ceil(100 / b);
          const ans = Math.floor(Math.random() * (maxAns - minAns + 1)) + minAns;
          a = ans * b;
        } while (a < 100 || a > 999);
        break;
      case 4: // 2-digit / 2-digit
        do {
          b = Math.floor(Math.random() * 89) + 10; // 10-99
          const maxAns = Math.floor(99 / b); // likely small
          if (maxAns < 1) { // shouldn't happen if b <= 99
            b = 10;
          }
          // ans could be 1-9
          const ans = Math.floor(Math.random() * 9) + 1;
          a = b * ans;
        } while (a < 10 || a > 99 || a < b);
        break;
      case 5: // 3-digit / 2-digit
        do {
          b = Math.floor(Math.random() * 89) + 10; // 10-99
          const maxAns = Math.floor(999 / b);
          const minAns = Math.ceil(100 / b);
          const ans = Math.floor(Math.random() * (maxAns - minAns + 1)) + minAns;
          a = ans * b;
        } while (a < 100 || a > 999);
        break;
      case 6: // 3-digit / 3-digit
        do {
          b = Math.floor(Math.random() * 899) + 100; // 100-999
          const ans = Math.floor(Math.random() * 9) + 1;
          a = b * ans;
        } while (a < 100 || a > 999);
        break;
      default:
        a = 10; b = 2;
    }

    return { a, b, ans: a / b, operator: '÷' };
  }

  const checkAnswer = () => {
    const num = parseInt(userAnswer);
    if (num === problem.ans) {
      setFeedback('correct');
      setScore(s => s + 1);
      onCorrect(); // Increment daily progress
    } else {
      setFeedback('incorrect');
    }
  };

  const nextProblem = () => {
    setProblem(generateProblem(level));
    setUserAnswer('');
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-xl border-[6px] border-app-green/30 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-1 bg-white px-4 py-2 rounded-full text-slate-500 font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all shadow-sm group"
        >
          <ChevronLeft size={20} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          <span>もどる</span>
        </button>

        <div className="bg-white/80 px-4 py-1 rounded-full border-2 border-slate-100 shadow-sm">
          <span className="font-bold text-slate-500 text-sm">Lv.{level}</span>
        </div>

        <div className="flex items-center gap-2 bg-app-yellow/20 px-3 py-1 rounded-full border-2 border-app-yellow text-app-yellow-dark">
          <span className="text-lg">⭐</span>
          <span className="text-xl font-black text-orange-400">{score}</span>
        </div>
      </div>

      {/* Problem */}
      <div className="text-center mb-12 relative z-10">
        <div className="text-5xl md:text-7xl font-black text-slate-700 tracking-wider flex items-center justify-center gap-4 drop-shadow-sm flex-wrap">
          <span className="">{problem.a}</span>
          <span className="text-app-green">{problem.operator}</span>
          <span className="">{problem.b}</span>
          <span>=</span>
          <span className={`min-w-[4rem] h-20 bg-white rounded-xl border-4 flex items-center justify-center shadow-inner text-5xl transition-all px-4 ${userAnswer ? 'border-app-green bg-green-50' : 'border-dashed border-slate-300'}`}>
            {userAnswer || "?"}
          </span>
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto mb-8 relative z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => setUserAnswer(prev => {
              if (prev.length >= 3) return prev;
              return prev + num.toString();
            })}
            className="aspect-square bg-white border-b-[5px] border-slate-200 rounded-xl text-3xl font-bold text-slate-600 active:border-b-0 active:translate-y-[5px] transition-all hover:bg-slate-50 shadow-sm"
          >
            {num}
          </button>
        ))}
      </div>
      <div className="max-w-sm mx-auto flex gap-3 mb-6 relative z-10">
        <button
          onClick={() => setUserAnswer('')}
          className="flex-1 py-3 bg-red-50 border-b-[4px] border-red-200 rounded-xl text-red-400 flex items-center justify-center active:border-b-0 active:translate-y-[4px] transition-all hover:bg-red-100 font-bold"
        >
          <RotateCcw size={24} /> リセット
        </button>
        <button
          onClick={() => setUserAnswer(prev => prev.slice(0, -1))}
          className="flex-1 py-3 bg-slate-50 border-b-[4px] border-slate-200 rounded-xl text-slate-400 flex items-center justify-center active:border-b-0 active:translate-y-[4px] transition-all hover:bg-slate-100 font-bold"
        >
          １もじけす
        </button>
      </div>


      {/* Feedback / Submit */}
      <div className="text-center relative z-10 min-h-[6rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!feedback && userAnswer && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={checkAnswer}
              className="px-16 py-4 bg-gradient-to-r from-app-green to-emerald-400 text-white text-3xl font-black rounded-full shadow-lg border-b-8 border-emerald-600 active:border-b-0 active:translate-y-[8px] transition-all"
            >
              できた！
            </motion.button>
          )}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-5xl font-black text-app-pink animate-bounce drop-shadow-md">せいかい！🎉</div>
              <button onClick={nextProblem} className="px-8 py-3 bg-app-yellow text-white rounded-full font-bold text-xl shadow-md border-b-4 border-orange-300 active:border-b-0 active:translate-y-1">つぎへ <ArrowRight className="inline" /></button>
            </motion.div>
          )}
          {feedback === 'incorrect' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-3xl font-bold text-slate-400">ざんねん...😢</div>
              <button onClick={() => setFeedback(null)} className="px-6 py-2 bg-slate-100 text-slate-500 rounded-full font-bold">もういちど</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};


// 3. Main App Container
function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [level, setLevel] = useState<DivisionLevel>(1);
  const progressData = useDailyProgress();

  return (
    <div className="min-h-screen bg-app-background bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] py-8 px-4 flex flex-col items-center font-sans overflow-y-auto">
      <header className="mb-8 text-center animate-bounce-slow">
        <h1 className="text-5xl md:text-6xl font-black text-app-blue tracking-tighter drop-shadow-md cursor-pointer" onClick={() => setScreen('home')}>
          さんすう<span className="text-app-pink">ランド</span>
        </h1>
        <div className="bg-white/80 inline-block px-4 py-1 rounded-full mt-2 shadow-sm border-2 border-app-yellow/50">
          <p className="text-slate-500 font-bold">わりざん</p>
        </div>
      </header>

      <main className="w-full max-w-6xl relative z-10 mb-8">
        {screen === 'home' ? (
          <Home onStartGame={(l) => { setLevel(l); setScreen('game'); }} progressData={progressData} />
        ) : (
          <DivisionGame
            level={level}
            onBack={() => setScreen('home')}
            onCorrect={() => progressData.incrementProgress()}
          />
        )}
      </main>

      <footer className="mt-auto text-slate-400 text-sm font-bold opacity-60">
        © 2026 Math Adventure
      </footer>
    </div>
  );
}

export default App;
