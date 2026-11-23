// IeltsPlaceholder.jsx
// Interactive IELTS Academic Preview, CEFR Band Calculator, and Early Access Waitlist

import React, { useState } from "react";
import { Award, Sparkles, BookOpen, Clock, CheckCircle2, ChevronRight, Calculator } from "lucide-react";

export function IeltsPlaceholder() {
  const [readingScore, setReadingScore] = useState(34);
  const [listeningScore, setListeningScore] = useState(35);
  const [writingBand, setWritingBand] = useState(7.5);
  const [speakingBand, setSpeakingBand] = useState(8.0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Approximate IELTS Academic raw score to band
  const rawToBand = (raw) => {
    if (raw >= 39) return 9.0;
    if (raw >= 37) return 8.5;
    if (raw >= 35) return 8.0;
    if (raw >= 33) return 7.5;
    if (raw >= 30) return 7.0;
    if (raw >= 27) return 6.5;
    if (raw >= 23) return 6.0;
    if (raw >= 19) return 5.5;
    return 5.0;
  };

  const rBand = rawToBand(readingScore);
  const lBand = rawToBand(listeningScore);
  const overallBand = Math.round(((rBand + lBand + writingBand + speakingBand) / 4) * 2) / 2;

  const getCefr = (band) => {
    if (band >= 8.5) return "C2 Mastery";
    if (band >= 7.0) return "C1 Effective Operational Proficiency";
    if (band >= 5.5) return "B2 Independent Vantage";
    return "B1 Intermediate";
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            IN ACTIVE DEVELOPMENT
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            IELTS Academic AI Test Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Engineered with Cambridge English Band Descriptors & Cambridge Examiner AI.
          </p>
        </div>
        <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
          Band 7.5 - 9.0
        </div>
      </div>

      {/* Interactive Band Score Calculator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Calculator className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Interactive IELTS Academic Band Calculator & CEFR Correlator
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Academic Reading Raw: {readingScore} / 40</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Band {rBand}</span>
            </div>
            <input
              type="range"
              min={15}
              max={40}
              value={readingScore}
              onChange={(e) => setReadingScore(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Listening Raw: {listeningScore} / 40</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Band {lBand}</span>
            </div>
            <input
              type="range"
              min={15}
              max={40}
              value={listeningScore}
              onChange={(e) => setListeningScore(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Writing Task 1 & 2 Projected Band:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Band {writingBand}</span>
            </div>
            <input
              type="range"
              step={0.5}
              min={5.0}
              max={9.0}
              value={writingBand}
              onChange={(e) => setWritingBand(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Speaking Interview Band:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Band {speakingBand}</span>
            </div>
            <input
              type="range"
              step={0.5}
              min={5.0}
              max={9.0}
              value={speakingBand}
              onChange={(e) => setSpeakingBand(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

        </div>

        {/* Calculated Banner */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-indigo-700 dark:text-indigo-300">
              Projected Overall IELTS Band:
            </span>
            <div className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-100">
              Band {overallBand.toFixed(1)}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">CEFR Framework Level:</span>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {getCefr(overallBand)}
            </div>
          </div>
        </div>

      </div>

      {/* Early Access Notification Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">
          Request Early Beta Access for IELTS Academic Simulator
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Get notified immediately when the Cambridge Task 1 visual chart analyzer and 3-part speaking simulator go live.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="flex max-w-sm mx-auto space-x-2 pt-2">
            <input
              type="email"
              placeholder="candidate@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition shadow-sm"
            >
              Notify Me
            </button>
          </form>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1.5 max-w-sm mx-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>You're on the early access priority list!</span>
          </div>
        )}
      </div>

    </div>
  );
}
