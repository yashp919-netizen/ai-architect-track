import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Database, GitBranch, Search, FileCheck, Shield, Layers } from 'lucide-react';

const AGENTS = [
  {
    name: 'Scout',
    icon: <Search size={18} />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    role: 'Column Profiler',
    description: 'Reads each market CSV, profiles every column — infers dtype, null rate, sample values, and language. Produces a ColumnProfile per column.',
    tech: ['pandas', 'Claude API', 'Pydantic'],
    phase: 'Phase 2–3',
  },
  {
    name: 'Atlas',
    icon: <GitBranch size={18} />,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    role: 'Schema Mapper',
    description: 'Takes Scout\'s profiles, embeds column names with BGE-m3, runs FAISS vector search to find candidate target schema fields, then uses Claude to score and rank each mapping.',
    tech: ['BGE-m3 embeddings', 'FAISS', 'Claude API', 'cosine similarity'],
    phase: 'Phase 3',
  },
  {
    name: 'Alchemist',
    icon: <Database size={18} />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    role: 'Transform Generator',
    description: 'Receives Atlas\'s approved mappings and generates the actual pandas transformation code — type casts, unit conversions (oz→g), date normalisation, deduplication.',
    tech: ['pandas', 'Claude API', 'code generation'],
    phase: 'Phase 2 + 4',
  },
  {
    name: 'Scribe',
    icon: <FileCheck size={18} />,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    role: 'Lineage Recorder',
    description: 'After each successful run, writes a structured LineageRecord to the audit log — source file, mappings used, transforms applied, confidence scores, reviewer decision.',
    tech: ['Pydantic', 'JSON', 'file I/O'],
    phase: 'Phase 3–4',
  },
  {
    name: 'Sentinel',
    icon: <Shield size={18} />,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    role: 'Quality Validator (v2)',
    description: 'Planned for v2. Critiques Alchemist\'s output using a generator-critic pattern — checks for data loss, type errors, and outliers before the result is committed.',
    tech: ['LangGraph', 'multi-agent', 'generator-critic'],
    phase: 'Phase 4',
  },
];

const PHASES = [
  { number: 1, title: 'Python Fluency', connection: 'Mosaic is pure Python. Scout, Atlas, Alchemist, Scribe are all Python functions and classes. Before you can read Mosaic\'s code, you need to own Python\'s fundamentals.', id: 'phase-1', color: 'border-blue-500/30 text-blue-400' },
  { number: 2, title: 'pandas & Data', connection: 'Scout reads CSVs with pandas. Alchemist writes pandas transforms. Mosaic\'s synthetic data generator is pure pandas. Every df.merge(), df.groupby(), df.fillna() in the codebase will make sense.', id: 'phase-2', color: 'border-violet-500/30 text-violet-400' },
  { number: 3, title: 'AI Stack', connection: 'Atlas\'s core logic is embeddings + FAISS + Claude API. You\'ll understand why BGE-m3 was chosen (multilingual), why FAISS over Qdrant (small corpus), and why instructor enforces typed outputs.', id: 'phase-3', color: 'border-emerald-500/30 text-emerald-400' },
  { number: 4, title: 'LangGraph', connection: 'Mosaic\'s orchestrator is a LangGraph state machine. Scout→Atlas→human_review→Alchemist→Scribe — that\'s your graph. The human-in-the-loop interrupt is the architectural centrepiece.', id: 'phase-4', color: 'border-orange-500/30 text-orange-400' },
];

const MARKETS = [
  { flag: '🇬🇧', name: 'UK', detail: 'CSV, comma-sep, UTF-8, ISO dates, weight in grams' },
  { flag: '🇮🇳', name: 'India', detail: 'CSV, comma-sep, mixed Latin + Devanagari, DD/MM/YY dates' },
  { flag: '🇧🇷', name: 'Brazil', detail: 'CSV, semicolon-sep, UTF-8, weight in ounces' },
];

