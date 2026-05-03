import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDay } from '../utils/dayCalc';

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

  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 px-5 py-4 mb-6">
      <p className="text-sm font-semibold text-slate-700">
        Day {clampedDay} of 56
        <span className="mx-2 text-slate-300">·</span>
        Phase {phaseNumber}
        <span className="mx-2 text-slate-300">·</span>
        {weekLabel}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">
        Started {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  );
}
