# AI Architect Track — Build Spec

> A personal interactive learning platform for an 8-week AI/Python curriculum.
>
> Stack: React + Vite + Tailwind + Pyodide. Deployed to Vercel.
> Built in 3 Claude Code sessions, ~3-4 hours each.
> Single-user, private progress storage in browser localStorage.

---

## Before you start

**1. Create the GitHub repo.** On github.com, create `ai-architect-track`, public, MIT license. Don't add a README — Claude Code will create one.

**2. Clone locally.**
```bash
cd ~/Projects   # wherever you keep code
git clone https://github.com/yashp919-netizen/ai-architect-track.git
cd ai-architect-track
```

**3. Open in VS Code.** Then open Claude Code inside it.

**4. Save this entire file.** Drop it into the repo root as `BUILD_SPEC.md` so Claude Code can reference it across sessions.

```bash
# After saving this file as BUILD_SPEC.md in your repo:
git add BUILD_SPEC.md
git commit -m "Add build spec"
git push
```

---

## SESSION 1 — Scaffold + Navigation + Phase 1 content

Paste this into a fresh Claude Code session in your `ai-architect-track` repo:

````
I'm building a personal AI learning tracker called "AI Architect Track."
The full build specification is in BUILD_SPEC.md at the repo root.
Read that file first before doing anything.

Stack: React + Vite + Tailwind + Pyodide. All state in browser
localStorage. Deploys to Vercel.

This is Session 1 of 3. Today's scope: scaffold the app, build core
navigation, and populate Phase 1 (Python Fluency) with full content.
Phases 2-4 get built in Sessions 2 and 3.

Three tasks. Pause after each — show me the result and wait for "continue."

---

TASK 1 — Initialize the React project

Run `npm create vite@latest . -- --template react`
Choose React + JavaScript (not TypeScript).

Run `npm install`
Run `npm install -D tailwindcss postcss autoprefixer`
Run `npx tailwindcss init -p`

Install runtime dependencies:
- react-router-dom (navigation)
- react-markdown (lesson content rendering)
- remark-gfm (GitHub-flavored markdown for tables)
- lucide-react (icons)

Configure tailwind.config.js with content path:
  ["./index.html", "./src/**/*.{js,jsx}"]

Add Tailwind directives to src/index.css. Replace the default styles
with just the three @tailwind directives.

Update vite.config.js to add base: '/' (so deployment works).

Update package.json scripts to include "build" and "preview".

Test: `npm run dev` should open a working app on localhost:5173.

Show me the terminal output. Stop and wait for "continue."

---

TASK 2 — Project structure, routing, navigation

Create this folder structure:

src/
├── components/
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── PhaseCard.jsx
│   ├── DayBanner.jsx
│   ├── ProgressBar.jsx
│   ├── LessonCard.jsx
│   └── ConceptPill.jsx
├── pages/
│   ├── Home.jsx
│   ├── Phase.jsx
│   ├── Lesson.jsx
│   ├── Notes.jsx
│   └── Playground.jsx        (placeholder for now, full build in Session 2)
├── data/
│   ├── curriculum.js         (the curriculum structure)
│   └── phase1.js             (Phase 1 content — full)
├── hooks/
│   ├── useLocalStorage.js
│   └── useProgress.js
├── utils/
│   ├── progress.js
│   └── dayCalc.js
├── App.jsx
├── main.jsx
└── index.css

Implementation order:

1. hooks/useLocalStorage.js
   Custom hook: const [value, setValue] = useLocalStorage(key, defaultValue)
   - Reads from localStorage on mount
   - Writes to localStorage on every state change
   - JSON.stringify/parse for objects
   - Try/catch around JSON.parse for corrupted data

2. utils/dayCalc.js
   Function: getCurrentDay(startDate)
   Returns object: { dayNumber, phaseId, phaseNumber, weekInPhase }
   Logic:
   - daysSinceStart = floor((now - startDate) / (1000*60*60*24)) + 1
   - Day 1-14:  Phase 1, weekInPhase = ceil(day/7)
   - Day 15-28: Phase 2
   - Day 29-42: Phase 3
   - Day 43-56: Phase 4
   - Day 57+:   Phase 4, weekInPhase = "post-curriculum"

3. data/curriculum.js
   Export const CURRICULUM = an array of 4 phase objects:
   {
     id: "phase-1", number: 1, title: "Python Fluency",
     subtitle: "For someone with ETL background",
     weeks: "Weeks 1-2", dayRange: [1, 14],
     description: "...", goals: [...], lessons: [...]
   }
   For Phase 1, import lessons from data/phase1.js.
   For Phases 2-4, leave lessons: [] for now.

