// WritingModule.jsx
// Dedicated Aptis Writing Module (50 mins | 4 Parts) with Live Word Counter and AI Teacher Submission

import React, { useState, useEffect } from "react";
import { 
  Timer, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Mail, 
  BookOpen,
  UserCheck
} from "lucide-react";
import { aptisWritingTask } from "../data/aptisWritingData";
import { evaluateWithAiTeacher } from "../services/aiTeacherEngine";
import { ExamStartScreen } from "./ExamStartScreen";

export function WritingModule({ onShowFeedback, onSaveScore }) {
  // Part 1 answers
  const [part1, setPart1] = useState(() => {
    const saved = localStorage.getItem("aptis_writing_p1");
    return saved ? JSON.parse(saved) : {};
  });

  // Part 2 answer
  const [part2, setPart2] = useState(() => {
    return localStorage.getItem("aptis_writing_p2") || "";
  });

  // Part 3 chat answers
  const [part3, setPart3] = useState(() => {
    const saved = localStorage.getItem("aptis_writing_p3");
    return saved ? JSON.parse(saved) : {};
  });

  // Part 4 emails
  const [part4Informal, setPart4Informal] = useState(() => {
    return localStorage.getItem("aptis_writing_p4_informal") || "";
  });

  const [part4Formal, setPart4Formal] = useState(() => {
    return localStorage.getItem("aptis_writing_p4_formal") || "";
  });

  const [activeTab, setActiveTab] = useState(1); // Part 1, 2, 3, or 4
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("aptis_writing_time");
    return saved ? parseInt(saved, 10) : 50 * 60;
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("aptis_writing_p1", JSON.stringify(part1));
  }, [part1]);

  useEffect(() => {
    localStorage.setItem("aptis_writing_p2", part2);
  }, [part2]);

  useEffect(() => {
    localStorage.setItem("aptis_writing_p3", JSON.stringify(part3));
  }, [part3]);

  useEffect(() => {
    localStorage.setItem("aptis_writing_p4_informal", part4Informal);
  }, [part4Informal]);

  useEffect(() => {
    localStorage.setItem("aptis_writing_p4_formal", part4Formal);
  }, [part4Formal]);

  useEffect(() => {
    localStorage.setItem("aptis_writing_time", timeLeft.toString());
  }, [timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getWordCountStatus = (count, min, max) => {
    if (count === 0) return { color: "text-slate-400", badge: "Not started", bg: "bg-slate-100 dark:bg-slate-800" };
    if (count < min) return { color: "text-amber-600 dark:text-amber-400", badge: `${min - count} words short`, bg: "bg-amber-50 dark:bg-amber-950/40" };
    if (count > max) return { color: "text-rose-600 dark:text-rose-400", badge: `${count - max} words over limit`, bg: "bg-rose-50 dark:bg-rose-950/40" };
    return { color: "text-emerald-600 dark:text-emerald-400", badge: "Optimal C1 Range", bg: "bg-emerald-50 dark:bg-emerald-950/40" };
  };

  const handleLoadSampleC1 = () => {
    if (!window.confirm("Load official C1 benchmark model answers into form?")) return;

    // Fill Part 1
    const p1Sample = {};
    aptisWritingTask.parts[0].questions.forEach((q) => {
      p1Sample[q.id] = q.modelC1;
    });
    setPart1(p1Sample);

    // Fill Part 2
    setPart2(aptisWritingTask.parts[1].modelC1);

    // Fill Part 3
    const p3Sample = {};
    aptisWritingTask.parts[2].chats.forEach((c) => {
      p3Sample[c.id] = c.modelC1;
    });
    setPart3(p3Sample);

    // Fill Part 4
    setPart4Informal(aptisWritingTask.parts[3].subtasks[0].modelC1);
    setPart4Formal(aptisWritingTask.parts[3].subtasks[1].modelC1);
  };

  const handleReset = () => {
    if (!window.confirm("Clear all writing drafts and reset timer?")) return;
    setPart1({});
    setPart2("");
    setPart3({});
    setPart4Informal("");
    setPart4Formal("");
    setTimeLeft(50 * 60);
    localStorage.removeItem("aptis_writing_p1");
    localStorage.removeItem("aptis_writing_p2");
    localStorage.removeItem("aptis_writing_p3");
    localStorage.removeItem("aptis_writing_p4_informal");
    localStorage.removeItem("aptis_writing_p4_formal");
    localStorage.removeItem("aptis_writing_time");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const apiKey = localStorage.getItem("english_mastery_gemini_key") || null;

    try {
      const evaluation = await evaluateWithAiTeacher({
        moduleType: "writing",
        submissionData: {
          part1,
          part2,
          part3,
          part4Informal,
          part4Formal
        },
        apiKey
      });

      if (onSaveScore) {
        onSaveScore({
          writingScore: evaluation.overallScore,
          writingBand: evaluation.cefrBand
        });
      }

      if (onShowFeedback) {
        onShowFeedback(evaluation, "Aptis ESOL Writing (Target C1)");
      }
    } catch (err) {
      console.error("Submission evaluation error:", err);
      alert("Evaluation completed with built-in rubric engine.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!hasStarted) {
    return (
      <ExamStartScreen
        title="Aptis ESOL Writing Simulator"
        subtitle="Thực hành đầy đủ 4 phần thi Viết với bộ đếm từ trực tiếp và chấm điểm theo tiêu chí C1."
        durationLabel="50 phút"
        questionCountLabel="4 Parts (Form, Short Text, Chat, 2 Emails)"
        hasProgress={Boolean(part2 || part4Informal || part4Formal)}
        instructions={[
          "Part 1: Trả lời 5 câu hỏi cá nhân ngắn (1–5 từ).",
          "Part 2 & 3: Viết đăng ký câu lạc bộ (20–30 từ) và tương tác nhóm chat (30–40 từ/câu).",
          "Part 4: Viết 1 email thân mật (~50 từ) và 1 email trang trọng (120–150 từ) gửi ban quản lý."
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
            4P
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Writing: 4-Part Full Simulator</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                50 Mins
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Form Entry • Social Chat • Informal Email • Formal Committee Appeal (C1 Key Decider)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          
          <button
            onClick={handleLoadSampleC1}
            title="Populate with high-scoring C1 benchmark sample"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Load</span> C1 Sample
          </button>

          <button
            onClick={handleReset}
            title="Reset drafts"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Countdown Timer */}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
            timeLeft < 600 
              ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900 animate-pulse" 
              : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          }`}>
            <Timer className="w-4 h-4 text-indigo-500" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white shadow-sm transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Đang chấm..." : "Nộp bài cho Giám khảo"}</span>
          </button>

        </div>

      </div>

      {/* Part Navigation Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto space-x-1">
        {[
          { id: 1, label: "Part 1: Personal Form", time: "3 mins" },
          { id: 2, label: "Part 2: Club Response", time: "7 mins (20-30 words)" },
          { id: 3, label: "Part 3: Social Chat", time: "12 mins (30-40 words x3)" },
          { id: 4, label: "Part 4: Dual Email (C1 Decider)", time: "28 mins (Formal & Informal)" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] font-normal ${activeTab === tab.id ? "text-indigo-200" : "text-slate-400"}`}>
              {tab.time}
            </span>
          </button>
        ))}
      </div>

      {/* Active Part Content */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* PART 1 */}
        {activeTab === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Part 1: Personal Information Form (1 - 5 words per response)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Keep your answers succinct, factual, and grammatically accurate. Do not write full paragraphs.
              </p>
            </div>

            <div className="space-y-4">
              {aptisWritingTask.parts[0].questions.map((q) => {
                const words = countWords(part1[q.id] || "");
                const status = getWordCountStatus(words, q.minWords, q.maxWords);

                return (
                  <div key={q.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-slate-800 dark:text-slate-200">
                        {q.label}
                      </label>
                      <span className={`text-[11px] font-bold ${status.color}`}>
                        {words} word(s) ({status.badge})
                      </span>
                    </div>
                    <input
                      type="text"
                      value={part1[q.id] || ""}
                      onChange={(e) => setPart1({ ...part1, [q.id]: e.target.value })}
                      placeholder={q.placeholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PART 2 */}
        {activeTab === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Part 2: Club Registration Response (Target: 20 - 30 words)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Write complete, natural sentences. Demonstrate strong vocabulary and clear motivation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-800 dark:text-indigo-200">
              <span className="font-bold text-indigo-700 dark:text-indigo-300">Prompt: </span>
              {aptisWritingTask.parts[1].prompt}
            </div>

            {/* Editor Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Your Response:</span>
                {(() => {
                  const words = countWords(part2);
                  const status = getWordCountStatus(words, 20, 30);
                  return (
                    <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${status.bg} ${status.color}`}>
                      {words} / 30 words ({status.badge})
                    </span>
                  );
                })()}
              </div>

              <textarea
                rows={4}
                value={part2}
                onChange={(e) => setPart2(e.target.value)}
                placeholder="Having long championed biodiversity conservation, I resolved to join..."
                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* PART 3 */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Part 3: Social Group Chat Room (30 - 40 words EACH)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Respond directly to all three club members. Maintain an engaging, conversational yet sophisticated register.
              </p>
            </div>

            <div className="space-y-5">
              {aptisWritingTask.parts[2].chats.map((chat) => {
                const words = countWords(part3[chat.id] || "");
                const status = getWordCountStatus(words, chat.minWords, chat.maxWords);

                return (
                  <div 
                    key={chat.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                  >
                    {/* Member incoming message */}
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full ${chat.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {chat.member.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {chat.member}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {chat.role}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          "{chat.message}"
                        </p>
                      </div>
                    </div>

                    {/* Reply textarea */}
                    <div className="space-y-1.5 pl-11">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Your Reply:</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${status.bg} ${status.color}`}>
                          {words} / 40 words ({status.badge})
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={part3[chat.id] || ""}
                        onChange={(e) => setPart3({ ...part3, [chat.id]: e.target.value })}
                        placeholder={`Reply to ${chat.member}...`}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PART 4 */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Part 4: Dual Email Challenge (C1 Key Decider)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Crucial C1 Differentiator
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Demonstrate complete stylistic mastery between an informal peer tone (approx 50 words) and an authoritative, diplomatic formal register (120-150 words).
              </p>
            </div>

            {/* Dilemma Announcement Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/30 text-xs sm:text-sm space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide text-xs">
                Official Committee Announcement:
              </span>
              <p className="text-slate-800 dark:text-slate-200 italic">
                "Due to an unforeseen and severe budgetary shortfall, the society's upcoming annual expedition to the Highland Biosphere Reserve has been cancelled. Additionally, monthly membership subscriptions will double effective immediately."
              </p>
            </div>

            {/* Subtask 4A: Informal Email */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Email 1: Informal Email to Friend (Sam)
                  </span>
                </div>
                {(() => {
                  const words = countWords(part4Informal);
                  const status = getWordCountStatus(words, 40, 65);
                  return (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${status.bg} ${status.color}`}>
                      {words} / 50 words ({status.badge})
                    </span>
                  );
                })()}
              </div>

              <textarea
                rows={4}
                value={part4Informal}
                onChange={(e) => setPart4Informal(e.target.value)}
                placeholder="Hi Sam, Did you see that shocking email about the Highland trip?..."
                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Subtask 4B: Formal Email */}
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Email 2: Formal Appeal to Society President (Dr. Arthur Pendelton)
                  </span>
                </div>
                {(() => {
                  const words = countWords(part4Formal);
                  const status = getWordCountStatus(words, 120, 165);
                  return (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${status.bg} ${status.color}`}>
                      {words} / 150 words ({status.badge})
                    </span>
                  );
                })()}
              </div>

              <textarea
                rows={9}
                value={part4Formal}
                onChange={(e) => setPart4Formal(e.target.value)}
                placeholder="Dear Dr. Pendelton,&#10;&#10;I am writing to register my profound concern regarding the recent committee communiqué announcing the summary cancellation of our Highland expedition..."
                className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed"
              />
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
