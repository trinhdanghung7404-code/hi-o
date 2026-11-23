// App.jsx
// EnglishCoach Pro - Standardized Exam Simulator & Learning Portal

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CertificateSelector } from "./components/CertificateSelector";
import { AptisHub } from "./components/AptisHub";
import { ToeflHub } from "./components/ToeflHub";
import { IeltsPlaceholder } from "./components/IeltsPlaceholder";
import { VocabTypingDrill } from "./components/VocabTypingDrill";
import { AiTeacherModal } from "./components/AiTeacherModal";
import { SettingsModal } from "./components/SettingsModal";
import { ExportReportModal } from "./components/ExportReportModal";

export default function App() {
  // Always enforce clean, bright, distraction-free light theme
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("english_mastery_dark_theme");
  }, []);

  // When entering the app, start on the 3-option Certificate Selection screen
  const [currentMode, setCurrentMode] = useState(() => {
    return localStorage.getItem("english_mastery_mode") || null;
  });

  // Performance summary state across modules
  const [performanceData, setPerformanceData] = useState(() => {
    const saved = localStorage.getItem("english_mastery_perf");
    return saved ? JSON.parse(saved) : {};
  });

  // Modal dialog states
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync mode to local storage (if null, remove)
  useEffect(() => {
    if (currentMode) {
      localStorage.setItem("english_mastery_mode", currentMode);
    } else {
      localStorage.removeItem("english_mastery_mode");
    }
  }, [currentMode]);

  // Sync performance
  useEffect(() => {
    localStorage.setItem("english_mastery_perf", JSON.stringify(performanceData));
  }, [performanceData]);

  const handleShowFeedback = (feedback, title) => {
    setFeedbackData(feedback);
    setFeedbackTitle(title);
    setIsFeedbackOpen(true);
  };

  const handleSaveScores = (newPerf) => {
    setPerformanceData((prev) => ({ ...prev, ...newPerf }));
  };

  const handleResetAllData = () => {
    localStorage.clear();
    setCurrentMode(null);
    setPerformanceData({});
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onBackToSelector={() => setCurrentMode(null)}
        onOpenVocabDrill={() => setCurrentMode("vocab")}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* 1. Certificate Selection Screen (3 Options + C1 Typing Banner) */}
        {currentMode === null && (
          <CertificateSelector
            onSelectCertificate={(mode) => setCurrentMode(mode)}
          />
        )}

        {/* 2. C1 Vocab Typing Drill Page */}
        {currentMode === "vocab" && (
          <VocabTypingDrill onBack={() => setCurrentMode(null)} />
        )}

        {/* 3. Dedicated Aptis ESOL (C1) Page */}
        {currentMode === "aptis" && (
          <AptisHub
            onShowFeedback={handleShowFeedback}
            onSaveScores={handleSaveScores}
            performanceData={performanceData}
          />
        )}

        {/* 4. Dedicated TOEFL ITP Page */}
        {currentMode === "toefl" && (
          <ToeflHub
            onSaveScore={(scoreData) => handleSaveScores({ ...performanceData, ...scoreData })}
          />
        )}

        {/* 5. Dedicated IELTS Academic Page */}
        {currentMode === "ielts" && (
          <IeltsPlaceholder />
        )}
      </main>

      {/* Production Footer (Clean Academic Portal) */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">
              EnglishCoach Pro
            </span>
            <span>•</span>
            <span>Hệ Thống Luyện Thi & Giả Lập Chuẩn Khảo Thí British Council & ETS</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-slate-600">Quy chuẩn CEFR C1 (Thang điểm 45 - 50/50)</span>
            </span>
            <span>Giám khảo: Dr. Alistair Vance</span>
          </div>
        </div>
      </footer>

      {/* Examiner Feedback Report Modal */}
      <AiTeacherModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        feedbackData={feedbackData}
        testTitle={feedbackTitle}
      />

      {/* App Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetAllData={handleResetAllData}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        reportData={performanceData}
      />

    </div>
  );
}
