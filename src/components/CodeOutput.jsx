import { Loader2 } from 'lucide-react';

export default function CodeOutput({ output, error, loading }) {
  if (loading) {
    return (
      <div className="rounded-lg border border-slate-700/50 bg-slate-900 p-4 flex items-center gap-2 text-sm text-slate-500">
        <Loader2 size={13} className="animate-spin text-blue-400" />
        <span>Loading Python runtime… first load takes 15–30s</span>
      </div>
    );
  }

  if (!output && !error) {
    return (
      <div className="rounded-lg border border-slate-700/50 bg-slate-900 p-4 text-sm text-slate-700 font-mono min-h-[80px]">
        Output will appear here.
      </div>
    );
  }

  return (
    <div className={`rounded-lg border p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed min-h-[80px] ${
      error
        ? 'border-red-500/20 bg-red-500/5 text-red-400'
        : 'border-slate-700/50 bg-slate-900 text-slate-300'
    }`}>
      {error || output}
    </div>
  );
}
