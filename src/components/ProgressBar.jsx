export default function ProgressBar({ value, max, label, color = 'bg-blue-500' }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="w-full bg-slate-800 rounded-full h-1">
        <div
          className={`${color} h-1 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
