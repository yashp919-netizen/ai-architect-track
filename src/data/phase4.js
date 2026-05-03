// src/data/phase4.js
// Phase 4: LangGraph and Multi-Agent Architecture
// 6 lessons, leading to full Mosaic comprehension

export const phase4Lessons = [
  {
    id: "p4-l1",
    number: 1,
    title: "State machines and graph-based agents",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/aHCDrAbH_go",
    videoTitle: "What is LangGraph?",
    instructor: "LangChain",
    concepts: ["state machine", "DAG", "nodes", "edges", "shared state"],
    content: `
## Why this matters

A LangGraph state machine is fundamentally different from a chain of
function calls. It has memory, can pause, can branch, can be resumed
days later. That's why it's the right abstraction for enterprise
workflows.

## ETL translation
A LangGraph is closer to a BODS dataflow than a script. Nodes are
transforms. Edges are data flow. State is the dataset.
    `.trim()
  },
  {
    id: "p4-l2",
    number: 2,
    title: "LangGraph quickstart — your first graph",
    duration: "75 min",
    videoUrl: "https://www.youtube.com/embed/_l5Y-IOr4FY",
    videoTitle: "LangGraph Tutorial",
    instructor: "LangChain Academy",
    concepts: ["StateGraph", "TypedDict", "add_node", "add_edge", "compile"],
    content: `
## Hands-on
Work through the official LangGraph "Quick Start" tutorial:
https://langchain-ai.github.io/langgraph/tutorials/introduction/

Build the simple chatbot they describe in your laptop's terminal,
not in this browser. Pyodide can't run LangGraph (requires server-side
imports). The exercise is to internalize the pattern.
    `.trim()
  },
  {
    id: "p4-l3",
    number: 3,
    title: "Tools, conditional routing, and branching",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/9V_VeIeLnxQ",
    videoTitle: "Building Agents with LangGraph",
    instructor: "LangChain",
    concepts: ["conditional edge", "tool calling", "ReAct pattern"],
    content: `
## Mosaic context
Atlas → conditional → human_review or finalize.
That conditional edge is the architectural centerpiece.

Open Mosaic's \`src/mosaic/orchestrator/graph.py\`. Find the conditional
edge. Trace what triggers human review.
    `.trim()
  },
  {
    id: "p4-l4",
    number: 4,
    title: "Checkpointers and human-in-the-loop",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/9BPCV5TYPmg",
    videoTitle: "Human-in-the-Loop with LangGraph",
    instructor: "LangChain",
    concepts: ["MemorySaver", "interrupt", "Command(resume=...)", "thread_id"],
    content: `
## Why this is the magic of LangGraph

A normal Python script runs top-to-bottom and exits. A LangGraph state
machine with a checkpointer can pause indefinitely, wait for human
input, and resume exactly where it left off. That's the architecture
that makes Mosaic feel like a real enterprise tool.

## Mosaic exercise
Open \`src/mosaic/orchestrator/graph.py\`. Find the human_review_node.
Find where interrupt() is called. Find where Command(resume=...) flows
back into the graph from cli.py. Walk through this pattern. Explain
it out loud.
    `.trim()
  },
  {
    id: "p4-l5",
    number: 5,
    title: "Multi-agent collaboration patterns",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/4nZl32FwU-o",
    videoTitle: "Multi-Agent Systems with LangGraph",
    instructor: "LangChain",
    concepts: ["supervisor", "swarm", "generator-critic", "hierarchical"],
    content: `
## Read alongside the video
Anthropic's "Building effective agents":
https://anthropic.com/engineering/building-effective-agents

This essay is the canonical reference for the patterns. Memorize the
diagrams.

## Mosaic context
v1 uses sequential collaboration. v2 will use generator-critic between
Alchemist and Sentinel. After this lesson, you should be able to
sketch v2's graph yourself.
    `.trim()
  },
  {
    id: "p4-l6",
    number: 6,
    title: "Walking through Mosaic's architecture",
    duration: "Self-led",
    videoUrl: "https://www.loom.com/embed/7a333ce48c9f446bbdff384248f1dea6",
    videoTitle: "Mosaic Walkthrough",
    instructor: "You",
    concepts: ["full system trace", "all agents", "state flow", "interrupt cycle"],
    content: `
## The final exercise

Open Mosaic in VS Code. Open these files in tabs:
- src/mosaic/orchestrator/graph.py
- src/mosaic/orchestrator/state.py
- src/mosaic/agents/scout.py
- src/mosaic/agents/atlas.py
- src/mosaic/agents/scribe.py
- src/mosaic/cli.py

For every line in graph.py, you should be able to explain:
- What this line does
- Why it's there (architectural decision)
- What would break if you removed it

Then record a 5-minute Loom of yourself walking through the system,
no notes. Watch the recording. Any place you stumbled = a gap to close.

## When you can do this confidently

You have genuinely closed the loop. You don't just *have* a project
on GitHub. You *own* it. That's the bar.

## Now you're ready
- Post the LinkedIn launch (the one we drafted)
- Ship Mosaic v2 (Alchemist + Sentinel)
- Start the Google Cloud ML Engineer cert prep
- Take interviews with confidence
    `.trim()
  }
];
