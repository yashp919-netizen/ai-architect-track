import { Loader2 } from 'lucide-react';

export default function CodeOutput({ output, error, loading }) {
  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex items-center gap-2 text-sm text-slate-500">
        <Loader2 size={14} className="animate-spin" />
        <span>Loading Python runtime… (first load takes 15–30s)</span>
      </div>
    );
  }

  if (!output && !error) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-400 font-mono min-h-[80px]">
        Output will appear here.
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-4 text-sm font-mono whitespace-pre-wrap leading-relaxed min-h-[80px] ${
        error
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-slate-200 bg-slate-50 text-slate-800'
      }`}
    >
      {error || output}
    </div>
  );
}
