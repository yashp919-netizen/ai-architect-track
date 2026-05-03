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
    `.trim(),
    exerciseCode: `class ColumnProfile:
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
print("Problematic?", col.is_problematic())`
  }
];
