export function calcPhaseProgress(lessons, completedSet) {
  const total = lessons.length;
  const completed = lessons.filter((l) => completedSet.has(l.id)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}
