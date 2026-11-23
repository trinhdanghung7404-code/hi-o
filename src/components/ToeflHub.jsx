// ToeflHub.jsx
// TOEFL ITP Mock Test Simulator - Section 2: Structure & Written Expression (40 items | 25 mins)

import React, { useState, useEffect } from "react";
import { 
  Timer, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Award,
  Sparkles
} from "lucide-react";
import { toeflSection2Data } from "../data/toeflData";
import { ExamStartScreen } from "./ExamStartScreen";

export function ToeflHub({ onSaveScore }) {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("toefl_itp_answers");
    return saved ? JSON.parse(saved) : {};
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem("toefl_itp_submitted") === "true";
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("toefl_itp_time");
    return saved ? parseInt(saved, 10) : 25 * 60;
  });
  const [hasStarted, setHasStarted] = useState(submitted);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("toefl_itp_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("toefl_itp_submitted", submitted.toString());
  }, [submitted]);

  useEffect(() => {
    localStorage.setItem("toefl_itp_time", timeLeft.toString());
  }, [timeLeft]);

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

  const currentQ = toeflSection2Data.questions[currentIndex];

  const handleSelectOption = (idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);

    let rawScore = 0;
    toeflSection2Data.questions.forEach((q) => {
      if (answers[q.id] === q.answer) rawScore++;
    });

    // Approximate ETS Scaled Score for Section 2 (31 to 68)
    const scaledScore = Math.min(68, Math.round(31 + (rawScore / 40) * 37));

    if (onSaveScore) {
      onSaveScore({
        toeflRawScore: rawScore,
        toeflScaledScore: scaledScore
      });
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset your TOEFL ITP session?")) return;
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(25 * 60);
    setTimerRunning(true);
    setCurrentIndex(0);
    localStorage.removeItem("toefl_itp_answers");
    localStorage.removeItem("toefl_itp_submitted");
    localStorage.removeItem("toefl_itp_time");
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(answers).length;
  const rawScore = toeflSection2Data.questions.filter((q) => answers[q.id] === q.answer).length;
  const scaledScore = Math.min(68, Math.round(31 + (rawScore / 40) * 37));

  // Render question text with stylized brackets if written expression
  const renderQuestionText = (text) => {
    const parts = text.split(/(\[[^\]]+\]\([A-D]\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[([^\]]+)\]\(([A-D])\)/);
      if (match) {
        return (
          <span key={i} className="inline-flex items-baseline mx-1">
            <span className="underline decoration-indigo-500 underline-offset-4 font-bold text-indigo-700 dark:text-indigo-300">
              {match[1]}
            </span>
            <span className="text-[10px] font-extrabold text-slate-500 ml-0.5">({match[2]})</span>
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!hasStarted && !submitted) {
    return (
      <ExamStartScreen
        title="TOEFL ITP: Section 2 Simulator"
        subtitle="Bài thi Structure & Written Expression theo chuẩn quy đổi điểm ETS (31–68 điểm)."
        durationLabel="25 phút"
        questionCountLabel="40 câu (15 Structure + 25 Written Expression)"
        hasProgress={answeredCount > 0}
        instructions={[
          "15 câu đầu (Structure): Chọn cụm từ đúng ngữ pháp để hoàn thành câu.",
          "25 câu sau (Written Expression): Tìm lỗi sai trong 4 phần được gạch chân (A, B, C, D).",
          "Đồng hồ chỉ bắt đầu chạy khi bạn bấm nút Bắt đầu bên dưới."
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
      
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            ITP
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>TOEFL ITP: Section 2 Simulator</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                40 Items • 25 Mins
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Part A: Structure (1-15) • Part B: Written Expression (16-40) • Target 600+ Scale
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Countdown Timer */}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            timeLeft < 300 
              ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 animate-pulse" 
              : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          }`}>
            <Timer className="w-4 h-4 text-emerald-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
            >
              Finish & Grade ({answeredCount}/40)
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Test</span>
            </button>
          )}
        </div>

      </div>

      {/* Submitted Score Banner */}
      {submitted && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-transparent border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-emerald-600/20">
              {rawScore}
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                Raw Score: {rawScore} / 40 • Scaled ETS Score: {scaledScore} / 68
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Overall TOEFL ITP Projection:{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {scaledScore >= 60 ? "Level 1: 600+ Candidate (Proficient)" : "Level 2: 500-580 Range"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Question Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Question {currentQ.id} of 40
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentQ.type === "structure" ? "Part A: Sentence Structure" : "Part B: Written Expression (Error Identification)"}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed py-2">
              {renderQuestionText(currentQ.text)}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === idx;
                const isCorrect = currentQ.answer === idx;

                let optStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60";

                if (submitted) {
                  if (isCorrect) optStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                  else if (isSelected) optStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                } else if (isSelected) {
                  optStyle = "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={submitted}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between text-xs sm:text-sm ${optStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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

            {/* Explanation */}
            {submitted && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-1">
                {currentQ.correction && (
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Correction: {currentQ.correction}
                  </div>
                )}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  💡 {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">
                {answeredCount} of 40 Completed
              </span>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(toeflSection2Data.questions.length - 1, prev + 1))}
                disabled={currentIndex === toeflSection2Data.questions.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 transition flex items-center space-x-1"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              TOEFL ITP Question Grid (40)
            </h3>

            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
              {toeflSection2Data.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentIndex === idx;

                let btnStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
                if (submitted) {
                  if (answers[q.id] === q.answer) btnStyle = "bg-emerald-500 text-white";
                  else btnStyle = "bg-rose-500 text-white";
                } else if (isAnswered) {
                  btnStyle = "bg-emerald-600 text-white font-bold";
                }

                if (isCurrent) btnStyle += " ring-2 ring-emerald-400";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-semibold transition flex items-center justify-center ${btnStyle}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
