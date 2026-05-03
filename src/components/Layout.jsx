import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useProgress } from '../hooks/useProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCurrentDay } from '../utils/dayCalc';
import { CURRICULUM } from '../data/curriculum';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentStreak, getPhaseProgress } = useProgress();
  const [startDate] = useLocalStorage('startDate', new Date().toISOString().split('T')[0]);

  const { dayNumber } = getCurrentDay(startDate);
  const clampedDay = Math.min(Math.max(dayNumber, 1), 56);

  const progress = {};
  CURRICULUM.forEach((phase) => {
    progress[phase.id] = getPhaseProgress(phase.id);
  });

  return (
    <div className="min-h-screen bg-[#080c14]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Header
        streak={currentStreak}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-col md:w-60 md:shrink-0 sticky top-14 self-start h-[calc(100vh-56px)] overflow-y-auto">
          <Sidebar progress={progress} currentDay={clampedDay} />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-20 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
              className="absolute left-0 top-14 bottom-0 w-64 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                progress={progress}
                currentDay={clampedDay}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
