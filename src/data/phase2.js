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
    "name_in": ["Luminos 250ml", "Zephyr 200ml", "New Item"]
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
df["sku_num"] = df["sku_id"].str.extract(r"(\\d+)").astype(float)
print("\\nWith extracted numeric ID:")
print(df)
`
  }
];
