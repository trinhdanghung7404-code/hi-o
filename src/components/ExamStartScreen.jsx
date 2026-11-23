// ExamStartScreen.jsx
// Clean pre-exam ready gate so countdown timers only start when the user clicks Start

import React from "react";
import { Play, Clock, FileCheck2, ShieldCheck } from "lucide-react";

export function ExamStartScreen({
  title,
  subtitle,
  durationLabel,
  questionCountLabel,
  instructions = [],
  hasProgress = false,
  onStart
}) {
  return (
    <div className="max-w-2xl mx-auto my-6 p-7 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-6 animate-in fade-in duration-200">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center mx-auto">
        <FileCheck2 className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          CHẾ ĐỘ PHÒNG THI CHUẨN
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {title}
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Thời gian: {durationLabel}</span>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cấu trúc: {questionCountLabel}</span>
        </div>
      </div>

      {instructions.length > 0 && (
        <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Lưu ý trước khi bắt đầu
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {instructions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onStart}
          className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 transition cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{hasProgress ? "Tiếp tục làm bài" : "Bắt đầu làm bài"}</span>
        </button>
        <p className="text-[11px] text-slate-400 mt-2.5">
          Đồng hồ đếm ngược chỉ bắt đầu chạy sau khi bạn bấm nút trên.
        </p>
      </div>
    </div>
  );
}
