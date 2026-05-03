import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CURRICULUM } from '../data/curriculum';
import { useProgress } from '../hooks/useProgress';
import ConceptPill from '../components/ConceptPill';
import CodeEditor from '../components/CodeEditor';
import PythonRunner from '../components/PythonRunner';
import { CheckCircle, Circle, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

export default function Lesson() {
  const { phaseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completedLessons, markComplete, markIncomplete } = useProgress();
  const [exerciseCode, setExerciseCode] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const phase = CURRICULUM.find((p) => p.id === phaseId);
  const lesson = phase?.lessons.find((l) => l.id === lessonId);

  const lessonIndex = phase?.lessons.indexOf(lesson) ?? -1;
  const prevLesson = phase?.lessons[lessonIndex - 1];
  const nextLesson = phase?.lessons[lessonIndex + 1];

  // J/K keyboard navigation — only when not focused in a textarea/input
  useEffect(() => {
    function onKey(e) {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key === 'j' || e.key === 'ArrowRight') {
        if (nextLesson) navigate(`/phase/${phase.id}/lesson/${nextLesson.id}`);
      }
      if (e.key === 'k' || e.key === 'ArrowLeft') {
        if (prevLesson) navigate(`/phase/${phase.id}/lesson/${prevLesson.id}`);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase?.id, nextLesson?.id, prevLesson?.id]);

  if (!phase || !lesson) {
    return <div className="text-slate-500 text-sm p-8">Lesson not found.</div>;
  }

  const completed = completedLessons.has(lesson.id);

  const currentCode = exerciseCode !== null ? exerciseCode : (lesson.exerciseCode || '');

  function toggleComplete() {
    if (completed) markIncomplete(lesson.id);
    else markComplete(lesson.id);
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to={`/phase/${phase.id}`}
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-400 mb-5 transition-colors"
      >
        <ChevronLeft size={14} /> Back to {phase.title}
      </Link>

      <div className="mb-4">
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Lesson {lesson.number}
        </span>
        <h1 className="text-xl font-black text-slate-100 mt-1">{lesson.title}</h1>
        <p className="text-xs text-slate-600 mt-0.5">{lesson.instructor} · {lesson.duration}</p>
      </div>

      {/* YouTube embed */}
      <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/50" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={lesson.videoUrl}
          title={lesson.videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Concepts */}
      {lesson.concepts?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          <span className="text-xs text-slate-600 self-center">Concepts:</span>
          {lesson.concepts.map((c) => (
            <ConceptPill key={c}>{c}</ConceptPill>
          ))}
        </div>
      )}

      {/* Lesson content */}
      <div className="prose prose-sm prose-invert max-w-none mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
      </div>

      {/* Inline exercise */}
      {lesson.exerciseCode && (
        <div className="mb-8 border border-slate-700/50 rounded-xl overflow-hidden bg-slate-900">
          <div className="bg-slate-800/60 border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">Try it yourself</h2>
            {lesson.exerciseSolution && (
              <button
                onClick={() => setShowSolution((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors"
              >
                {showSolution ? <EyeOff size={12} /> : <Eye size={12} />}
                {showSolution ? 'Hide solution' : 'Show solution'}
              </button>
            )}
          </div>
          <div className="p-4 flex flex-col gap-3">
            {showSolution && lesson.exerciseSolution ? (
              <>
                <p className="text-xs text-slate-600 mb-1">Solution:</p>
                <CodeEditor
                  initialCode={lesson.exerciseSolution}
                  onChange={() => {}}
                  height="240px"
                />
              </>
            ) : (
              <CodeEditor
                key={lessonId}
                initialCode={currentCode}
                onChange={setExerciseCode}
                height="240px"
              />
            )}
            <PythonRunner
              code={showSolution && lesson.exerciseSolution ? lesson.exerciseSolution : currentCode}
              onReset={() => { setExerciseCode(null); setShowSolution(false); }}
            />
          </div>
        </div>
      )}

      {/* Mark complete */}
      <div className="flex items-center justify-between py-4 border-t border-slate-100 mb-6">
        <button
          onClick={toggleComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${
            completed
              ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
              : 'bg-slate-800 text-slate-300 border-slate-700/50 hover:border-blue-500/30 hover:text-blue-400'
          }`}
        >
          {completed ? <CheckCircle size={15} /> : <Circle size={15} />}
          {completed ? 'Completed' : 'Mark complete'}
        </button>
      </div>

      {/* Prev / Next navigation */}
      <div className="flex justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => navigate(`/phase/${phase.id}/lesson/${prevLesson.id}`)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-400 transition-colors"
          >
            <ChevronLeft size={14} /> {prevLesson.title}
          </button>
        ) : <div />}
        {nextLesson && (
          <button
            onClick={() => navigate(`/phase/${phase.id}/lesson/${nextLesson.id}`)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-400 transition-colors ml-auto"
          >
            {nextLesson.title} <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
