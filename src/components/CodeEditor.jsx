import { useRef, useEffect } from 'react';

export default function CodeEditor({ initialCode, onChange, height = '240px' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.value = initialCode || '';
  }, [initialCode]);

  function handleChange(e) {
    onChange?.(e.target.value);
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border-b border-slate-700">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-slate-400 font-mono">Python</span>
      </div>
      <textarea
        ref={ref}
        onChange={handleChange}
        className="w-full font-mono text-sm text-slate-100 bg-slate-900 p-4 resize-none focus:outline-none leading-relaxed"
        style={{ height, tabSize: 4 }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            e.target.value =
              value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
            onChange?.(e.target.value);
          }
        }}
      />
    </div>
  );
}
