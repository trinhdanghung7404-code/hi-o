// ReadingModule.jsx
// Dedicated Aptis Reading Module (35 mins | 4 Parts)
// Featuring Sentence Dropdowns, Re-order Cohesion Challenge, 4-Person Matching, and Long Heading Matching

import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Timer, 
  Send,
  Sparkles,
  Layers
} from "lucide-react";
import { aptisReadingTask } from "../data/aptisReadingData";
import { ExamStartScreen } from "./ExamStartScreen";

export function ReadingModule({ onSaveScore }) {
  const [activePart, setActivePart] = useState(1);

  // Part 1 answers
  const [part1Answers, setPart1Answers] = useState(() => {
    const saved = localStorage.getItem("aptis_reading_p1");
    return saved ? JSON.parse(saved) : {};
  });

  // Part 2 re-ordered sentences list
  const [part2Order, setPart2Order] = useState(() => {
    const saved = localStorage.getItem("aptis_reading_p2");
    if (saved) return JSON.parse(saved);
    // Shuffle the order initially
    return [...aptisReadingTask.parts[1].sentencesToOrder].sort(() => 0.5 - Math.random());
  });

  // Part 3 answers
  const [part3Answers, setPart3Answers] = useState(() => {
    const saved = localStorage.getItem("aptis_reading_p3");
    return saved ? JSON.parse(saved) : {};
  });

  // Part 4 answers (heading IDs)
  const [part4Answers, setPart4Answers] = useState(() => {
    const saved = localStorage.getItem("aptis_reading_p4");
    return saved ? JSON.parse(saved) : {};
  });

  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem("aptis_reading_submitted") === "true";
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("aptis_reading_time");
    return saved ? parseInt(saved, 10) : 35 * 60;
  });
  const [hasStarted, setHasStarted] = useState(submitted);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("aptis_reading_p1", JSON.stringify(part1Answers));
  }, [part1Answers]);

  useEffect(() => {
    localStorage.setItem("aptis_reading_p2", JSON.stringify(part2Order));
  }, [part2Order]);

  useEffect(() => {
    localStorage.setItem("aptis_reading_p3", JSON.stringify(part3Answers));
  }, [part3Answers]);

  useEffect(() => {
    localStorage.setItem("aptis_reading_p4", JSON.stringify(part4Answers));
  }, [part4Answers]);

  useEffect(() => {
    localStorage.setItem("aptis_reading_submitted", submitted.toString());
  }, [submitted]);

  useEffect(() => {
    localStorage.setItem("aptis_reading_time", timeLeft.toString());
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

  // Move sentence up/down for Part 2 re-ordering
  const moveSentence = (index, direction) => {
    if (submitted) return;
    const newOrder = [...part2Order];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setPart2Order(newOrder);
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);

    // Compute score
    let score = 0;
    // Part 1: 5 items
    aptisReadingTask.parts[0].sentences.forEach((s) => {
      if (part1Answers[s.id] === s.answer) score++;
    });

    // Part 2: 5 items (position 2 through 6)
    part2Order.forEach((item, idx) => {
      if (item.correctPosition === idx + 2) score++;
    });

    // Part 3: 7 items
    aptisReadingTask.parts[2].statements.forEach((st) => {
      if (part3Answers[st.id] === st.person) score++;
    });

    // Part 4: 7 items
    aptisReadingTask.parts[3].paragraphs.forEach((p) => {
      if (part4Answers[p.id] === p.correctHeadingId) score++;
    });

    // Total 24 items
    if (onSaveScore) {
      onSaveScore({
        readingScore: score,
        readingBand: score >= 21 ? "C1 (Superior Comprehension)" : score >= 17 ? "B2" : "B1"
      });
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset all Reading responses and timers?")) return;
    setPart1Answers({});
    setPart2Order([...aptisReadingTask.parts[1].sentencesToOrder].sort(() => 0.5 - Math.random()));
    setPart3Answers({});
    setPart4Answers({});
    setSubmitted(false);
    setTimeLeft(35 * 60);
    setTimerRunning(true);
    localStorage.removeItem("aptis_reading_p1");
    localStorage.removeItem("aptis_reading_p2");
    localStorage.removeItem("aptis_reading_p3");
    localStorage.removeItem("aptis_reading_p4");
    localStorage.removeItem("aptis_reading_submitted");
    localStorage.removeItem("aptis_reading_time");
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!hasStarted && !submitted) {
    const hasSomeProgress =
      Object.keys(part1Answers).length > 0 ||
      Object.keys(part3Answers).length > 0 ||
      Object.keys(part4Answers).length > 0;

    return (
      <ExamStartScreen
        title="Aptis ESOL Reading Simulator"
        subtitle="Đề thi Đọc hiểu 4 phần chuẩn C1 gồm điền từ, sắp xếp đoạn văn, đối chiếu quan điểm và chọn tiêu đề."
        durationLabel="35 phút"
        questionCountLabel="4 Parts (Cohesion, Opinions & Headings)"
        hasProgress={hasSomeProgress}
        instructions={[
          "Part 1: Điền từ vào chỗ trống • Part 2: Sắp xếp thứ tự câu logic (6 câu).",
          "Part 3: Đối chiếu quan điểm 4 nhân vật • Part 4: Nối tiêu đề đoạn văn (Long Text).",
          "Kết quả được chấm tự động và hiển thị giải thích chi tiết sau khi nộp bài."
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
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Reading: 4-Part Full Simulator</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                35 Mins
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sentence Completion • Cohesion Reordering • 4-Person Matching • Long Academic Headings
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
            <Timer className="w-4 h-4 text-indigo-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmitExam}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
            >
              Finish & Grade Reading
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

      {/* Part Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto space-x-1">
        {[
          { id: 1, label: "Part 1: Sentence Dropdowns", count: "5 items" },
          { id: 2, label: "Part 2: Sentence Reordering", count: "Cohesion (6 sentences)" },
          { id: 3, label: "Part 3: 4-Person Matching", count: "7 statements" },
          { id: 4, label: "Part 4: Long Heading Match", count: "7 paragraphs" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePart(tab.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
              activePart === tab.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] font-normal ${activePart === tab.id ? "text-indigo-200" : "text-slate-400"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* PART 1 */}
      {activePart === 1 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Part 1: Sentence Completion Dropdowns
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {aptisReadingTask.parts[0].textTitle}
            </p>
          </div>

          <div className="space-y-4">
            {aptisReadingTask.parts[0].sentences.map((s, idx) => {
              const currentVal = part1Answers[s.id] !== undefined ? part1Answers[s.id] : "";
              const isCorrect = part1Answers[s.id] === s.answer;

              return (
                <div key={s.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs sm:text-sm leading-relaxed">
                  <span className="font-bold text-indigo-600 mr-2">{idx + 1}.</span>
                  <span>{s.before}</span>
                  <select
                    value={currentVal}
                    disabled={submitted}
                    onChange={(e) => setPart1Answers({ ...part1Answers, [s.id]: parseInt(e.target.value, 10) })}
                    className={`mx-2 px-3 py-1.5 rounded-lg border font-semibold text-xs sm:text-sm ${
                      submitted
                        ? isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    }`}
                  >
                    <option value="">-- Choose option --</option>
                    {s.options.map((opt, oIdx) => (
                      <option key={oIdx} value={oIdx}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span>{s.after}</span>

                  {submitted && (
                    <div className="mt-2 text-xs flex items-center space-x-2">
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Correct: {s.options[s.answer]}</span>
                        </span>
                      )}
                      <span className="text-slate-500 italic">• {s.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PART 2 */}
      {activePart === 2 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Part 2: Sentence Cohesion & Logical Reordering
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Use the Up / Down arrows to reorder sentences 2 through 6 until a seamless chronological narrative is formed.
            </p>
          </div>

          {/* Fixed First Sentence */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs sm:text-sm font-medium flex items-start space-x-3">
            <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-bold text-xs shrink-0">
              1 (Fixed)
            </span>
            <p className="text-indigo-950 dark:text-indigo-200 leading-relaxed">
              {aptisReadingTask.parts[1].initialFixedSentence}
            </p>
          </div>

          {/* Re-orderable list */}
          <div className="space-y-3">
            {part2Order.map((item, idx) => {
              const currentPosition = idx + 2;
              const isCorrectPosition = item.correctPosition === currentPosition;

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 text-xs sm:text-sm ${
                    submitted
                      ? isCorrectPosition
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20"
                        : "border-rose-500 bg-rose-50/60 dark:bg-rose-950/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs shrink-0">
                      Position {currentPosition}
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                  {/* Move Up/Down Controls */}
                  {!submitted ? (
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => moveSentence(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition"
                      >
                        <ArrowUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                      <button
                        onClick={() => moveSentence(idx, 1)}
                        disabled={idx === part2Order.length - 1}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition"
                      >
                        <ArrowDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </button>
                    </div>
                  ) : (
                    <div className="shrink-0 text-xs font-bold">
                      {isCorrectPosition ? (
                        <span className="text-emerald-600 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center space-x-1">
                          <XCircle className="w-4 h-4" />
                          <span>Should be #{item.correctPosition}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Cohesion Chain Rationale:</span>
              <p>{aptisReadingTask.parts[1].explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* PART 3 */}
      {activePart === 3 && (
        <div className="space-y-6">
          {/* 4 People Text Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aptisReadingTask.parts[2].people.map((person) => (
              <div key={person.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {person.id}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{person.name}</h4>
                    <p className="text-[10px] text-slate-500">{person.title}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{person.extract}"
                </p>
              </div>
            ))}
          </div>

          {/* Statement Matching Grid */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Match the Statements to Persons A, B, C, or D:
            </h4>

            <div className="space-y-3">
              {aptisReadingTask.parts[2].statements.map((st, idx) => {
                const currentPick = part3Answers[st.id] || "";
                const isCorrect = currentPick === st.person;

                return (
                  <div key={st.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex-1 min-w-[240px]">
                      <b>{idx + 1}.</b> {st.statement}
                    </div>

                    <div className="flex items-center space-x-2">
                      {["A", "B", "C", "D"].map((letter) => {
                        const isSelected = currentPick === letter;
                        let btnClass = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300";

                        if (submitted) {
                          if (letter === st.person) btnClass = "border-emerald-500 bg-emerald-500 text-white font-bold";
                          else if (isSelected) btnClass = "border-rose-500 bg-rose-500 text-white font-bold";
                        } else if (isSelected) {
                          btnClass = "border-indigo-600 bg-indigo-600 text-white font-bold";
                        }

                        return (
                          <button
                            key={letter}
                            disabled={submitted}
                            onClick={() => setPart3Answers({ ...part3Answers, [st.id]: letter })}
                            className={`w-8 h-8 rounded-lg border text-xs font-bold transition flex items-center justify-center ${btnClass}`}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PART 4 */}
      {activePart === 4 && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Part 4: Long Academic Passage — Heading Matching
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Title: <span className="font-semibold text-slate-800 dark:text-slate-200">{aptisReadingTask.parts[3].title}</span>
              </p>
            </div>

            {/* List of 9 Headings Reference */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Headings Bank:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {aptisReadingTask.parts[3].headings.map((h) => (
                  <div key={h.id} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-indigo-600 mr-1.5">{h.id}:</span>
                    <span>{h.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7 Paragraphs with dropdown matching */}
            <div className="space-y-5 pt-2">
              {aptisReadingTask.parts[3].paragraphs.map((p) => {
                const currentHeading = part4Answers[p.id] || "";
                const isCorrect = currentHeading === p.correctHeadingId;

                return (
                  <div key={p.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                      <span className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {p.letter}
                      </span>

                      {/* Dropdown selector */}
                      <select
                        value={currentHeading}
                        disabled={submitted}
                        onChange={(e) => setPart4Answers({ ...part4Answers, [p.id]: e.target.value })}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                          submitted
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                              : "border-rose-500 bg-rose-50 text-rose-900"
                            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        }`}
                      >
                        <option value="">-- Select Heading for {p.letter} --</option>
                        {aptisReadingTask.parts[3].headings.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.text}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                      {p.text}
                    </p>

                    {submitted && (
                      <div className="text-xs pt-1 flex items-center space-x-2">
                        {isCorrect ? (
                          <span className="text-emerald-600 font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct Heading</span>
                          </span>
                        ) : (
                          <span className="text-rose-600 font-bold flex items-center space-x-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Correct Heading: {p.correctHeadingId}</span>
                          </span>
                        )}
                        <span className="text-slate-500 italic">• {p.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
