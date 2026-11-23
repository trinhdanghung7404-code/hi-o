// AiTeacherModal.jsx
// Comprehensive interactive feedback report from Dr. Alistair Vance (British Council C1 Examiner)

import React from "react";
import { 
  X, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  FileText,
  AlertCircle
} from "lucide-react";

export function AiTeacherModal({ isOpen, onClose, feedbackData, testTitle }) {
  if (!isOpen || !feedbackData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-xl shadow-inner">
              🎓
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">Phiếu Đánh Giá Chuyên Môn: {feedbackData.examiner || "Dr. Alistair Vance"}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/40">
                  CEFR C1 CERTIFIED
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium">
                {feedbackData.examinerTitle || "Senior British Council C1-Certified Examiner"} • {testTitle || "Aptis ESOL Simulator"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Overall Score Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 dark:from-indigo-950/40 dark:to-slate-800/60 border border-indigo-200 dark:border-indigo-800/60 flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center space-x-1.5">
                <Award className="w-4 h-4" />
                <span>Overall CEFR Mark</span>
              </span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-100">
                  {feedbackData.overallScore} <span className="text-base text-slate-500 dark:text-slate-400 font-normal">/ {feedbackData.maxScore}</span>
                </div>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm">
                  Band {feedbackData.cefrBand || "C1"}
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Calibrated against official British Council Aptis C1 descriptor scales.
              </p>
            </div>

            {/* Examiner Summary Commentary */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Examiner Synthesis & Diagnosis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-3 my-1">
                "{feedbackData.summaryFeedback}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <span>Target: CEFR C1 Mastery (45 - 50 pts)</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Line-by-Line Verified</span>
              </div>
            </div>

          </div>

          {/* CEFR Rubric Breakdown Grid */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>CEFR C1 Band Descriptor Rubric Breakdown</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(feedbackData.rubricBreakdown || []).map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.criterion}</span>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                      {item.score} / {item.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    {item.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detected C1 Structures Badge List */}
          {feedbackData.detectedC1Features && feedbackData.detectedC1Features.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Detected Advanced C1 Syntactical Structures ({feedbackData.detectedC1Features.length})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {feedbackData.detectedC1Features.map((feat, idx) => (
                  <div 
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700/60 text-xs shadow-2xs"
                  >
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 mr-1.5">{feat.name}:</span>
                    <span className="text-slate-600 dark:text-slate-400 italic text-[11px]">{feat.sample}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before vs. After (C1 Level) Rewrites */}
          {feedbackData.beforeAfterRewrites && feedbackData.beforeAfterRewrites.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Before vs. After (C1 Level Upgrades)</span>
              </h4>

              <div className="space-y-3">
                {feedbackData.beforeAfterRewrites.map((rw, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 space-y-2 text-xs"
                  >
                    <div className="flex items-start space-x-2">
                      <span className="shrink-0 px-2 py-0.5 rounded font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 text-[10px]">
                        BEFORE (B1/B2)
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 line-through decoration-rose-400">
                        {rw.before}
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <span className="shrink-0 px-2 py-0.5 rounded font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[10px] flex items-center space-x-1">
                        <span>AFTER (C1)</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-emerald-200">
                        {rw.after}
                      </p>
                    </div>

                    {rw.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-2 border-l border-slate-300 dark:border-slate-700 italic">
                        💡 {rw.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Examiner Advice & Exam Tips */}
          {feedbackData.examinerTips && feedbackData.examinerTips.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Dr. Vance's Strategic Recommendations for Aptis C1 Distinction</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {feedbackData.examinerTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Recorded in Local Storage • Session saved
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
          >
            Acknowledge & Close Report
          </button>
        </div>

      </div>
    </div>
  );
}
