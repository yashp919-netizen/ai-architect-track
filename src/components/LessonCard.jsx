import ConceptPill from './ConceptPill';
import { CheckCircle, Circle, Clock, ChevronRight } from 'lucide-react';

export default function LessonCard({ lesson, completed, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-slate-900 border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800/60 ${
        completed ? 'border-green-500/20' : 'border-slate-700/50'
      }`}
    >
      {completed && (
        <div className="absolute top-3 right-3">
          <CheckCircle size={15} className="text-green-500" />
        </div>
      )}
      <div className="mb-2">
        <span className="text-xs font-medium text-slate-600">Lesson {lesson.number}</span>
      </div>
      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors leading-snug pr-5 mb-2">
        {lesson.title}
      </h3>
      <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
        <Clock size={10} />
        <span>{lesson.duration}</span>
      </div>
      {lesson.concepts?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lesson.concepts.slice(0, 4).map((c) => (
            <ConceptPill key={c}>{c}</ConceptPill>
          ))}
        </div>
      )}
    </div>
  );
}
