import { useLocalStorage } from './useLocalStorage';
import { CURRICULUM } from '../data/curriculum';

function today() {
  return new Date().toISOString().split('T')[0];
}

export function useProgress() {
  const [completedArray, setCompletedArray] = useLocalStorage('completedLessons', []);
  const [lastActivityDate, setLastActivityDate] = useLocalStorage('lastActivityDate', null);
  const [currentStreak, setCurrentStreak] = useLocalStorage('currentStreak', 0);
  const [longestStreak, setLongestStreak] = useLocalStorage('longestStreak', 0);

  const completedLessons = new Set(completedArray);

  function markComplete(lessonId) {
    if (completedLessons.has(lessonId)) return;
    const newSet = new Set(completedLessons);
    newSet.add(lessonId);
    setCompletedArray([...newSet]);

    const todayStr = today();
    let newStreak = currentStreak;

    if (lastActivityDate === todayStr) {
      // already counted today
    } else if (lastActivityDate === getPreviousDay(todayStr)) {
      newStreak = currentStreak + 1;
    } else {
      newStreak = 1;
    }

    setLastActivityDate(todayStr);
    setCurrentStreak(newStreak);
    if (newStreak > longestStreak) setLongestStreak(newStreak);
  }

  function markIncomplete(lessonId) {
    const newSet = new Set(completedLessons);
    newSet.delete(lessonId);
    setCompletedArray([...newSet]);
  }

  function getPhaseProgress(phaseId) {
    const phase = CURRICULUM.find((p) => p.id === phaseId);
    if (!phase) return { completed: 0, total: 0, percent: 0 };
    const total = phase.lessons.length;
    const completed = phase.lessons.filter((l) => completedLessons.has(l.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  }

  function getTotalProgress() {
    const allLessons = CURRICULUM.flatMap((p) => p.lessons);
    const total = allLessons.length;
    const completed = allLessons.filter((l) => completedLessons.has(l.id)).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent };
  }

  function resetProgress() {
    setCompletedArray([]);
    setLastActivityDate(null);
    setCurrentStreak(0);
    setLongestStreak(0);
  }

  return {
    completedLessons,
    markComplete,
    markIncomplete,
    getPhaseProgress,
    getTotalProgress,
    currentStreak,
    longestStreak,
    resetProgress,
  };
}

function getPreviousDay(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}
