import { useNavigate } from 'react-router-dom';
import DayBanner from '../components/DayBanner';
import PhaseCard from '../components/PhaseCard';
import { useProgress } from '../hooks/useProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDay } from '../utils/dayCalc';
import { CURRICULUM } from '../data/curriculum';
import { BookOpen, Clock, Flame, Bell } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { getPhaseProgress, getTotalProgress, completedLessons, currentStreak, longestStreak } = useProgress();
  const [startDate] = useLocalStorage('startDate', new Date().toISOString().split('T')[0]);

  const { phaseId, dayNumber } = getCurrentDay(startDate);
  const currentPhase = CURRICULUM.find((p) => p.id === phaseId);
  const todayLessons = currentPhase?.lessons.filter((l) => !completedLessons.has(l.id)).slice(0, 2) || [];

  const total = getTotalProgress();
  const totalMinutes = [...completedLessons].reduce((acc, id) => {
    const lesson = CURRICULUM.flatMap((p) => p.lessons).find((l) => l.id === id);
    if (!lesson) return acc;
    const mins = parseInt(lesson.duration) || 0;
    return acc + mins;
  }, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const [lastActivity] = useLocalStorage('lastActivityDate', null);
  const showReminder = lastActivity !== todayStr && total.completed > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <DayBanner />

      {showReminder && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
          <Bell size={15} className="flex-shrink-0 text-amber-500" />
          <span>You haven't completed a lesson today — keep your streak alive!</span>
        </div>
      )}

      {/* Today's plan */}
      {todayLessons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold text-slate-700 mb-3">Today's plan</h2>
          <div className="flex flex-col gap-2">
            {todayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{lesson.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{currentPhase.title} · {lesson.duration}</p>
                </div>
                <button
                  onClick={() => navigate(`/phase/${currentPhase.id}/lesson/${lesson.id}`)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All phases */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-slate-700 mb-3">All phases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CURRICULUM.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} progress={getPhaseProgress(phase.id)} />
          ))}
        </div>
      </section>

      {/* Quick stats */}
      <section>
        <h2 className="text-base font-semibold text-slate-700 mb-3">Quick stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <BookOpen size={18} className="mx-auto text-blue-400 mb-1" />
            <p className="text-xl font-bold text-slate-800">{total.completed}</p>
            <p className="text-xs text-slate-400">lessons done</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <Clock size={18} className="mx-auto text-green-400 mb-1" />
            <p className="text-xl font-bold text-slate-800">{totalMinutes}</p>
            <p className="text-xs text-slate-400">minutes invested</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <Flame size={18} className="mx-auto text-orange-400 mb-1" />
            <p className="text-xl font-bold text-slate-800">{longestStreak}</p>
            <p className="text-xs text-slate-400">longest streak</p>
          </div>
        </div>
      </section>
    </div>
  );
}
