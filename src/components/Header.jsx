import { Flame, Menu, X } from 'lucide-react';

export default function Header({ streak, sidebarOpen, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <span className="font-bold text-slate-800 text-sm tracking-tight">AI Architect Track</span>
      </div>
      <div className="flex items-center gap-2">
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Flame size={12} />
            {streak} day streak
          </div>
        )}
      </div>
    </header>
  );
}
