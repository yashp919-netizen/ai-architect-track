export function getCurrentDay(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const dayNumber = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;

  let phaseNumber, phaseId, weekInPhase;

  if (dayNumber <= 14) {
    phaseNumber = 1;
    phaseId = 'phase-1';
    weekInPhase = Math.ceil(dayNumber / 7);
  } else if (dayNumber <= 28) {
    phaseNumber = 2;
    phaseId = 'phase-2';
    weekInPhase = Math.ceil((dayNumber - 14) / 7);
  } else if (dayNumber <= 42) {
    phaseNumber = 3;
    phaseId = 'phase-3';
    weekInPhase = Math.ceil((dayNumber - 28) / 7);
  } else if (dayNumber <= 56) {
    phaseNumber = 4;
    phaseId = 'phase-4';
    weekInPhase = Math.ceil((dayNumber - 42) / 7);
  } else {
    phaseNumber = 4;
    phaseId = 'phase-4';
    weekInPhase = 'post-curriculum';
  }

  return { dayNumber, phaseId, phaseNumber, weekInPhase };
}