4. data/phase1.js
   Full content for Phase 1. See "PHASE 1 CONTENT" section below.

5. components/ProgressBar.jsx
   Props: { value, max, label?, color? }
   Renders a horizontal bar with percentage fill.

6. components/ConceptPill.jsx
   Props: { children }
   Small rounded pill for concept tags. Use bg-slate-100 text-slate-700.

7. components/LessonCard.jsx
   Props: { lesson, completed, onClick }
   Card showing: lesson title, duration, concepts (as ConceptPills),
   checkbox indicating completion. Hover effect. Click navigates to lesson.

8. components/PhaseCard.jsx
   Props: { phase, progress }
   Card showing: phase number, title, subtitle, weeks, ProgressBar,
   "X of Y lessons complete" text. Click navigates to /phase/:id.

9. components/DayBanner.jsx
   Reads startDate from localStorage (if missing, sets it to today).
   Uses dayCalc to determine current state.
   Shows: "Day 7 of 56 · Phase 1 · Week 1" with a subtle gradient bg.

10. components/Sidebar.jsx
    Lists all 4 phases with mini progress bars.
    Active phase highlighted. Shows current day at top.
    Links: Home, Notes, Playground at the bottom.

11. components/Header.jsx
    App title "AI Architect Track" on left.
    On the right: streak counter ("3 day streak"), settings icon.

12. components/Layout.jsx
    Header at top, Sidebar on left (240px), main content area.
    Sticky sidebar, scrollable main content.
    On mobile (< 768px), Sidebar becomes a slide-in menu.

13. pages/Home.jsx
    DayBanner at top.
    Section "Today's plan" — calculates from current day, shows 1-2
    recommended lessons with action buttons.
    Section "All phases" — 4 PhaseCards in a 2x2 grid (1 column mobile).
    Section "Quick stats" — total lessons completed, total time invested,
    longest streak.

14. pages/Phase.jsx
    Reads :id from URL.
    Shows phase header (title, subtitle, weeks, description).
    Shows goals as a checklist.
    Shows all lessons as LessonCards in a grid.
    For phases with empty lessons (2-4 today), show "Coming soon — content
    being added before Day X" message.

15. pages/Lesson.jsx
    Reads :phaseId/:lessonId from URL.
    Renders the lesson:
    - Embedded YouTube iframe (responsive, 16:9)
    - Lesson description as react-markdown
    - "Concepts covered" pills
    - "Mark complete" button (toggles completion in localStorage)
    - "Next lesson" button at bottom
    - "Back to phase" link at top

16. pages/Notes.jsx
    A single textarea (full width, ~600px tall) bound to localStorage.
    Saves on blur. Shows last-saved timestamp.
    Use a monospace font.

17. pages/Playground.jsx
    For Session 1, just a placeholder: "Python Playground — full build
    in Session 2 with Pyodide integration."

18. App.jsx
    React Router setup with these routes inside Layout:
    /             → Home
    /phase/:id    → Phase
    /phase/:phaseId/lesson/:lessonId → Lesson
    /notes        → Notes
    /playground   → Playground

Visual design: clean, professional, slate/blue color palette, generous
whitespace. Inspired by Linear and Notion. Use Inter font (load from
Google Fonts in index.html).

Show me the running app at localhost:5173 with all pages reachable.
Stop and wait for "continue."

---

TASK 3 — Phase 1 content + completion tracking

This task wires up actual completion tracking and verifies Phase 1
content renders correctly.

1. hooks/useProgress.js
   Custom hook returning:
   - completedLessons: Set of lesson IDs (stored in localStorage)
   - markComplete(lessonId), markIncomplete(lessonId)
   - getPhaseProgress(phaseId) → { completed, total, percent }
   - getTotalProgress() → { completed, total, percent }

2. Integrate useProgress into:
   - PhaseCard (show real progress)
   - Sidebar (show real per-phase progress)
   - Home (show real stats)
   - LessonCard (show real completion state)
   - Lesson page ("Mark complete" actually toggles)

3. Verify Phase 1 content from data/phase1.js renders correctly:
   - Click Phase 1 in sidebar
   - All 6 Phase 1 lessons should appear as cards
   - Click first lesson — YouTube embed should load
   - "Mark complete" should toggle and persist after refresh
   - PhaseCard progress bar should update

4. Streak tracking:
   In useProgress, also track:
   - lastActivityDate (set whenever a lesson is marked complete)
   - currentStreak (consecutive days with at least one completion)
   - longestStreak (max ever)
   Show streak in Header.

