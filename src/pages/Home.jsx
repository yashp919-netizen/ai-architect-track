import { useNavigate } from 'react-router-dom';
import DayBanner from '../components/DayBanner';
import PhaseCard from '../components/PhaseCard';
import { useProgress } from '../hooks/useProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDay } from '../utils/dayCalc';
import { CURRICULUM } from '../data/curriculum';
import { BookOpen, Clock, Flame, Bell, Layers, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { getPhaseProgress, getTotalProgress, completedLessons, currentStreak, longestStreak } = useProgress();
  const [startDate] = useLocalStorage('startDate', new Date().toISOString().split('T')[0]);
  const [lastActivity] = useLocalStorage('lastActivityDate', null);

  const { phaseId } = getCurrentDay(startDate);
  const currentPhase = CURRICULUM.find((p) => p.id === phaseId);
  const todayLessons = currentPhase?.lessons.filter((l) => !completedLessons.has(l.id)).slice(0, 2) || [];

  const total = getTotalProgress();
  const totalMinutes = [...completedLessons].reduce((acc, id) => {
    const lesson = CURRICULUM.flatMap((p) => p.lessons).find((l) => l.id === id);
    return acc + (parseInt(lesson?.duration) || 0);
  }, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const showReminder = lastActivity !== todayStr && total.completed > 0;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-slate-900 border border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative px-6 py-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              <Zap size={10} /> 56-Day AI Architect Curriculum
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
            From ETL Professional<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              to AI Solutions Architect
            </span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mb-5">
            A structured 8-week curriculum built around your Mosaic project — 24 lessons, in-browser Python exercises, and a clear path to owning the system you built.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/mosaic')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Layers size={14} /> About Mosaic
            </button>
            <button
              onClick={() => navigate(`/phase/${phaseId}`)}
              className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Current phase <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <DayBanner />

      {/* Reminder */}
      {showReminder && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-sm text-amber-300">
          <Bell size={14} className="flex-shrink-0 text-amber-400" />
          <span>No lesson completed today — keep your streak alive!</span>
        </div>
      )}

      {/* Today's plan */}
      {todayLessons.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Today's plan</h2>
          <div className="flex flex-col gap-2">
            {todayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 flex items-center justify-between hover:border-blue-500/30 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{lesson.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{currentPhase.title} · {lesson.duration}</p>
                </div>
                <button
                  onClick={() => navigate(`/phase/${currentPhase.id}/lesson/${lesson.id}`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
                >
                  Start <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Phases grid */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">All phases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CURRICULUM.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} progress={getPhaseProgress(phase.id)} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <BookOpen size={16} className="text-blue-400" />, value: total.completed, label: 'lessons done', bg: 'from-blue-600/10' },
            { icon: <Clock size={16} className="text-violet-400" />, value: totalMinutes, label: 'minutes invested', bg: 'from-violet-600/10' },
            { icon: <Flame size={16} className="text-orange-400" />, value: longestStreak, label: 'longest streak', bg: 'from-orange-600/10' },
          ].map(({ icon, value, label, bg }) => (
            <div key={label} className={`bg-gradient-to-br ${bg} to-transparent bg-slate-900 border border-slate-700/50 rounded-xl p-4 text-center`}>
              <div className="flex justify-center mb-2">{icon}</div>
              <p className="text-2xl font-black text-slate-100">{value}</p>
              <p className="text-xs text-slate-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
