import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import PythonRunner from '../components/PythonRunner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Save, Trash2, Terminal } from 'lucide-react';

const STARTER = `# Welcome to your Python playground.
# Pandas and NumPy are pre-loaded. First run takes ~20s.

import pandas as pd

df = pd.DataFrame({
    "sku_id": ["SKU-001", "SKU-002", "SKU-003"],
    "weight_g": [270, 180, 95],
    "category": ["body wash", "shampoo", "soap"]
})

print(df)
print(f"\\nTotal weight: {df['weight_g'].sum()}g")
`;

export default function Playground() {
  const [code, setCode] = useState(STARTER);
  const [snippets, setSnippets] = useLocalStorage('savedSnippets', []);
  const [snippetName, setSnippetName] = useState('');

  function saveSnippet() {
    const name = snippetName.trim() || `Snippet ${snippets.length + 1}`;
    setSnippets([...snippets, { name, code, savedAt: new Date().toISOString() }]);
    setSnippetName('');
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center">
          <Terminal size={15} className="text-slate-400" />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-100">Python Playground</h1>
          <p className="text-xs text-slate-600">pandas + NumPy pre-loaded · first run takes ~20s</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <CodeEditor initialCode={code} onChange={setCode} height="380px" />
          <PythonRunner code={code} onReset={() => setCode(STARTER)} />

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={snippetName}
              onChange={(e) => setSnippetName(e.target.value)}
              placeholder="Snippet name (optional)"
              className="flex-1 text-xs bg-slate-900 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              onKeyDown={(e) => e.key === 'Enter' && saveSnippet()}
            />
            <button
              onClick={saveSnippet}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg border border-slate-700/50 transition-colors"
            >
              <Save size={12} /> Save
            </button>
          </div>
        </div>

        {snippets.length > 0 && (
          <div className="lg:w-52 flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Saved</p>
            {snippets.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700/50 rounded-lg p-2.5 flex items-center gap-2 hover:border-blue-500/30 transition-colors">
                <button onClick={() => setCode(s.code)} className="flex-1 text-left text-xs text-slate-400 hover:text-blue-400 font-medium truncate transition-colors">
                  {s.name}
                </button>
                <button onClick={() => setSnippets(snippets.filter((_, idx) => idx !== i))} className="text-slate-700 hover:text-red-400 transition-colors flex-shrink-0">
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
