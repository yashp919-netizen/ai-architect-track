import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { ArrowRight } from 'lucide-react';

const PHASE_COLORS = [
  'from-blue-600/20 to-blue-600/5 border-blue-500/20',
  'from-violet-600/20 to-violet-600/5 border-violet-500/20',
  'from-emerald-600/20 to-emerald-600/5 border-emerald-500/20',
  'from-orange-600/20 to-orange-600/5 border-orange-500/20',
];
const PHASE_ACCENTS = ['text-blue-400', 'text-violet-400', 'text-emerald-400', 'text-orange-400'];
const PHASE_NUMS = ['bg-blue-500/20 text-blue-300', 'bg-violet-500/20 text-violet-300', 'bg-emerald-500/20 text-emerald-300', 'bg-orange-500/20 text-orange-300'];

export default function PhaseCard({ phase, progress }) {
  const navigate = useNavigate();
  const { completed = 0, total = 0 } = progress || {};
  const idx = phase.number - 1;

  return (
    <div
      onClick={() => navigate(`/phase/${phase.id}`)}
      className={`group relative bg-gradient-to-br ${PHASE_COLORS[idx]} border rounded-xl p-5 cursor-pointer hover:scale-[1.01] transition-all duration-200 bg-slate-900`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`w-8 h-8 rounded-lg ${PHASE_NUMS[idx]} text-xs font-black flex items-center justify-center`}>
          {phase.number}
        </span>
        <span className="text-xs text-slate-600">{phase.weeks}</span>
      </div>
      <h3 className="text-sm font-bold text-slate-100 mb-0.5">{phase.title}</h3>
      <p className={`text-xs font-medium mb-4 ${PHASE_ACCENTS[idx]}`}>{phase.subtitle}</p>
      <ProgressBar value={completed} max={total || 1} />
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-slate-600">{completed} / {total} lessons</p>
        <ArrowRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
      </div>
    </div>
  );
}