5. Add a "Reset progress" button in Notes page (with confirmation).
   Useful for testing.

Deploy preview: run `npm run build` and `npm run preview`. Both should
work without errors.

Commit with message: "Session 1: scaffold + navigation + Phase 1 content"
Push to GitHub.

End of Session 1 checklist:
[ ] All pages render without errors
[ ] Phase 1 has 6 working lessons
[ ] YouTube embeds load on lesson page
[ ] Mark complete persists across refresh
[ ] Sidebar shows real progress per phase
[ ] Streak counter works
[ ] Notes page saves text to localStorage
[ ] Mobile layout works (resize browser to 400px, navigation should still work)
[ ] Build succeeds
````

---

### PHASE 1 CONTENT (paste into data/phase1.js when Claude Code asks)

```javascript
// src/data/phase1.js
// Phase 1: Python Fluency for ETL Professionals
// 6 lessons, ~14 hours of video, 2 weeks at 2hr/day

export const phase1Lessons = [
  {
    id: "p1-l1",
    number: 1,
    title: "Python basics — variables, types, operators",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/YYXdXT2l-Gg",
    videoTitle: "Python Tutorial for Beginners 1: Install and Setup",
    instructor: "Corey Schafer",
    concepts: ["variables", "strings", "numbers", "booleans", "type()"],
    content: `
## What you'll learn

