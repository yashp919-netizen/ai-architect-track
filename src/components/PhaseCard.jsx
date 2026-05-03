import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function PhaseCard({ phase, progress }) {
  const navigate = useNavigate();
  const { completed = 0, total = 0, percent = 0 } = progress || {};

  return (
    <div
      onClick={() => navigate(`/phase/${phase.id}`)}
      className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">
          {phase.number}
        </span>
        <span className="text-xs text-slate-400 font-medium">{phase.weeks}</span>
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-0.5">{phase.title}</h3>
      <p className="text-xs text-slate-500 mb-4">{phase.subtitle}</p>
      <ProgressBar value={completed} max={total || 1} />
      <p className="text-xs text-slate-400 mt-2">
        {completed} of {total} lessons complete
      </p>
    </div>
  );
}
