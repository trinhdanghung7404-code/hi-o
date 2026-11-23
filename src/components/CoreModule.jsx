// CoreModule.jsx
// Aptis ESOL Core Component: Grammar & Vocabulary (25 mins | 50 items)

import React, { useState, useEffect } from "react";
import { 
  Timer, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  RotateCcw,
  BookOpen,
  Sparkles
} from "lucide-react";
import { allAptisCoreQuestions } from "../data/aptisCoreData";
import { ExamStartScreen } from "./ExamStartScreen";

export function CoreModule({ onSaveScore }) {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("aptis_core_answers");
    return saved ? JSON.parse(saved) : {};
  });

  const [flagged, setFlagged] = useState(() => {
    const saved = localStorage.getItem("aptis_core_flags");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterMode, setFilterMode] = useState("all"); // "all" | "flagged" | "unanswered"
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem("aptis_core_submitted") === "true";
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("aptis_core_time");
    return saved ? parseInt(saved, 10) : 25 * 60;
  });
  const [hasStarted, setHasStarted] = useState(submitted);
  const [timerRunning, setTimerRunning] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("aptis_core_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("aptis_core_flags", JSON.stringify(flagged));
  }, [flagged]);

  useEffect(() => {
    localStorage.setItem("aptis_core_time", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("aptis_core_submitted", submitted.toString());
  }, [submitted]);

  // Timer loop
  useEffect(() => {
    if (!timerRunning || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, submitted]);

  const currentQ = allAptisCoreQuestions[currentIndex];

  const handleSelectOption = (optIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const toggleFlag = (id) => {
    setFlagged((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);

    // Calculate scores
    let grammarCorrect = 0;
    let vocabCorrect = 0;

    allAptisCoreQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        if (q.category === "Grammar") grammarCorrect++;
        else vocabCorrect++;
      }
    });

    const total = grammarCorrect + vocabCorrect;
    if (onSaveScore) {
      onSaveScore({
        totalScore: total,
        grammarScore: grammarCorrect,
        vocabScore: vocabCorrect,
        cefrBand: total >= 45 ? "C1" : total >= 38 ? "B2" : "B1"
      });
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset your Grammar & Vocabulary test session?")) {
      setAnswers({});
      setFlagged([]);
      setTimeLeft(25 * 60);
      setSubmitted(false);
      setTimerRunning(true);
      setCurrentIndex(0);
      localStorage.removeItem("aptis_core_answers");
      localStorage.removeItem("aptis_core_flags");
      localStorage.removeItem("aptis_core_submitted");
      localStorage.removeItem("aptis_core_time");
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Filtered question list for palette
  const answeredCount = Object.keys(answers).length;
  const isCurrentFlagged = flagged.includes(currentQ.id);

  // Score stats for submitted state
  const totalCorrect = allAptisCoreQuestions.filter(
    (q) => answers[q.id] === q.answer
  ).length;

  if (!hasStarted && !submitted) {
    return (
      <ExamStartScreen
        title="Aptis ESOL Core: Grammar & Vocabulary"
        subtitle="Kiểm tra nền tảng ngữ pháp và từ vựng học thuật (Mục tiêu C1: 45+/50 câu)."
        durationLabel="25 phút"
        questionCountLabel="25 Grammar + 25 Vocabulary (50 câu)"
        hasProgress={answeredCount > 0}
        instructions={[
          "Gồm 25 câu trắc nghiệm ngữ pháp C1 (Inversion, Mixed Conditionals, Cleft Sentences...) và 25 câu từ vựng đồng nghĩa/collocations.",
          "Bạn có thể gắn cờ (Flag) các câu chưa chắc chắn để quay lại kiểm tra sau.",
          "Kết quả được lưu tự động và chấm điểm chi tiết kèm giải thích ngữ pháp."
        ]}
        onStart={() => {
          setHasStarted(true);
          setTimerRunning(true);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Controller Bar: Timer, Progress & Submission */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Module Title & Category */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            50Q
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Core: Grammar & Vocabulary</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Aptis C1
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              25 Grammar MCQs + 25 Vocabulary Items • Target: 45+/50 (C1 Standard)
            </p>
          </div>
        </div>

        {/* Timer & Buttons */}
        <div className="flex items-center space-x-3 ml-auto">
          
          {/* Countdown Timer */}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            timeLeft < 300 
              ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 animate-pulse" 
              : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          }`}>
            <Timer className="w-4 h-4 text-indigo-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
            >
              Finish & Grade Exam
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Test</span>
            </button>
          )}

        </div>
      </div>

      {/* Submitted Result Overview Banner */}
      {submitted && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-transparent border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-emerald-500/20">
              {totalCorrect}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                Final Exam Result: {totalCorrect} / 50 ({Math.round((totalCorrect / 50) * 100)}%)
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                CEFR Band Assessment:{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {totalCorrect >= 45 ? "C1 Level (Distinction)" : totalCorrect >= 38 ? "B2 Upper Intermediate" : "B1 Independent"}
                </span>
                {" "}• Comprehensive grammatical rationales now revealed below.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Split: Left Question Stage & Right Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Question Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-5">
            
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Question {currentQ.id} of 50
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {currentQ.category} • {currentQ.topic}
                </span>
              </div>

              {/* Flag Toggle Button */}
              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isCurrentFlagged
                    ? "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentFlagged ? "fill-amber-500 text-amber-500" : ""}`} />
                <span>{isCurrentFlagged ? "Flagged" : "Flag"}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed py-2">
              {currentQ.question}
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                const isCorrect = currentQ.answer === idx;

                let optionStyle = "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60";

                if (submitted) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                  }
                } else if (isSelected) {
                  optionStyle = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={submitted}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between text-sm ${optionStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected 
                          ? "bg-indigo-600 text-white" 
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {submitted && (
                      <div>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & C1 Grammar Rationale (shown post-submission or on demand) */}
            {submitted && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Examiner C1 Grammatical Rationale</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">
                {answeredCount} of 50 Answered
              </span>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(allAptisCoreQuestions.length - 1, prev + 1))}
                disabled={currentIndex === allAptisCoreQuestions.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 transition flex items-center space-x-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Right: Question Navigation Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Question Palette
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {answeredCount}/50 Done
              </span>
            </div>

            {/* Palette Filter Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterMode("all")}
                className={`flex-1 py-1 rounded-lg transition ${
                  filterMode === "all" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs" : "text-slate-500"
                }`}
              >
                All (50)
              </button>
              <button
                onClick={() => setFilterMode("flagged")}
                className={`flex-1 py-1 rounded-lg transition ${
                  filterMode === "flagged" ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs" : "text-slate-500"
                }`}
              >
                Flagged ({flagged.length})
              </button>
              <button
                onClick={() => setFilterMode("unanswered")}
                className={`flex-1 py-1 rounded-lg transition ${
                  filterMode === "unanswered" ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs" : "text-slate-500"
                }`}
              >
                Unanswered ({50 - answeredCount})
              </button>
            </div>

            {/* 50 Question Buttons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
              {allAptisCoreQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged.includes(q.id);
                const isCurrent = currentIndex === idx;

                if (filterMode === "flagged" && !isFlagged) return null;
                if (filterMode === "unanswered" && isAnswered) return null;

                let btnStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700";

                if (submitted) {
                  if (answers[q.id] === q.answer) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600";
                  } else {
                    btnStyle = "bg-rose-500 text-white border-rose-600";
                  }
                } else if (isAnswered) {
                  btnStyle = "bg-indigo-600 text-white border-indigo-700 font-bold";
                }

                if (isCurrent) {
                  btnStyle += " ring-2 ring-indigo-400 dark:ring-indigo-300";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-9 rounded-xl border text-xs font-semibold transition flex items-center justify-center ${btnStyle}`}
                  >
                    <span>{q.id}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Flagged for Review</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
