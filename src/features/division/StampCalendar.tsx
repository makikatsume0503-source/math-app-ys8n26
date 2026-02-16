import React from 'react';
import { motion } from 'framer-motion';
import { CatStampIcon } from '../../components/CatStampIcon';

interface StampCalendarProps {
    progress: { [date: string]: { count: number; stamped: boolean } };
    todayCount: number;
    dailyGoal: number;
}

export const StampCalendar: React.FC<StampCalendarProps> = ({ progress, todayCount, dailyGoal }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed

    // Generate days for the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) - 6 (Sat)

    // Fill empty slots for previous month days
    const blanks = Array.from({ length: firstDayOfWeek });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const getDayData = (day: number) => {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return progress[dateString];
    };

    // Seasonal Decorations
    const getSeasonalTheme = (month: number) => {
        switch (month) {
            case 0: // January
                return {
                    icon: '🎍',
                    title: 'おしょうがつ',
                    color: 'text-red-500',
                    bg: 'bg-red-50',
                    border: 'border-red-200'
                };
            case 1: // February
                return {
                    icon: '👹',
                    title: 'せつぶん',
                    color: 'text-red-500',
                    bg: 'bg-red-50',
                    border: 'border-red-200'
                };
            case 2: // March
                return {
                    icon: '🎎',
                    title: 'ひなまつり',
                    color: 'text-pink-500',
                    bg: 'bg-pink-50',
                    border: 'border-pink-200'
                };
            case 3: // April
                return {
                    icon: '🌸',
                    title: 'にゅうがくしき',
                    color: 'text-pink-400',
                    bg: 'bg-pink-50',
                    border: 'border-pink-200'
                };
            case 4: // May
                return {
                    icon: '🎏',
                    title: 'こどものひ',
                    color: 'text-blue-500',
                    bg: 'bg-blue-50',
                    border: 'border-blue-200'
                };
            case 5: // June
                return {
                    icon: '☔',
                    title: 'つゆ',
                    color: 'text-indigo-500',
                    bg: 'bg-indigo-50',
                    border: 'border-indigo-200'
                };
            case 6: // July
                return {
                    icon: '🌻',
                    title: 'なつやすみ',
                    color: 'text-sky-500',
                    bg: 'bg-sky-50',
                    border: 'border-sky-200'
                };
            case 7: // August
                return {
                    icon: '🎆', // Fireworks for Obon/Summer
                    title: 'おぼん',
                    color: 'text-purple-500',
                    bg: 'bg-purple-50',
                    border: 'border-purple-200'
                };
            case 8: // September
                return {
                    icon: '🎑',
                    title: 'おつきみ',
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200'
                };
            case 9: // October
                return {
                    icon: '🎃',
                    title: 'ハロウィーン',
                    color: 'text-orange-500',
                    bg: 'bg-orange-50',
                    border: 'border-orange-200'
                };
            case 10: // November
                return {
                    icon: '🍁',
                    title: 'こうよう',
                    color: 'text-red-600',
                    bg: 'bg-orange-50',
                    border: 'border-red-200'
                };
            case 11: // December
                return {
                    icon: '🎄',
                    title: 'クリスマス',
                    color: 'text-green-600',
                    bg: 'bg-green-50',
                    border: 'border-green-200'
                };
            default:
                return {
                    icon: '📅',
                    title: 'カレンダー',
                    color: 'text-app-yellow',
                    bg: 'bg-white',
                    border: 'border-app-yellow/30'
                };
        }
    };

    const theme = getSeasonalTheme(currentMonth);

    return (
        <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-[2rem] shadow-xl border-4 ${theme.border} w-full max-w-sm relative overflow-hidden`}>
            {/* Seasonal Background Icon (Faint) */}
            <div className="absolute top-0 right-0 text-[8rem] opacity-10 pointer-events-none -translate-y-4 translate-x-4">
                {theme.icon}
            </div>

            <h2 className={`text-3xl font-black text-slate-700 mb-2 text-center flex items-center justify-center gap-3`}>
                <span className="text-4xl">{theme.icon}</span>
                <span>{currentMonth + 1}がつ</span>
            </h2>
            <p className="text-center font-bold text-slate-400 mb-6 text-sm flex justify-center items-center gap-1">
                {theme.title}
            </p>

            {/* Today's Progress */}
            <div className={`mb-6 ${theme.bg} rounded-2xl p-4 border-2 ${theme.border}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold ${theme.color}`}>きょうの がんばり</span>
                    <span className="font-black text-2xl text-slate-600">
                        {todayCount} <span className="text-sm text-slate-400">/ {dailyGoal}</span>
                    </span>
                </div>
                <div className="w-full bg-white rounded-full h-4 overflow-hidden border border-slate-100">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (todayCount / dailyGoal) * 100)}%` }}
                        className={`h-full rounded-full ${currentMonth === 2 ? 'bg-pink-400' : 'bg-app-yellow'}`}
                    />
                </div>
                {todayCount >= dailyGoal && (
                    <div className="mt-2 text-center font-bold text-app-pink animate-bounce">
                        もくひょうたっせい！スタンプゲット！🎉
                    </div>
                )}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
                    <div key={d} className={`text-xs font-bold ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {blanks.map((_, i) => (
                    <div key={`blank-${i}`} className="aspect-square" />
                ))}
                {days.map(day => {
                    const data = getDayData(day);
                    const isToday = day === today.getDate();
                    const count = data?.count || 0;
                    let StampComponent = null;

                    if (count >= 50) {
                        StampComponent = <CatStampIcon size={24} variant="excellent" />;
                    } else if (count >= 30) {
                        StampComponent = <CatStampIcon size={24} variant="gold" />;
                    } else if (count >= 20) {
                        StampComponent = <CatStampIcon size={24} variant="silver" />;
                    } else if (count >= 10) {
                        StampComponent = <CatStampIcon size={24} variant="bronze" />;
                    }

                    return (
                        <div
                            key={day}
                            className={`aspect-square rounded-xl flex items-center justify-center relative border-2 ${isToday ? 'border-app-blue bg-blue-50' : 'border-slate-100 bg-white'}`}
                        >
                            <span className={`text-[0.6rem] font-bold ${isToday ? 'text-app-blue' : 'text-slate-300'} z-0 absolute top-0.5 left-1`}>
                                {day}
                            </span>

                            {StampComponent ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="z-10 drop-shadow-sm"
                                >
                                    {StampComponent}
                                </motion.div>
                            ) : count > 0 ? (
                                <div className="z-10 text-[0.65rem] font-bold text-orange-300 translate-y-1">
                                    {count}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
