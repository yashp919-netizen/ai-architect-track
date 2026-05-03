import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CURRICULUM } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import LessonCard from '../components/LessonCard';
import ProgressBar from '../components/ProgressBar';
import { Square } from 'lucide-react';

const PHASE_COLORS = [
  'from-blue-600/15 border-blue-500/20',
  'from-violet-600/15 border-violet-500/20',
  'from-emerald-600/15 border-emerald-500/20',
  'from-orange-600/15 border-orange-500/20',
];
const PHASE_ACCENTS = ['text-blue-400', 'text-violet-400', 'text-emerald-400', 'text-orange-400'];

export default function Phase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completedLessons, getPhaseProgress } = useProgress();
  const phase = CURRICULUM.find((p) => p.id === id);
  const firedRef = useRef(false);

  const progress = phase ? getPhaseProgress(phase.id) : null;

  useEffect(() => {
    if (progress && progress.total > 0 && progress.completed === progress.total && !firedRef.current) {
      firedRef.current = true;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [progress?.completed, progress?.total]);

  if (!phase) return <div className="text-slate-500 text-sm p-8">Phase not found.</div>;

  const idx = phase.number - 1;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Phase header */}
      <div className={`relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br ${PHASE_COLORS[idx]} to-transparent bg-slate-900 border`}>
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${PHASE_ACCENTS[idx]}`}>Phase {phase.number}</span>
            <span className="text-slate-700">·</span>
            <span className="text-xs text-slate-500">{phase.weeks}</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">{phase.title}</h1>
          <p className={`text-sm font-medium mb-4 ${PHASE_ACCENTS[idx]}`}>{phase.subtitle}</p>
          <p className="text-sm text-slate-400 mb-5">{phase.description}</p>
          <ProgressBar
            value={progress.completed}
            max={progress.total || 1}
            label={`${progress.completed} of ${progress.total} lessons complete`}
          />
        </div>
      </div>

      {/* Goals */}
      <section className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 mb-6">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Goals</h2>
        <ul className="flex flex-col gap-2">
          {phase.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <Square size={13} className="mt-0.5 text-slate-700 flex-shrink-0" />
              {goal}
            </li>
          ))}
        </ul>
      </section>

      {/* Lessons */}
      <section>
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Lessons</h2>
        {phase.lessons.length === 0 ? (
          <div className="bg-slate-900 border border-dashed border-slate-700 rounded-xl p-8 text-center">
            <p className="text-slate-600 text-sm">Coming soon — content being added before Day {phase.dayRange[0]}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {phase.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={completedLessons.has(lesson.id)}
                onClick={() => navigate(`/phase/${phase.id}/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
