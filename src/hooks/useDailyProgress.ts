import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math-app-division-progress'; // Changed key to avoid conflict
const DAILY_GOAL = 20; // Changed goal to 20

interface DailyData {
    count: number;
    stamped: boolean;
}

interface ProgressData {
    [dateString: string]: DailyData;
}

export const useDailyProgress = () => {
    const [progress, setProgress] = useState<ProgressData>({});
    const [todayCount, setTodayCount] = useState(0);
    const [todayStamped, setTodayStamped] = useState(false);

    const getTodayString = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed: ProgressData = JSON.parse(stored);
                setProgress(parsed);

                const today = getTodayString();
                if (parsed[today]) {
                    setTodayCount(parsed[today].count);
                    setTodayStamped(parsed[today].stamped);
                }
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }
    }, []);

    const incrementProgress = () => {
        const today = getTodayString();
        setProgress(prev => {
            const current = prev[today] || { count: 0, stamped: false };
            const newCount = current.count + 1;
            const newStamped = current.stamped || newCount >= DAILY_GOAL;

            const newData = {
                ...prev,
                [today]: {
                    count: newCount,
                    stamped: newStamped
                }
            };

            setTodayCount(newCount);
            setTodayStamped(newStamped);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

            return newData;
        });
    };

    return {
        incrementProgress,
        progress,
        todayCount,
        todayStamped,
        dailyGoal: DAILY_GOAL
    };
};
