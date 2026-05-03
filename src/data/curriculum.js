import { phase1Lessons } from './phase1';
import { phase2Lessons } from './phase2';
import { phase3Lessons } from './phase3';
import { phase4Lessons } from './phase4';

export const CURRICULUM = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Python Fluency',
    subtitle: 'For someone with ETL background',
    weeks: 'Weeks 1-2',
    dayRange: [1, 14],
    description:
      'Build a solid Python foundation from an ETL professional perspective. Every concept is grounded in real Mosaic use cases.',
    goals: [
      'Read and write Python without looking things up',
      'Understand variables, types, lists, dicts, functions, classes',
      "Explain every line in Mosaic's schemas.py",
      'Run hands-on exercises in the browser playground',
    ],
    lessons: phase1Lessons,
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'pandas & Data Manipulation',
    subtitle: 'Your ETL instincts, in Python',
    weeks: 'Weeks 3-4',
    dayRange: [15, 28],
    description:
      'Master pandas — the Python equivalent of your BODS dataflows. DataFrames, filtering, joins, aggregations, and messy data handling.',
    goals: [
      'Load and inspect any CSV with pandas',
      'Filter, group, and aggregate DataFrames',
      'Join multiple DataFrames (inner, left, outer)',
      'Handle nulls, wrong types, and encoding issues',
    ],
    lessons: phase2Lessons,
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Understanding the AI Stack',
    subtitle: 'LLMs, embeddings, RAG, Pydantic',
    weeks: 'Weeks 5-6',
    dayRange: [29, 42],
    description:
      'Understand how LLMs actually work. Build intuition for tokens, embeddings, vector search, and structured outputs — the components powering Mosaic.',
    goals: [
      'Explain how a transformer LLM works at engineer level',
      'Understand tokenization and context windows',
      'Implement cosine similarity for embedding matching',
      'Use Pydantic for type-safe LLM outputs',
    ],
    lessons: phase3Lessons,
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'LangGraph & Multi-Agent Systems',
    subtitle: 'The architecture behind Mosaic',
    weeks: 'Weeks 7-8',
    dayRange: [43, 56],
    description:
      "Learn LangGraph state machines, tool calling, human-in-the-loop patterns, and multi-agent collaboration. Then walk through Mosaic's entire architecture.",
    goals: [
      'Build a working LangGraph state machine',
      'Implement conditional routing and tool calling',
      'Understand checkpointers and human-in-the-loop',
      "Explain every node in Mosaic's graph.py",
    ],
    lessons: phase4Lessons,
  },
];
