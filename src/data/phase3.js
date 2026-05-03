// src/data/phase3.js
// Phase 3: Understanding the AI Stack
// 6 lessons, mix of video + heavy reading

export const phase3Lessons = [
  {
    id: "p3-l1",
    number: 1,
    title: "How LLMs actually work — Karpathy's intro",
    duration: "1 hour",
    videoUrl: "https://www.youtube.com/embed/zjkBMFhNj_g",
    videoTitle: "Intro to Large Language Models",
    instructor: "Andrej Karpathy",
    concepts: ["transformer", "attention", "tokens", "training", "fine-tuning"],
    content: `
## Why this is the most important hour

Every concept in Phase 3 builds on this. Karpathy explains LLMs at
exactly the right level for engineers — not too academic, not too
shallow. Watch it twice. Take notes on paper.

## Self-check after watching
- What is the difference between a base model and an instruction-tuned model?
- What is RLHF and why does it matter?
- Why are tokens, not words, the unit of LLM input/output?
    `.trim()
  },
  {
    id: "p3-l2",
    number: 2,
    title: "Tokens, context, and prompting",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/dOxUroR57xs",
    videoTitle: "Prompt Engineering Overview",
    instructor: "DeepLearning.AI",
    concepts: ["tokenization", "context window", "system prompt", "temperature", "top_p"],
    content: `
## Hands-on after watching

Read Anthropic's "Building effective agents" essay:
https://anthropic.com/engineering/building-effective-agents

Then in your head answer: when would you use a multi-step agent vs a
single prompt? Mosaic answers this: when you need typed handoffs
between specialized concerns.
    `.trim(),
    exerciseCode: `# This won't run — it's just an illustration of the API shape
# Real code requires an actual LLM client.

# This is the canonical OpenAI-compatible call shape:
example_request = {
    "model": "gpt-4",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is RAG?"}
    ],
    "temperature": 0.0,  # 0 = deterministic, 1 = creative
    "max_tokens": 500
}

print("Request shape:")
import json
print(json.dumps(example_request, indent=2))

# Mosaic's Atlas tie-breaker uses temperature=0 for consistency.
# Scout's column characterization uses temperature=0.3 for variety.
# Why? The first needs to be reproducible. The second benefits from natural language.
`
  },
  {
    id: "p3-l3",
    number: 3,
    title: "Embeddings and cosine similarity",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/QdDoFfkVkcw",
    videoTitle: "What Are Word Embeddings?",
    instructor: "Computerphile",
    concepts: ["embedding", "vector", "cosine similarity", "BGE-m3"],
    content: `
## After the video

Read Jay Alammar's "Illustrated Word2Vec" — visual, intuitive:
https://jalammar.github.io/illustrated-word2vec/

This is the most important visual explanation you'll find of how
text becomes vectors.

## Mosaic context
Mosaic uses BGE-m3 (1024 dimensions). Why? Multilingual support for
Indian Devanagari and Brazilian Portuguese without separate models.
    `.trim(),
    exerciseCode: `import numpy as np

# Simulating embeddings (in reality these come from a model like BGE-m3)
# Two similar phrases should have high cosine similarity
embedding_a = np.array([0.1, 0.5, 0.8, -0.2, 0.3])  # "product name"
embedding_b = np.array([0.15, 0.45, 0.85, -0.18, 0.28])  # "PROD_NM"
embedding_c = np.array([-0.5, 0.1, 0.0, 0.7, -0.3])  # "barcode"

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

print("product_name vs PROD_NM:", cosine_similarity(embedding_a, embedding_b))
print("product_name vs barcode:", cosine_similarity(embedding_a, embedding_c))

# In Mosaic, Atlas computes this similarity matrix to find candidate mappings.
`
  },
  {
    id: "p3-l4",
    number: 4,
    title: "Vector search — FAISS basics",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/sKyvsdEv6rk",
    videoTitle: "FAISS Tutorial — Vector Similarity Search",
    instructor: "James Briggs",
    concepts: ["FAISS", "ANN", "indexing", "L2 distance", "inner product"],
    content: `
## ETL translation
A vector database is to embeddings what a SQL database is to rows.
Both index for fast lookup. FAISS is in-process (like SQLite), Qdrant
is server-based (like Postgres).

## Mosaic context
Mosaic uses FAISS in-process because the corpus is tiny (~30 vectors
total). For 100K+ vectors you'd want Qdrant. ADR-0001 in the Mosaic
repo documents this trade-off.
    `.trim()
  },
  {
    id: "p3-l5",
    number: 5,
    title: "RAG — retrieval-augmented generation",
    duration: "75 min",
    videoUrl: "https://www.youtube.com/embed/T-D1OfcDW1M",
    videoTitle: "What is Retrieval-Augmented Generation (RAG)?",
    instructor: "IBM Technology",
    concepts: ["retrieval", "chunking", "reranking", "hybrid search"],
    content: `
## Read after watching
Pinecone's "Learn" series, sections on chunking and reranking:
https://www.pinecone.io/learn/

## Self-check
- Why is RAG often better than fine-tuning?
- When does fine-tuning win?
- What's the difference between dense and sparse retrieval?
    `.trim()
  },
  {
    id: "p3-l6",
    number: 6,
    title: "Structured outputs with Pydantic + instructor",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/yj-wSRJwrrc",
    videoTitle: "Pydantic Tutorial • Solving Python's Biggest Problem",
    instructor: "ArjanCodes",
    concepts: ["Pydantic", "BaseModel", "validators", "instructor", "type-safe LLM output"],
    content: `
## Why this matters
Mosaic uses Pydantic + instructor everywhere. Every agent's output is
a typed Pydantic model. This is what makes the system auditable.

## End of Phase 3 self-test
Open Mosaic's \`src/mosaic/agents/scout.py\` and \`atlas.py\`. Find every
use of Pydantic and instructor. Explain what each does. If you can,
Phase 3 is complete.
    `.trim(),
    exerciseCode: `from pydantic import BaseModel, Field

# Pydantic isn't available in Pyodide by default, so we simulate the pattern:
class ColumnProfile:
    """Simulates a Pydantic BaseModel for demonstration."""

    def __init__(self, column_name: str, inferred_dtype: str, null_rate: float):
        if not column_name.strip():
            raise ValueError("column_name cannot be empty")
        if not 0 <= null_rate <= 1:
            raise ValueError("null_rate must be between 0 and 1")
        valid_types = {"string", "integer", "float", "date", "boolean"}
        if inferred_dtype not in valid_types:
            raise ValueError(f"inferred_dtype must be one of {valid_types}")
        self.column_name = column_name.strip()
        self.inferred_dtype = inferred_dtype
        self.null_rate = null_rate

    def to_dict(self):
        return {
            "column_name": self.column_name,
            "inferred_dtype": self.inferred_dtype,
            "null_rate": self.null_rate
        }

import json

# Try it
prof = ColumnProfile(column_name="PROD_NM", inferred_dtype="string", null_rate=0.02)
print(json.dumps(prof.to_dict(), indent=2))

# Try invalid data
try:
    bad = ColumnProfile(column_name="", inferred_dtype="string", null_rate=1.5)
except ValueError as e:
    print(f"\\nValidation caught: {e}")
`
  }
];
