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

  function handleResetProgress() {
    if (confirmReset) {
      resetProgress();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-800">Notes</h1>
        {lastSaved && (
          <span className="text-xs text-slate-400">Saved at {lastSaved}</span>
        )}
      </div>

      {/* What I learned today */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-blue-700 mb-2">What I learned today</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={todayEntry}
            onChange={(e) => setTodayEntry(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && appendTodayEntry()}
            placeholder="Type a quick note and press Enter or click +"
            className="flex-1 text-sm bg-white border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400"
          />
          <button
            onClick={appendTodayEntry}
            className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
          </button>
        </div>
      </div>

      <textarea
        className="w-full h-[500px] font-mono text-sm text-slate-700 bg-white border border-slate-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-colors"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={handleBlur}
        placeholder="Your notes here. Saves automatically when you click away."
        spellCheck={false}
      />

      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 mb-3">Danger zone</p>
        <button
          onClick={handleResetProgress}
          className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
            confirmReset
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          {confirmReset ? 'Click again to confirm reset all progress' : 'Reset progress'}
        </button>
        {confirmReset && (
          <button
            onClick={() => setConfirmReset(false)}
            className="ml-2 text-xs px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
