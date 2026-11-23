// AptisHub.jsx
// Dedicated Aptis ESOL (Target C1) Master Controller

import React, { useState } from "react";
import { 
  CheckCircle2, 
  BookOpen, 
  PenTool, 
  Mic, 
  Headphones, 
  Layers, 
  Award,
  Sparkles,
  TrendingUp,
  FileText,
  Keyboard
} from "lucide-react";
import { CoreModule } from "./CoreModule";
import { WritingModule } from "./WritingModule";
import { SpeakingModule } from "./SpeakingModule";
import { ListeningModule } from "./ListeningModule";
import { ReadingModule } from "./ReadingModule";
import { VocabTypingDrill } from "./VocabTypingDrill";

export function AptisHub({ onShowFeedback, onSaveScores, performanceData }) {
  const [activeTab, setActiveTab] = useState(null); // null until user picks a module

  const navItems = [
    {
      id: "core",
      label: "Core: Grammar & Vocab",
      desc: "50 items • 25 mins",
      icon: BookOpen,
      badge: "Target C1",
      score: performanceData.coreScore !== undefined ? `${performanceData.coreScore}/50` : null
    },
    {
      id: "writing",
      label: "Writing Simulator",
      desc: "4 Parts • 50 mins",
      icon: PenTool,
      badge: "Chấm điểm C1",
      score: performanceData.writingScore !== undefined ? `${performanceData.writingScore}/50` : null
    },
    {
      id: "speaking",
      label: "Speaking Simulator",
      desc: "4 Parts • 12 mins",
      icon: Mic,
      badge: "Voice & Speech",
      score: performanceData.speakingScore !== undefined ? `${performanceData.speakingScore}/50` : null
    },
    {
      id: "listening",
      label: "Listening Simulator",
      desc: "25 items • ~40 mins",
      icon: Headphones,
      badge: "Max 2 Plays",
      score: performanceData.listeningScore !== undefined ? `${performanceData.listeningScore}/25` : null
    },
    {
      id: "reading",
      label: "Reading Simulator",
      desc: "4 Parts • 35 mins",
      icon: Layers,
      badge: "C1 Analysis",
      score: performanceData.readingScore !== undefined ? `${performanceData.readingScore}/24` : null
    },
    {
      id: "vocabDrill",
      label: "Flashcard & Gõ C1",
      desc: "20 Cụm từ vàng C1",
      icon: Keyboard,
      badge: "Vocab & Cards",
      score: null
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* C1 Exam Mastery Dashboard Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/15 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/20 text-white backdrop-blur-md border border-white/25 flex items-center space-x-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>BRITISH COUNCIL APTIS ESOL SIMULATOR</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400/25 text-emerald-100 border border-emerald-300/30">
                Target Level: CEFR C1
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
              Aptis ESOL (C1) Comprehensive Examination Suite
            </h1>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
              Standardized testing simulator featuring all 5 official components. Evaluated by senior British Council Examiner <span className="font-bold text-white underline decoration-amber-300 decoration-2 underline-offset-2">Dr. Alistair Vance</span> with line-by-line CEFR C1 band descriptor analytics.
            </p>
          </div>

          {/* Quick Stats Pillar */}
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-inner">
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-xs text-indigo-100 font-medium">Completed</div>
              <div className="text-2xl font-black text-amber-300">
                {[
                  performanceData.coreScore,
                  performanceData.writingScore,
                  performanceData.speakingScore,
                  performanceData.listeningScore,
                  performanceData.readingScore
                ].filter((s) => s !== undefined).length} / 5
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-xs text-indigo-100 font-medium">Predicted Band</div>
              <div className="text-2xl font-black text-white flex items-center justify-center space-x-1">
                <span>C1</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Navigation Pill Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between ${
                isActive
                  ? "bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-400 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl ${
                  isActive 
                    ? "bg-indigo-600 text-white" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {item.score ? (
                  <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    {item.score}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    {item.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Component Canvas */}
      <div className="transition-all duration-200">
        {!activeTab && (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Chọn một kỹ năng ở trên để bắt đầu luyện thi Aptis ESOL (C1)
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Hệ thống không tự động tính giờ trước khi bạn sẵn sàng. Hãy chọn một kỹ năng bất kỳ phía trên (Core, Writing, Speaking, Listening, Reading hoặc Flashcard & Gõ C1) để xem hướng dẫn và bấm <b>Bắt đầu làm bài</b>.
            </p>
          </div>
        )}
        {activeTab === "core" && (
          <CoreModule 
            onSaveScore={(scoreData) => onSaveScores({ ...performanceData, coreScore: scoreData.totalScore, coreBand: scoreData.cefrBand, coreCompleted: true })} 
          />
        )}
        {activeTab === "writing" && (
          <WritingModule 
            onShowFeedback={onShowFeedback}
            onSaveScore={(scoreData) => onSaveScores({ ...performanceData, writingScore: scoreData.writingScore, writingBand: scoreData.writingBand, writingCompleted: true })}
          />
        )}
        {activeTab === "speaking" && (
          <SpeakingModule 
            onShowFeedback={onShowFeedback}
            onSaveScore={(scoreData) => onSaveScores({ ...performanceData, speakingScore: scoreData.speakingScore, speakingBand: scoreData.speakingBand, speakingCompleted: true })}
          />
        )}
        {activeTab === "listening" && (
          <ListeningModule 
            onSaveScore={(scoreData) => onSaveScores({ ...performanceData, listeningScore: scoreData.listeningScore, listeningBand: scoreData.listeningBand, listeningCompleted: true })}
          />
        )}
        {activeTab === "reading" && (
          <ReadingModule 
            onSaveScore={(scoreData) => onSaveScores({ ...performanceData, readingScore: scoreData.readingScore, readingBand: scoreData.readingBand, readingCompleted: true })}
          />
        )}
        {activeTab === "vocabDrill" && (
          <VocabTypingDrill />
        )}
      </div>

    </div>
  );
}
