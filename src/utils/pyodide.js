let pyodideInstance = null;
let loading = null;

export async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance;
  if (loading) return loading;

  loading = (async () => {
    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
    });
    await pyodide.loadPackage(['pandas', 'numpy']);
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return loading;
}
