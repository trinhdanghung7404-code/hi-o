// Navbar.jsx
// Clean, professional academic navigation header (Official British Council / ETS Testing Portal Style)

import React from "react";
import { 
  GraduationCap, 
  Settings, 
  FileDown, 
  Award,
  Layers,
  BookOpen,
  ArrowLeft,
  Keyboard,
  UserCheck
} from "lucide-react";

export function Navbar({ 
  currentMode, 
  onBackToSelector,
  onOpenVocabDrill,
  onOpenSettings, 
  onOpenExport 
}) {
  const getExamInfo = () => {
    if (currentMode === "aptis") {
      return {
        label: "Aptis ESOL (C1)",
        color: "text-blue-700 bg-blue-50 border-blue-200",
        icon: Award
      };
    }
    if (currentMode === "toefl") {
      return {
        label: "TOEFL ITP (600+)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        icon: Layers
      };
    }
    if (currentMode === "ielts") {
      return {
        label: "IELTS Academic",
        color: "text-amber-800 bg-amber-50 border-amber-200",
        icon: BookOpen
      };
    }
    if (currentMode === "vocab") {
      return {
        label: "Luyện Gõ Từ Vựng C1",
        color: "text-indigo-700 bg-indigo-50 border-indigo-200",
        icon: Keyboard
      };
    }
    return null;
  };

  const examInfo = getExamInfo();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={onBackToSelector}
          className="flex items-center space-x-3 cursor-pointer group select-none"
          title="Về trang chủ chọn chứng chỉ"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-800 transition">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                EnglishCoach<span className="text-blue-700 ml-0.5">Pro</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                EXAM SIMULATOR
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
              Hệ Thống Luyện Thi Chuẩn British Council & ETS
            </p>
          </div>
        </div>

        {/* Center: When in exam mode, show current exam & 'Đổi chứng chỉ' button */}
        {examInfo && (
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToSelector}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
              title="Quay lại danh sách 3 chứng chỉ"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đổi chứng chỉ</span>
              <span className="sm:hidden">Đổi</span>
            </button>

            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${examInfo.color}`}>
              <examInfo.icon className="w-3.5 h-3.5" />
              <span>{examInfo.label}</span>
            </div>
          </div>
        )}

        {/* Right Actions: Vocab Drill, Examiner, Export, Settings */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Vocab Typing Drill Button */}
          <button
            onClick={onOpenVocabDrill}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              currentMode === "vocab"
                ? "bg-blue-700 text-white border-blue-800 shadow-sm"
                : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            }`}
            title="Luyện gõ bàn phím 20 cụm từ vàng C1"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flashcard & Gõ C1</span>
            <span className="sm:hidden">Từ vựng C1</span>
          </button>

          {/* Senior Examiner Profile Badge */}
          <div 
            title="Giám khảo phụ trách: Dr. Alistair Vance (Chuyên gia khảo thí C1 British Council)"
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition"
            onClick={onOpenSettings}
          >
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800">
                Dr. Alistair Vance
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Giám khảo C1 (British Council)
              </div>
            </div>
          </div>

          {/* Export Report */}
          <button
            onClick={onOpenExport}
            title="Xuất bảng điểm & phiếu nhận xét (PDF / Markdown)"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition"
          >
            <FileDown className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Cài đặt hệ thống"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition"
          >
            <Settings className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
