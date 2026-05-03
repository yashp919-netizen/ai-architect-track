import { Flame, Menu, X } from 'lucide-react';

export default function Header({ streak, sidebarOpen, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-slate-800/60 px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">AI</span>
          </div>
          <span className="font-semibold text-slate-100 text-sm tracking-tight">AI Architect Track</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Flame size={11} />
            {streak} day streak
          </div>
        )}
      </div>
    </header>
  );
}
