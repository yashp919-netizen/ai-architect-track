import ConceptPill from './ConceptPill';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export default function LessonCard({ lesson, completed, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-400">Lesson {lesson.number}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
            <Clock size={11} />
            <span>{lesson.duration}</span>
          </div>
          {lesson.concepts?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {lesson.concepts.map((c) => (
                <ConceptPill key={c}>{c}</ConceptPill>
              ))}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {completed ? (
            <CheckCircle size={18} className="text-green-500" />
          ) : (
            <Circle size={18} className="text-slate-300" />
          )}
        </div>
      </div>
    </div>
  );
}
