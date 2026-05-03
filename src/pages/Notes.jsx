import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useProgress } from '../hooks/useProgress';
import { PlusCircle } from 'lucide-react';

export default function Notes() {
  const [notes, setNotes] = useLocalStorage('notes', '');
  const [lastSaved, setLastSaved] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [todayEntry, setTodayEntry] = useState('');
  const { resetProgress } = useProgress();

  function handleBlur(e) {
    setNotes(e.target.value);
    setLastSaved(new Date().toLocaleTimeString());
  }

  function appendTodayEntry() {
    if (!todayEntry.trim()) return;
    const timestamp = new Date().toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    const entry = `\n---\n[${timestamp}]\n${todayEntry.trim()}\n`;
    const updated = notes + entry;
    setNotes(updated);
    setTodayEntry('');
    setLastSaved(new Date().toLocaleTimeString());
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-black text-slate-100">Notes</h1>
        {lastSaved && <span className="text-xs text-slate-600">Saved at {lastSaved}</span>}
      </div>

      {/* What I learned today */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-blue-400 mb-2">What I learned today</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={todayEntry}
            onChange={(e) => setTodayEntry(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && appendTodayEntry()}
            placeholder="Quick note — press Enter to append with timestamp"
            className="flex-1 text-sm bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
          <button onClick={appendTodayEntry} className="p-2 text-blue-500 hover:text-blue-400 transition-colors">
            <PlusCircle size={20} />
          </button>
        </div>
      </div>

      <textarea
        className="w-full h-[500px] font-mono text-sm text-slate-300 bg-slate-900 border border-slate-700/50 rounded-xl p-4 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 transition-colors placeholder:text-slate-700"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={handleBlur}
        placeholder="Your notes here. Saves automatically when you click away."
        spellCheck={false}
      />

      <div className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-700 mb-3">Danger zone</p>
        <button
          onClick={() => {
            if (confirmReset) { resetProgress(); setConfirmReset(false); }
            else setConfirmReset(true);
          }}
          className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
            confirmReset ? 'bg-red-600 text-white' : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
          }`}
        >
          {confirmReset ? 'Click again to confirm — this cannot be undone' : 'Reset all progress'}
        </button>
        {confirmReset && (
          <button
            onClick={() => setConfirmReset(false)}
            className="ml-2 text-xs px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