export default function Mosaic() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-slate-900 border border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative px-6 py-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              <Layers size={10} /> Your Capstone Project
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            Mosaic
          </h1>
          <p className="text-slate-300 text-sm font-medium mb-1">Multi-agent AI reference architecture for CPG product master harmonisation</p>
          <p className="text-slate-500 text-sm max-w-2xl">
            Mosaic solves a real enterprise problem: when a CPG company migrates to the cloud, product master data from three different markets arrives in three different formats. Mosaic uses a pipeline of specialised AI agents to profile, map, transform, and audit that data — with a human in the loop at every low-confidence decision.
          </p>
        </div>
      </div>

      {/* The problem */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">The Problem Mosaic Solves</h2>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {MARKETS.map((m) => (
              <div key={m.name} className="bg-slate-800/60 rounded-lg p-3">
                <p className="text-lg mb-1">{m.flag} <span className="text-slate-200 font-semibold text-sm">{m.name}</span></p>
                <p className="text-xs text-slate-500">{m.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            Each market exports product data in a different format, schema, and encoding. A product called <span className="text-slate-200 font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">PROD_NM</span> in the UK file is <span className="text-slate-200 font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">product_name</span> in India and <span className="text-slate-200 font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">nome_produto</span> in Brazil. Mosaic figures out these mappings autonomously — and asks a human when it's not sure.
          </p>
        </div>
      </section>

      {/* Pipeline flow */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">The Agent Pipeline</h2>
        <div className="flex flex-col gap-3">
          {AGENTS.map((agent, i) => (
            <div key={agent.name} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl border ${agent.bg} flex items-center justify-center ${agent.color} flex-shrink-0`}>
                  {agent.icon}
                </div>
                {i < AGENTS.length - 1 && (
                  <div className="w-px h-full min-h-[20px] bg-slate-800 mt-2" />
                )}
              </div>
              <div className={`flex-1 bg-slate-900 border border-slate-700/50 rounded-xl p-4 mb-3`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${agent.color}`}>{agent.name}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{agent.role}</span>
                  </div>
                  <span className="text-xs text-slate-700 bg-slate-800 px-2 py-0.5 rounded-full">{agent.phase}</span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{agent.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.tech.map((t) => (
                    <span key={t} className="text-xs text-slate-500 bg-slate-800 border border-slate-700/50 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum connection */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Why Each Phase Matters for Mosaic</h2>
        <div className="flex flex-col gap-3">
          {PHASES.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/phase/${p.id}`)}
              className={`bg-slate-900 border ${p.color.split(' ')[0]} rounded-xl p-4 cursor-pointer hover:bg-slate-800/60 transition-colors group`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${p.color.split(' ')[1]}`}>Phase {p.number}</span>
                  <span className="text-slate-600 text-xs">·</span>
                  <span className="text-slate-300 text-xs font-medium">{p.title}</span>
                </div>
                <ArrowRight size={13} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
              </div>
              <p className="text-sm text-slate-500">{p.connection}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key files */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Files to Know</h2>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
          {[
            { file: 'src/mosaic/schemas.py', what: 'All Pydantic models — ColumnProfile, MarketProfile, MappingProposal, LineageRecord' },
            { file: 'src/mosaic/orchestrator/graph.py', what: 'The LangGraph state machine — nodes, edges, conditional routing, human interrupt' },
            { file: 'src/mosaic/orchestrator/state.py', what: 'The shared TypedDict state that flows through every node' },
            { file: 'src/mosaic/agents/scout.py', what: 'Column profiling agent — reads CSVs, calls Claude, returns ColumnProfile[]' },
            { file: 'src/mosaic/agents/atlas.py', what: 'Schema mapping agent — embeddings, FAISS, Claude scoring, MappingProposal[]' },
            { file: 'src/mosaic/agents/scribe.py', what: 'Audit trail agent — writes LineageRecord to JSON after each run' },
            { file: 'src/mosaic/cli.py', what: 'Entry point — starts the graph, handles human_review interrupt, resume flow' },
            { file: 'data/synth/generator.py', what: 'Synthetic data generator — creates realistic test CSVs for all three markets' },
          ].map(({ file, what }, i) => (
            <div key={file} className={`flex gap-3 px-4 py-3 ${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
              <code className="text-xs text-blue-300 font-mono flex-shrink-0 w-64 truncate">{file}</code>
              <p className="text-xs text-slate-500">{what}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900 border border-slate-700/50 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-200 mb-0.5">Ready to start?</p>
          <p className="text-xs text-slate-500">Phase 1 teaches you everything you need to read Mosaic's Python.</p>
        </div>
        <button
          onClick={() => navigate('/phase/phase-1')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          Start Phase 1 <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