How Python represents data. Strings, integers, floats, booleans.
The \`type()\` function. Basic arithmetic and string operations.

## Why this matters for you

You're moving from BODS where data types are declared in transforms.
In Python, types are inferred at runtime. This is faster to write but
means you need to *know* what type a value is when reading code.

## Hands-on after watching

Open a Python REPL (or the Playground tab) and try:
- Create a variable for your name (string), age (int), salary (float)
- Print all three using f-strings: \`print(f"My name is {name}")\`
- Use type() on each
- Try mixing types in operations and observe what fails

## Self-check before moving on

Without lookups, can you explain:
- Difference between \`5\` and \`"5"\`?
- What \`5 / 2\` returns vs \`5 // 2\`?
- What \`type("hello")\` returns?

If yes, mark complete and move on.
    `.trim()
  },
  {
    id: "p1-l2",
    number: 2,
    title: "Lists, tuples, sets — the data containers",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/W8KRzm-HUcc",
    videoTitle: "Python Tutorial for Beginners 4: Lists, Tuples, and Sets",
    instructor: "Corey Schafer",
    concepts: ["list", "tuple", "set", "indexing", "slicing", "mutability"],
    content: `
## What you'll learn

The three sequence types in Python and when to use which.
List comprehensions get their own lesson — this video covers basics.

## ETL professional translation

- **List** = a collection of rows you'll iterate over (like a BODS row set)
- **Tuple** = an immutable row (like a record schema you can't change)
- **Set** = a deduplicated collection (like SELECT DISTINCT)

## Hands-on after watching

Take a list of allergens: \`["milk", "egg", "milk", "soy", "egg"]\`
- Convert to a set to deduplicate
- Convert back to a list
- Sort alphabetically
- Get just the first 3 items via slicing
- Check if "peanut" is in the list (use \`in\` keyword)

## Self-check

Why would you use a tuple instead of a list?
What's the difference between \`list[0]\` and \`list[-1]\`?
What does \`list[1:4]\` return?
    `.trim()
  },
  {
    id: "p1-l3",
    number: 3,
    title: "Dictionaries — the workhorse of Python",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/daefaLgNkw0",
    videoTitle: "Python Tutorial for Beginners 5: Dictionaries",
    instructor: "Corey Schafer",
    concepts: ["dict", "keys", "values", "items", "get()", "nested dicts"],
    content: `
## Why dictionaries are crucial

JSON is a dict. API responses are dicts. Pydantic models compile to
dicts. LLM responses parse into dicts. You will use dictionaries
constantly. Master them.

## ETL professional translation

A dictionary is like a single row of a table represented as
column_name → value pairs. \`{"sku_id": "SKU-UK-00045", "weight_g": 270}\`

## Hands-on after watching

Build a dictionary representing one of Mosaic's UK rows:
\`\`\`python
row = {
    "sku_id": "SKU-UK-00045",
    "product_name": "Luminos Original 250ml",
    "brand": "Luminos",
    "weight_g": 270,
    "allergens": ["fragrance"]
}
\`\`\`

Now:
- Get the brand using \`row["brand"]\`
- Try \`row["barcode"]\` — observe the KeyError
- Use \`row.get("barcode", "unknown")\` — see the safer pattern
- Add a new key \`row["category"] = "Personal Care"\`
- Iterate with \`for key, value in row.items():\`
- Build a nested dict with multiple rows

## Self-check

What does \`dict.get()\` do that \`dict[]\` doesn't?
How do you safely check if a key exists?
How do you iterate over both keys and values?
    `.trim()
  },
  {
    id: "p1-l4",
    number: 4,
    title: "Conditionals and loops",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/DZwmZ8Usvnk",
    videoTitle: "Python Tutorial for Beginners 6: Conditionals and Booleans",
    instructor: "Corey Schafer",
    concepts: ["if/elif/else", "for", "while", "break", "continue", "enumerate"],
    content: `
## What you'll learn

How Python decides and how it iterates. \`if/elif/else\` for branching,
\`for\` loops for iteration, \`while\` for conditional looping.

## ETL professional translation

\`if\` = a CASE WHEN expression in BODS.
\`for\` = iterating over rows in a dataflow.
\`enumerate()\` = giving each row an index — equivalent to ROW_NUMBER().

## Hands-on

Process a list of allergen strings, classifying each:
\`\`\`python
allergens = ["milk", "egg", "fragrance", "soy", "test", ""]
for i, a in enumerate(allergens):
    if a == "":
        print(f"Row {i}: empty")
    elif a == "test":
        print(f"Row {i}: test data")
    elif a in {"milk", "egg", "soy"}:
        print(f"Row {i}: {a} is a regulated allergen")
    else:
        print(f"Row {i}: {a} is non-regulated")
\`\`\`

Modify it so it counts each category instead of printing.

## Self-check

When would you use \`continue\` vs \`break\`?
What does \`enumerate()\` give you that \`for\` alone doesn't?
What's the truthy/falsy rule for empty strings, lists, None?
    `.trim()
  },
  {
    id: "p1-l5",
    number: 5,
    title: "Functions — defining and calling",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/9Os0o3wzS_I",
    videoTitle: "Python Tutorial for Beginners 7: Functions",
    instructor: "Corey Schafer",
    concepts: ["def", "parameters", "return", "default args", "*args", "**kwargs", "type hints"],
    content: `
## What you'll learn

How to write reusable code. Functions are how Python organizes logic.

## Why this matters for AI engineering

Every agent in Mosaic is a function. Every LLM call is a function call.
Function design is system design at small scale.

## Hands-on

Write a function that classifies an allergen:
\`\`\`python
def classify_allergen(name: str) -> str:
    """Classify an allergen string into a category."""
    if not name or name == "":
        return "empty"
    if name.lower() in {"test", "xxx", "dummy"}:
        return "test_data"
    regulated = {"milk", "egg", "soy", "wheat", "peanut", "tree_nuts"}
    if name.lower() in regulated:
        return "regulated"
    return "non_regulated"

# Test it
print(classify_allergen("MILK"))      # should print "regulated"
print(classify_allergen(""))          # should print "empty"
print(classify_allergen("dummy"))     # should print "test_data"
\`\`\`

Now extend it: add a default parameter \`strict_mode=False\`. When True,
also flag uppercase-only entries as suspicious.

## Self-check

What's the difference between a parameter and an argument?
What do type hints do (and what don't they do)?
Why are default arguments evaluated once?
    `.trim()
  },
  {
    id: "p1-l6",
    number: 6,
    title: "Classes and objects — OOP basics",
    duration: "75 min",
    videoUrl: "https://www.youtube.com/embed/ZDa-Z5JzLYM",
    videoTitle: "Python OOP Tutorial 1: Classes and Instances",
    instructor: "Corey Schafer",
    concepts: ["class", "__init__", "self", "instance methods", "class attributes"],
    content: `
## Why OOP matters here

Pydantic models are classes. LangGraph nodes can be classes. Your
ColumnProfile, MarketProfile, MappingProposal in Mosaic are all classes.

## Hands-on

Build a simple ColumnProfile class without using Pydantic:
\`\`\`python
class ColumnProfile:
    def __init__(self, name: str, dtype: str, null_rate: float = 0.0):
        if not 0 <= null_rate <= 1:
            raise ValueError("null_rate must be 0-1")
        self.name = name
        self.dtype = dtype
        self.null_rate = null_rate
        self.flags = []
    
    def add_flag(self, flag: str):
        self.flags.append(flag)
    
    def is_problematic(self) -> bool:
        return self.null_rate > 0.5 or len(self.flags) > 0
    
    def __repr__(self):
        return f"ColumnProfile({self.name}, {self.dtype}, nulls={self.null_rate})"

# Test
col = ColumnProfile("PROD_NM", "string", 0.02)
col.add_flag("mixed_languages")
print(col)
print("Problematic?", col.is_problematic())
\`\`\`

Now compare this to Mosaic's actual ColumnProfile (a Pydantic class).
What does Pydantic give you that this manual class doesn't?

## Self-check

What does \`self\` refer to?
What's the difference between an instance attribute and a class attribute?
Why does \`__init__\` use double underscores?

## End of Phase 1 self-test

Open Mosaic's \`src/mosaic/schemas.py\`. For each Pydantic model
(TargetSchemaField, SkuRecord, ColumnProfile, MarketProfile,
MappingProposal, LineageRecord), in your own words explain:
- What does this model represent in the system?
- What does each field do?
- Why are these the chosen field types?

If you can do this without lookups, Phase 1 is complete.
    `.trim()
  }
];
```

---

## SESSION 2 — Pyodide playground + Phase 2 content (pandas)

Paste this into a fresh Claude Code session:

````
I'm continuing the build of the AI Architect Track learning platform.
Read BUILD_SPEC.md at the repo root for full context.

This is Session 2 of 3. Today's scope: integrate Pyodide for in-browser
Python execution, build the Playground page, and populate Phase 2
(pandas) with full content.

Three tasks. Pause after each.

---

TASK 1 — Pyodide integration

Add Pyodide via CDN, not via npm (the CDN approach is more reliable
for browser-loaded WASM).

In index.html, before the closing </body>:
  <script src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"></script>

Create src/utils/pyodide.js:
  - exports loadPyodideOnce() — singleton loader, returns a promise
  - on first call: window.loadPyodide({...}) with indexURL pointing to CDN
  - caches the instance globally so subsequent calls are instant
  - preloads pandas and numpy: await pyodide.loadPackage(["pandas", "numpy"])
  - returns the pyodide instance

Create components/CodeEditor.jsx:
  - Use a textarea styled to look like a code editor (monospace font,
    dark theme, line numbers if easy)
  - Or install @uiw/react-textarea-code-editor for syntax highlighting
  - Props: { initialCode, onChange, height }

Create components/PythonRunner.jsx:
  - Props: { code, onResult, onError }
  - Uses loadPyodideOnce() to get the Pyodide instance
  - On "Run" click, captures stdout via pyodide.runPython() with a 
    redirected stdout
  - Returns the printed output as a string
  - Handles exceptions cleanly, shows them in red

Create components/CodeOutput.jsx:
  - Props: { output, error, loading }
  - Shows loading spinner while Pyodide initializes
  - Shows output in a monospace bg-slate-50 box
  - Shows errors in red

Wire these into pages/Playground.jsx:
  - Top section: "Python Playground" heading + description
  - Left half: CodeEditor with starter code
  - Right half: CodeOutput
  - Run button between them
  - "Reset code" button to restore initial
  - "Save snippet" button — saves current code to localStorage with a 
    user-provided name; saved snippets appear in a sidebar
  - Initial starter code:

```
# Welcome to your Python playground.
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
```

Test: Open /playground, click Run, see the DataFrame printed.
Pyodide loads slowly the first time (10-30 seconds) — that's expected.
Subsequent runs are instant.

Stop and wait for "continue."

---

TASK 2 — Embedded Python in lessons

Modify pages/Lesson.jsx to support optional inline code blocks that
are runnable.

If a lesson has `exerciseCode` field (a string), render below the
content:
  - "Try it yourself" heading
  - CodeEditor populated with exerciseCode
  - Run button + CodeOutput
  - "Show solution" button if `exerciseSolution` exists
  - Reset button

This means Phase 1 lessons can now have working code exercises if we
add exerciseCode to them. Update the Phase 1 lesson 6 (Classes) to
include the ColumnProfile example as exerciseCode.

Stop and wait for "continue."

---

TASK 3 — Phase 2 content (pandas)

Create data/phase2.js with full Phase 2 content (see "PHASE 2 CONTENT"
section below). Wire it into curriculum.js — the Phase 2 lessons array
should now be populated.

All Phase 2 lessons should have exerciseCode where appropriate, so
learners practice in the browser immediately after watching.

Verify in browser:
  - Phase 2 page now shows 6 lessons
  - Lesson pages have working code editors
  - Pyodide loads pandas successfully
  - DataFrames render in output

Commit with message "Session 2: Pyodide playground + Phase 2 content"
Push.

End of Session 2 checklist:
[ ] Pyodide loads on /playground
[ ] Code execution works (DataFrame example runs)
[ ] Saved snippets persist
[ ] Phase 2 has 6 working lessons
[ ] Inline code editors work on lesson pages
[ ] Build succeeds (npm run build)
````

---

### PHASE 2 CONTENT (data/phase2.js)

```javascript
// src/data/phase2.js
// Phase 2: pandas and Data Manipulation
// 6 lessons, ~6 hours video + heavy practice

