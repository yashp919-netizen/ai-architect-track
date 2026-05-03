import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import PythonRunner from '../components/PythonRunner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Save, Trash2 } from 'lucide-react';

const STARTER = `# Welcome to your Python playground.
# Write code below and click Run.
# Pandas and NumPy are pre-loaded.

import pandas as pd

# Create a small DataFrame
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

  function deleteSnippet(i) {
    setSnippets(snippets.filter((_, idx) => idx !== i));
  }

  function loadSnippet(snippet) {
    setCode(snippet.code);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-800">Python Playground</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          pandas and NumPy are pre-loaded. First run takes 15–30s while the Python runtime initialises.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Editor + runner */}
        <div className="flex-1 flex flex-col gap-3">
          <CodeEditor initialCode={code} onChange={setCode} height="360px" />
          <PythonRunner code={code} onReset={() => setCode(STARTER)} />

          {/* Save snippet */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={snippetName}
              onChange={(e) => setSnippetName(e.target.value)}
              placeholder="Snippet name (optional)"
              className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              onKeyDown={(e) => e.key === 'Enter' && saveSnippet()}
            />
            <button
              onClick={saveSnippet}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors"
            >
              <Save size={12} />
              Save snippet
            </button>
          </div>
        </div>

        {/* Saved snippets sidebar */}
        {snippets.length > 0 && (
          <div className="lg:w-56 flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saved snippets</p>
            {snippets.map((s, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between gap-2 hover:border-blue-300 transition-colors"
              >
                <button
                  onClick={() => loadSnippet(s)}
                  className="flex-1 text-left text-xs text-slate-700 font-medium truncate hover:text-blue-600"
                >
                  {s.name}
                </button>
                <button
                  onClick={() => deleteSnippet(i)}
                  className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
