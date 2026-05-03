import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDay } from '../utils/dayCalc';
import { CalendarDays } from 'lucide-react';

export default function DayBanner() {
  const [startDate, setStartDate] = useLocalStorage('startDate', null);

  if (!startDate) {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    return null;
  }

  const { dayNumber, phaseNumber, weekInPhase } = getCurrentDay(startDate);
  const clampedDay = Math.min(Math.max(dayNumber, 1), 56);
  const weekLabel = weekInPhase === 'post-curriculum' ? 'Post-curriculum' : `Week ${weekInPhase}`;
  const progress = Math.round((clampedDay / 56) * 100);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 mb-6 bg-gradient-to-r from-slate-900 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none" />
      <div className="relative px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <CalendarDays size={13} />
            <span>Started {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <span className="text-xs font-semibold text-blue-400">{progress}% complete</span>
        </div>
        <p className="text-base font-semibold text-slate-100">
          Day {clampedDay} of 56
          <span className="mx-2 text-slate-600">·</span>
          <span className="text-blue-400">Phase {phaseNumber}</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="text-slate-300">{weekLabel}</span>
        </p>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