export const phase2Lessons = [
  {
    id: "p2-l1",
    number: 1,
    title: "DataFrames — the central abstraction",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/embed/ZyhVh-qRZPA",
    videoTitle: "Python Pandas Tutorial 1: DataFrame and Series",
    instructor: "Corey Schafer",
    concepts: ["DataFrame", "Series", "index", "columns", "shape"],
    content: `
## ETL professional translation

A DataFrame is a Datastore-loaded table held in memory. Series is a
column. Index is the row identifier (like a RowID in BODS).

## What you'll learn
How to create DataFrames, inspect them, access rows and columns.
    `.trim(),
    exerciseCode: `import pandas as pd

# Create a DataFrame from a dict (most common pattern)
data = {
    "sku_id": ["SKU-UK-00001", "SKU-UK-00002", "SKU-UK-00003"],
    "product_name": ["Luminos 250ml", "Zephyr Light 200ml", "Aurora Mint 100g"],
    "weight_g": [270, 220, 100]
}
df = pd.DataFrame(data)

# Inspect
print("Shape:", df.shape)
print("Columns:", df.columns.tolist())
print("\\nFirst 2 rows:")
print(df.head(2))

# Access a column (returns a Series)
print("\\nWeights:", df["weight_g"].tolist())

# Access a row (returns a Series)
print("\\nFirst row:")
print(df.iloc[0])
`
  },
  {
    id: "p2-l2",
    number: 2,
    title: "Reading and writing CSVs",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/N6hyN6BW6ao",
    videoTitle: "Python Pandas Tutorial 2: Reading CSV and Excel Files",
    instructor: "Corey Schafer",
    concepts: ["read_csv", "to_csv", "delimiters", "encoding", "headers"],
    content: `
## What you'll learn

Reading CSVs is your bread and butter. Pandas handles the messy reality:
different delimiters, encodings, missing headers, quoted strings.

## Mosaic-grounded note

Mosaic's three markets each use a different format:
- UK: comma-separated, UTF-8, ISO dates
- India: comma-separated, mixed Latin+Devanagari, DD/MM/YY dates
- Brazil: SEMICOLON-separated, UTF-8, weight in oz

You'll need to handle all of these.
    `.trim(),
    exerciseCode: `import pandas as pd
from io import StringIO

# Simulating reading a CSV (in real code: pd.read_csv("path.csv"))
uk_csv = """sku_id,product_name,weight_g
SKU-UK-001,Luminos 250ml,270
SKU-UK-002,Zephyr 200ml,220"""

br_csv = """codigo_sku;nome_produto;peso_oz
BR-001;Luminos 250ml;9.52
BR-002;Zephyr 200ml;7.76"""

df_uk = pd.read_csv(StringIO(uk_csv))
df_br = pd.read_csv(StringIO(br_csv), sep=";")

print("UK DataFrame:")
print(df_uk)
print("\\nBrazil DataFrame:")
print(df_br)

# Notice: BR weight is in ounces. Convert to grams:
df_br["weight_g"] = df_br["peso_oz"] * 28.3495
print("\\nBrazil with weight in grams:")
print(df_br)
`
  },
  {
    id: "p2-l3",
    number: 3,
    title: "Filtering and selecting data",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/Lw2rlcxScZY",
    videoTitle: "Python Pandas Tutorial 4: Filtering Rows",
    instructor: "Corey Schafer",
    concepts: ["boolean indexing", "loc", "iloc", "&", "|", "isin"],
    content: `
## ETL translation
This is your WHERE clause. Master it.
    `.trim(),
    exerciseCode: `import pandas as pd

df = pd.DataFrame({
    "sku_id": ["SKU-001", "SKU-002", "SKU-003", "SKU-004", "TEST-001"],
    "weight_g": [270, 180, 1500, 95, 0],
    "brand": ["Luminos", "Zephyr", "Aurora", "Vesta", "TEST"]
})

# Filter: heavy products only
heavy = df[df["weight_g"] > 200]
print("Heavy products:")
print(heavy)

# Combined filter: heavy AND not test data
real_heavy = df[(df["weight_g"] > 200) & (df["brand"] != "TEST")]
print("\\nReal heavy products:")
print(real_heavy)

# isin: brand in a set
selected = df[df["brand"].isin(["Luminos", "Zephyr"])]
print("\\nSelected brands:")
print(selected)

# iloc: position-based, loc: label-based
print("\\nFirst 2 rows via iloc:")
print(df.iloc[:2])
`
  },
  {
    id: "p2-l4",
    number: 4,
    title: "Group by and aggregations",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/txMdrV1Ut64",
    videoTitle: "Python Pandas Tutorial 8: Grouping and Aggregating",
    instructor: "Corey Schafer",
    concepts: ["groupby", "agg", "count", "sum", "mean", "value_counts"],
    content: `
## ETL translation
GROUP BY in SQL = groupby() in pandas. Aggregations follow.
    `.trim(),
    exerciseCode: `import pandas as pd

df = pd.DataFrame({
    "category": ["body wash", "body wash", "shampoo", "shampoo", "soap"],
    "brand": ["Luminos", "Zephyr", "Luminos", "Aurora", "Vesta"],
    "weight_g": [270, 220, 200, 180, 95]
})

# Count products per category
print("Products per category:")
print(df["category"].value_counts())

# Average weight per category
print("\\nAvg weight per category:")
print(df.groupby("category")["weight_g"].mean())

# Multiple aggregations at once
print("\\nMulti-agg:")
print(df.groupby("category").agg(
    count=("brand", "count"),
    total_weight=("weight_g", "sum"),
    avg_weight=("weight_g", "mean")
))
`
  },
  {
    id: "p2-l5",
    number: 5,
    title: "Merging and joining DataFrames",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/iYWKfUOtGaw",
    videoTitle: "Python Pandas Tutorial 12: Merging and Joining",
    instructor: "Corey Schafer",
    concepts: ["merge", "join", "concat", "inner", "left", "outer"],
    content: `
## ETL translation
This is your JOIN. Pandas merge() is the equivalent of a SQL JOIN.
The "how" parameter is the join type.

## Mosaic-grounded scenario

Imagine joining UK and India market data on a common product ID.
That's the essence of cross-market entity resolution (a v2 Mosaic feature).
    `.trim(),
    exerciseCode: `import pandas as pd

uk = pd.DataFrame({
    "global_id": ["P001", "P002", "P003"],
    "name_uk": ["Luminos 250ml", "Zephyr 200ml", "Aurora 100g"],
    "weight_g": [270, 220, 100]
})

india = pd.DataFrame({
    "global_id": ["P001", "P002", "P004"],
    "name_in": ["Luminos 250मिली", "Zephyr 200ml", "New Item"]
})

# Inner join: only products in BOTH markets
both = uk.merge(india, on="global_id", how="inner")
print("Products in both markets:")
print(both)

# Left join: all UK products, with India data where available
left = uk.merge(india, on="global_id", how="left")
print("\\nAll UK products:")
print(left)

# Outer join: union of both
full = uk.merge(india, on="global_id", how="outer")
print("\\nFull union:")
print(full)
`
  },
  {
    id: "p2-l6",
    number: 6,
    title: "Handling missing data and types",
    duration: "60 min",
    videoUrl: "https://www.youtube.com/embed/KdmPHEnPJPs",
    videoTitle: "Python Pandas Tutorial 9: Cleaning Data",
    instructor: "Corey Schafer",
    concepts: ["NaN", "isna", "fillna", "dropna", "astype", "to_datetime"],
    content: `
## What you'll learn

Real data is messy. Nulls, wrong types, weird strings. Pandas gives
you the tools to clean it.

## End of Phase 2 self-test

Open Mosaic's \`data/synth/generator.py\`. Read every pandas operation.
Explain what each one does and why. If you can — Phase 2 is complete.
    `.trim(),
    exerciseCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "sku_id": ["SKU-001", "SKU-002", "SKU-003", "SKU-004"],
    "weight_g": [270, np.nan, 180, np.nan],
    "launch_date": ["2023-04-12", "12/04/23", None, "2023-06-01"]
})

