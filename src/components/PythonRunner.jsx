import { useState, useRef } from 'react';
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

      // Capture stdout
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
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <Play size={12} />
          {loading ? 'Running…' : 'Run'}
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>
      <CodeOutput output={output} error={error} loading={loading} />
    </div>
  );
}
