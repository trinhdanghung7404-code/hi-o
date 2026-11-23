// ListeningModule.jsx
// Dedicated Aptis Listening Module (~40 mins | 25 items)
// Enforces strict "Maximum 2 Plays" per audio track with transcript reveal post-submission

import React, { useState, useEffect } from "react";
import { 
  Volume2, 
  Square, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Timer, 
  ArrowLeft, 
  ArrowRight,
  Headphones
} from "lucide-react";
import { aptisListeningTask } from "../data/aptisListeningData";
import { speakText, stopSpeaking, playExamChime } from "../utils/audioSpeech";
import { ExamStartScreen } from "./ExamStartScreen";

export function ListeningModule({ onSaveScore }) {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("aptis_listening_answers");
    return saved ? JSON.parse(saved) : {};
  });

  // Track play count per audio key: max 2
  const [playCounts, setPlayCounts] = useState(() => {
    const saved = localStorage.getItem("aptis_listening_play_counts");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeAudioKey, setActiveAudioKey] = useState(null);
  const [activePart, setActivePart] = useState(1);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem("aptis_listening_submitted") === "true";
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("aptis_listening_time");
    return saved ? parseInt(saved, 10) : 40 * 60;
  });
  const [hasStarted, setHasStarted] = useState(submitted);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("aptis_listening_answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("aptis_listening_play_counts", JSON.stringify(playCounts));
  }, [playCounts]);

  useEffect(() => {
    localStorage.setItem("aptis_listening_submitted", submitted.toString());
  }, [submitted]);

  useEffect(() => {
    localStorage.setItem("aptis_listening_time", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

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

  const handlePlayAudio = (audioKey, script) => {
    const currentPlays = playCounts[audioKey] || 0;
    if (currentPlays >= 2 && !submitted) {
      alert("Maximum 2 plays reached for this recording according to Aptis exam rules.");
      return;
    }

    playExamChime();
    setActiveAudioKey(audioKey);

    // Increment play count
    const nextCount = currentPlays + 1;
    setPlayCounts((prev) => ({ ...prev, [audioKey]: nextCount }));

    setTimeout(() => {
      speakText(script, {
        onEnd: () => setActiveAudioKey(null)
      });
    }, 400);
  };

  const handleStopAudio = () => {
    stopSpeaking();
    setActiveAudioKey(null);
  };

  const handleSelectOption = (qId, optIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);
    stopSpeaking();

    // Calculate score
    let score = 0;
    // Part 1
    aptisListeningTask.parts[0].items.forEach((item) => {
      if (answers[item.id] === item.answer) score++;
    });
    // Part 2
    aptisListeningTask.parts[1].items.forEach((item) => {
      if (answers[item.id] === item.answer) score++;
    });
    // Part 3
    aptisListeningTask.parts[2].items.forEach((item) => {
      if (answers[item.id] === item.answer) score++;
    });
    // Part 4
    aptisListeningTask.parts[3].monologues.forEach((m) => {
      m.questions.forEach((q) => {
        if (answers[q.id] === q.answer) score++;
      });
    });

    if (onSaveScore) {
      onSaveScore({
        listeningScore: score,
        listeningBand: score >= 22 ? "C1 (Superior Listening)" : score >= 18 ? "B2" : "B1"
      });
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset all Listening test answers and audio play counters?")) return;
    setAnswers({});
    setPlayCounts({});
    setSubmitted(false);
    setShowTranscripts(false);
    setTimeLeft(40 * 60);
    setTimerRunning(true);
    stopSpeaking();
    localStorage.removeItem("aptis_listening_answers");
    localStorage.removeItem("aptis_listening_play_counts");
    localStorage.removeItem("aptis_listening_submitted");
    localStorage.removeItem("aptis_listening_time");
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Calculate answered count
  const answeredCount = Object.keys(answers).length;

  if (!hasStarted && !submitted) {
    return (
      <ExamStartScreen
        title="Aptis ESOL Listening Simulator"
        subtitle="Bài thi Nghe 4 phần chuẩn Aptis với giới hạn tối đa 2 lần phát âm thanh mỗi đoạn."
        durationLabel="~40 phút"
        questionCountLabel="4 Parts (25 câu hỏi)"
        hasProgress={answeredCount > 0}
        instructions={[
          "Mỗi đoạn audio chỉ được phép nghe tối đa 2 lần giống như thi thật.",
          "Part 1: Nghe thông tin chi tiết • Part 2: Quan điểm 4 người • Part 3: Đối thoại Man/Woman/Both • Part 4: Độc thoại dài.",
          "Transcript (lời thoại) sẽ được mở khóa sau khi bạn nộp bài."
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
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Listening: 25 Items (~40 Mins)</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Aptis C1
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Strict Max 2 Plays Enforced • Multi-speaker Dialogue • Academic Lectures
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 ml-auto">
          
          {/* Transcript reveal toggle post-submission */}
          {submitted && (
            <button
              onClick={() => setShowTranscripts(!showTranscripts)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center space-x-1"
            >
              {showTranscripts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showTranscripts ? "Hide Transcripts" : "Show Transcripts"}</span>
            </button>
          )}

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
              Finish & Grade ({answeredCount}/25)
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}

        </div>

      </div>

      {/* Part Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto space-x-1">
        {[
          { id: 1, label: "Part 1: Key Info (Q1-13)", count: "13 items" },
          { id: 2, label: "Part 2: Multi-Speaker (Q14-17)", count: "4 items" },
          { id: 3, label: "Part 3: Stance Stated (Q18-21)", count: "4 items" },
          { id: 4, label: "Part 4: Extended Lectures (Q22-25)", count: "4 items" }
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
        <div className="space-y-4">
          {aptisListeningTask.parts[0].items.map((item) => {
            const audioKey = `p1_q${item.id}`;
            const plays = playCounts[audioKey] || 0;
            const isPlaying = activeAudioKey === audioKey;
            const isLocked = plays >= 2 && !submitted;

            return (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      Item {item.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.context}
                    </span>
                  </div>

                  {/* Audio Play Counter & Button */}
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isLocked 
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400" 
                        : "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                    }`}>
                      {2 - Math.min(2, plays)} play(s) left
                    </span>

                    {isPlaying ? (
                      <button
                        onClick={handleStopAudio}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition flex items-center space-x-1"
                      >
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePlayAudio(audioKey, item.audioScript)}
                        disabled={isLocked}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition flex items-center space-x-1"
                      >
                        {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{plays === 0 ? "Play Audio (Track 1/2)" : plays === 1 ? "Replay Audio (2/2)" : "Audio Locked"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Question and Options */}
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {item.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = answers[item.id] === optIdx;
                    const isCorrect = item.answer === optIdx;

                    let btnStyle = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60";

                    if (submitted) {
                      if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
                      else if (isSelected) btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                    } else if (isSelected) {
                      btnStyle = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(item.id, optIdx)}
                        disabled={submitted}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* Transcript reveal */}
                {submitted && showTranscripts && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Transcript:</span>
                    <p className="italic text-slate-600 dark:text-slate-400">"{item.audioScript}"</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">💡 {item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PART 2 */}
      {activePart === 2 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Part 2: Multi-Speaker Perspective Matching (Q14 - Q17)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Listen to the four individuals discussing: <span className="font-semibold text-slate-700 dark:text-slate-200">{aptisListeningTask.parts[1].theme}</span>.
            </p>
          </div>

          {/* Speakers audio buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aptisListeningTask.parts[1].speakers.map((spk, idx) => {
              const audioKey = `p2_spk_${idx + 1}`;
              const plays = playCounts[audioKey] || 0;
              const isPlaying = activeAudioKey === audioKey;
              const isLocked = plays >= 2 && !submitted;

              return (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{spk.speakerId}</div>
                    <div className="text-[11px] text-slate-500">{2 - Math.min(2, plays)} play(s) left</div>
                  </div>
                  {isPlaying ? (
                    <button
                      onClick={handleStopAudio}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white"
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlayAudio(audioKey, spk.audioScript)}
                      disabled={isLocked}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Track</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Questions */}
          <div className="space-y-4 pt-3">
            {aptisListeningTask.parts[1].items.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
                <div className="font-semibold text-slate-900 dark:text-white">
                  <b>{item.id}.</b> {item.question}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = answers[item.id] === optIdx;
                    const isCorrect = item.answer === optIdx;

                    let btnStyle = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800";
                    if (submitted) {
                      if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                      else if (isSelected) btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                    } else if (isSelected) {
                      btnStyle = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-bold";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(item.id, optIdx)}
                        disabled={submitted}
                        className={`p-2.5 rounded-xl border text-xs text-center transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PART 3 */}
      {activePart === 3 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Part 3: Stance Stated — Dialogue Evaluation (Q18 - Q21)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Listen to the full conversation between Simon (Man) and Fiona (Woman). For each statement, choose: Man, Woman, or Both.
              </p>
            </div>

            {/* Audio Button */}
            {(() => {
              const audioKey = "p3_dialogue";
              const plays = playCounts[audioKey] || 0;
              const isPlaying = activeAudioKey === audioKey;
              const isLocked = plays >= 2 && !submitted;

              return (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-semibold">{2 - Math.min(2, plays)} play(s) left</span>
                  {isPlaying ? (
                    <button onClick={handleStopAudio} className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white">
                      Stop Dialogue
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlayAudio(audioKey, aptisListeningTask.parts[2].dialogueScript)}
                      disabled={isLocked}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center space-x-1.5"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{plays === 0 ? "Play Full Dialogue (1/2)" : plays === 1 ? "Replay Dialogue (2/2)" : "Audio Locked"}</span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          <div className="space-y-4">
            {aptisListeningTask.parts[2].items.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
                <div className="font-semibold text-slate-900 dark:text-white">
                  <b>{item.id}.</b> {item.question}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {item.options.map((opt, optIdx) => {
                    const isSelected = answers[item.id] === optIdx;
                    const isCorrect = item.answer === optIdx;

                    let btnStyle = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800";
                    if (submitted) {
                      if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                      else if (isSelected) btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                    } else if (isSelected) {
                      btnStyle = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-bold";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(item.id, optIdx)}
                        disabled={submitted}
                        className={`p-2.5 rounded-xl border text-xs text-center transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {submitted && showTranscripts && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                    💡 {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PART 4 */}
      {activePart === 4 && (
        <div className="space-y-5">
          {aptisListeningTask.parts[3].monologues.map((mono, idx) => {
            const audioKey = `p4_mono_${idx + 1}`;
            const plays = playCounts[audioKey] || 0;
            const isPlaying = activeAudioKey === audioKey;
            const isLocked = plays >= 2 && !submitted;

            return (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {mono.monologueId}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {mono.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{mono.speaker}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-semibold">{2 - Math.min(2, plays)} play(s) left</span>
                    {isPlaying ? (
                      <button onClick={handleStopAudio} className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white">
                        Stop
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePlayAudio(audioKey, mono.audioScript)}
                        disabled={isLocked}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center space-x-1.5"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{plays === 0 ? "Play Monologue (1/2)" : plays === 1 ? "Replay Monologue (2/2)" : "Audio Locked"}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {mono.questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        <b>{q.id}.</b> {q.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = answers[q.id] === optIdx;
                          const isCorrect = q.answer === optIdx;

                          let btnStyle = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800";
                          if (submitted) {
                            if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                            else if (isSelected) btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                          } else if (isSelected) {
                            btnStyle = "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-bold";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              disabled={submitted}
                              className={`p-3 rounded-xl border text-xs text-left transition ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {submitted && showTranscripts && (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