# Inspect missing values
print("Missing values per column:")
print(df.isna().sum())

# Drop rows with any null
clean = df.dropna()
print("\\nAfter dropping nulls:")
print(clean)

# Or fill nulls with a default
filled = df.fillna({"weight_g": 0})
print("\\nFilled nulls:")
print(filled)

# Convert types
df["sku_num"] = df["sku_id"].str.extract(r"(\\d+)").astype(int)
print("\\nWith extracted numeric ID:")
print(df)
`
  }
];
```

---

## SESSION 3 — Phases 3 & 4 + Polish + Deploy

Paste this into a fresh Claude Code session:

````
Final session of the AI Architect Track build. Read BUILD_SPEC.md first.

Today: populate Phases 3 and 4 with full content, polish the UI, and
deploy to Vercel.

Three tasks.

---

TASK 1 — Phase 3 content (AI stack)

Create data/phase3.js using the "PHASE 3 CONTENT" section of BUILD_SPEC.md.

Phase 3 covers:
- Lesson 1: How LLMs actually work (Karpathy's Intro to LLMs)
- Lesson 2: Tokens, context, prompting
- Lesson 3: Embeddings and cosine similarity
- Lesson 4: Vector search and FAISS
- Lesson 5: RAG architecture
- Lesson 6: Structured outputs with Pydantic + instructor

Each lesson has video URL, content, exerciseCode where appropriate.

Wire phase3 into curriculum.js.

Stop and wait.

---

TASK 2 — Phase 4 content + final polish

Create data/phase4.js using the "PHASE 4 CONTENT" section.

Phase 4 covers:
- Lesson 1: State machines and graph-based agents
- Lesson 2: LangGraph quickstart — your first graph
- Lesson 3: Tools, state, and conditional routing
- Lesson 4: Checkpointers and human-in-the-loop
- Lesson 5: Multi-agent collaboration patterns
- Lesson 6: Walking through Mosaic's architecture

UI polish:
- Confetti animation when a phase is completed (use canvas-confetti)
- Daily reminder banner if user hasn't completed a lesson today
- "What I learned today" prompt on the Notes page that appends new
  entries with timestamps
- Print-friendly stylesheet for lesson content (so user can print
  exercises)
- Keyboard shortcuts: J/K to navigate lessons, Cmd+K to focus search

Stop and wait.

---

TASK 3 — Deploy to Vercel

Add a vercel.json at the root with build settings:
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
This is needed for SPA routing.

Verify build: npm run build, npm run preview.

Connect to Vercel:
1. Tell me to go to vercel.com and import the GitHub repo
2. Build command: npm run build
3. Output directory: dist
4. Install command: npm install

Once deployed, the app is live at a Vercel URL.

Update README.md with:
- Project description
- Live URL
- How to run locally
- Tech stack
- Acknowledgments (Corey Schafer for Python, etc.)

Final commit: "Session 3: Phases 3-4 + polish + Vercel deployment"
Push.

End of build checklist:
[ ] All 4 phases have 6 lessons each (24 total)
[ ] Pyodide playground works
[ ] Inline exercises work
[ ] Progress persists
[ ] Streak tracking works
[ ] Mobile responsive
[ ] Deployed to Vercel with public URL
[ ] README updated

Tell me the Vercel URL when ready.
````

---

### PHASE 3 CONTENT (data/phase3.js — full content)

```javascript
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
    exerciseCode: `from pydantic import BaseModel, Field, field_validator
from typing import Literal

# This is the kind of model Mosaic uses everywhere
class ColumnProfile(BaseModel):
    column_name: str
    inferred_dtype: Literal["string", "integer", "float", "date", "boolean"]
    null_rate: float = Field(ge=0, le=1, description="Fraction of nulls (0-1)")
    
    @field_validator("column_name")
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError("column_name cannot be empty")
        return v.strip()

# Try it
prof = ColumnProfile(column_name="PROD_NM", inferred_dtype="string", null_rate=0.02)
print(prof)
print(prof.model_dump_json(indent=2))

# Try invalid data
try:
    bad = ColumnProfile(column_name="", inferred_dtype="string", null_rate=1.5)
except Exception as e:
    print(f"\\nValidation caught: {e}")
`
  }
];
```

---

### PHASE 4 CONTENT (data/phase4.js — full content)

```javascript
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
```

---

## After Session 3 — what you have

**A live Vercel URL** like `ai-architect-track.vercel.app` accessible from any device.

**Your private learning OS** — 24 lessons, ~30 hours of curated video, every one with hands-on Python exercises that run in the browser.

**A 56-day curriculum** that calculates which day you're on and tells you what to do today.

**Persistent progress** — your notes, completed lessons, streaks, saved code snippets all survive page refreshes and follow you to any device (because Vercel + browser localStorage).

**A genuinely deeper foundation** — by Day 56 you can explain every line of Mosaic, debug Python without AI assistance, and walk into an AI Solutions Architect interview without faking anything.

---

*This file is the source of truth for the build. If something diverges, update the file and re-commit. Do not let the implementation drift silently.*
