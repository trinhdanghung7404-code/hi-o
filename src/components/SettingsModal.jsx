// SettingsModal.jsx
// Configure AI Examiner API Key, voice speech, and local test state

import React, { useState, useEffect } from "react";
import { X, Key, Volume2, Trash2, Check, ShieldCheck, Sparkles } from "lucide-react";
import { speakText, stopSpeaking } from "../utils/audioSpeech";

export function SettingsModal({ isOpen, onClose, onResetAllData }) {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("english_mastery_gemini_key") || "";
    setApiKey(saved);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    localStorage.setItem("english_mastery_gemini_key", apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTestSpeech = () => {
    setIsTestingVoice(true);
    speakText("Greetings. I am Doctor Alistair Vance, your British Council C1 English Master Examiner. I am ready to evaluate your fluency, lexical range, and grammatical accuracy.", {
      onEnd: () => setIsTestingVoice(false)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              App Preferences & AI Examiner
            </h3>
          </div>
          <button
            onClick={() => { stopSpeaking(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          
          {/* Gemini API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                <Key className="w-4 h-4 text-indigo-500" />
                <span>Google Gemini API Key (Optional)</span>
              </label>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Saved locally</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              English Mastery AI includes an autonomous built-in C1 Examiner engine that functions 100% offline. Adding your Gemini API key activates live neural analysis using Gemini 2.5 Flash.
            </p>
            <div className="flex space-x-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center space-x-1"
              >
                {isSaved ? <Check className="w-4 h-4" /> : <span>Save</span>}
              </button>
            </div>
          </div>

          {/* Examiner Speech Audio Test */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                  Examiner Voice (British English - en-GB)
                </span>
              </div>
              <button
                onClick={handleTestSpeech}
                disabled={isTestingVoice}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition"
              >
                {isTestingVoice ? "Speaking..." : "Test Voice"}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Uses the browser's Web SpeechSynthesis British voice for authentic Aptis prompt deliveries and listening passages.
            </p>
          </div>

          {/* Local Data Management */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Clear Test Attempts & Cache
              </div>
              <div className="text-[11px] text-slate-500">
                Resets question answer states, flagged items, and writing drafts.
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all test attempts and drafts?")) {
                  onResetAllData();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={() => { stopSpeaking(); onClose(); }}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
