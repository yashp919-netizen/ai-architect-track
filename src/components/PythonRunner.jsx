import { useState } from 'react';
import { loadPyodideOnce } from '../utils/pyodide';
import CodeOutput from './CodeOutput';
import { Play, RotateCcw } from 'lucide-react';

export default function PythonRunner({ code, onReset }) {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function runCode() {
    setLoading(true);
    setOutput('');
    setError('');
    try {
      const pyodide = await loadPyodideOnce();
      let captured = '';
      pyodide.setStdout({ batched: (text) => { captured += text + '\n'; } });
      pyodide.setStderr({ batched: (text) => { captured += text + '\n'; } });
      await pyodide.runPythonAsync(code);
      setOutput(captured.trimEnd() || '(no output)');
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={runCode}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/80 hover:bg-green-600 disabled:bg-green-900 disabled:text-green-700 text-white text-xs font-semibold rounded-lg transition-colors border border-green-500/30"
        >
          <Play size={11} />
          {loading ? 'Running…' : 'Run'}
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg border border-slate-700/50 transition-colors"
          >
            <RotateCcw size={11} /> Reset
          </button>
        )}
      </div>
      <CodeOutput output={output} error={error} loading={loading} />
    </div>
  );
}
