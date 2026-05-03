import { NavLink, useLocation } from 'react-router-dom';
import { Home, StickyNote, Terminal, ChevronRight } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';
import ProgressBar from './ProgressBar';

export default function Sidebar({ progress, currentDay, onClose }) {
  const location = useLocation();

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
          isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-100'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );

  return (
    <aside className="flex flex-col h-full bg-white border-r border-slate-100 py-4 px-3 gap-1">
      <div className="px-3 py-2 mb-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Day {currentDay} of 56</p>
      </div>

      {navItem('/', <Home size={15} />, 'Home')}

      <div className="mt-3 mb-1 px-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phases</p>
      </div>

      {CURRICULUM.map((phase) => {
        const p = progress[phase.id] || { completed: 0, total: phase.lessons.length, percent: 0 };
        const isActive = location.pathname.startsWith(`/phase/${phase.id}`);
        return (
          <NavLink
            key={phase.id}
            to={`/phase/${phase.id}`}
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-5 h-5 rounded bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {phase.number}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate">{phase.title}</div>
              <ProgressBar value={p.completed} max={p.total || 1} />
            </div>
          </NavLink>
        );
      })}

      <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-1">
        {navItem('/notes', <StickyNote size={15} />, 'Notes')}
        {navItem('/playground', <Terminal size={15} />, 'Playground')}
      </div>
    </aside>
  );
}
