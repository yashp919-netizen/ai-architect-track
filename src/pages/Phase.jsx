import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CURRICULUM } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import LessonCard from '../components/LessonCard';
import ProgressBar from '../components/ProgressBar';
import { CheckSquare, Square, PartyPopper } from 'lucide-react';

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

  if (!phase) {
    return <div className="text-slate-500 text-sm p-8">Phase not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Phase {phase.number}</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-400">{phase.weeks}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">{phase.title}</h1>
        <p className="text-sm text-slate-500 mb-4">{phase.subtitle}</p>
        <p className="text-sm text-slate-600 mb-4">{phase.description}</p>
        <ProgressBar value={progress.completed} max={progress.total || 1} label={`${progress.completed} of ${progress.total} lessons`} />
      </div>

      {/* Goals */}
      <section className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Goals</h2>
        <ul className="flex flex-col gap-2">
          {phase.goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <Square size={14} className="mt-0.5 text-slate-300 flex-shrink-0" />
              {goal}
            </li>
          ))}
        </ul>
      </section>

      {/* Lessons */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Lessons</h2>
        {phase.lessons.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-8 text-center">
            <p className="text-slate-400 text-sm">Coming soon — content being added before Day {phase.dayRange[0]}</p>
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
