// CertificateSelector.jsx
// Clean, bright, academic certificate selection screen (Less AI, more authentic test portal)

import React from "react";
import { 
  Award, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Keyboard,
  UserCheck
} from "lucide-react";

export function CertificateSelector({ onSelectCertificate }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 sm:py-6 animate-in fade-in duration-200">
      
      {/* Hero Welcome Header */}
      <div className="text-center space-y-2.5 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
          <span>Hệ Thống Luyện Thi Tiếng Anh & Giả Lập Chuẩn Quốc Tế</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Chọn Chứng Chỉ Tiếng Anh <br className="hidden sm:block" />
          <span className="text-blue-700">Mục Tiêu Của Bạn</span>
        </h1>

        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Được xây dựng theo khung chuẩn khảo thí British Council & ETS. Tích hợp đánh giá chi tiết theo thang đo <b>CEFR C1 Band Descriptors</b> và nhận xét chuyên sâu từ Giám khảo <b>Dr. Alistair Vance</b>.
        </p>
      </div>

      {/* C1 Vocab Typing Drill Interactive Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                TẬP LUYỆN GÕ PHÍM TRỰC TIẾP
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                20 Cụm C1
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Flashcard & Luyện Gõ 20 Cụm Từ Vàng C1 (Typing Drill)
            </h2>
            <p className="text-xs text-slate-600">
              Tự tay đánh máy từng ký tự chuẩn C1 (of paramount importance, spearhead, mitigate...), có phát âm chuẩn Anh và câu ngữ cảnh Speaking & Writing.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectCertificate("vocab")}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition flex items-center space-x-2 shrink-0"
        >
          <Keyboard className="w-4 h-4" />
          <span>Vào Luyện Gõ Ngay →</span>
        </button>
      </div>

      {/* 3 Certificate Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. APTIS ESOL (Target C1) - Highlighted Option */}
        <div className="relative rounded-2xl p-6 bg-white border-2 border-blue-600 shadow-md flex flex-col justify-between group hover:-translate-y-0.5 transition duration-150">
          
          {/* Top Recommendation Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-700 text-white shadow-xs uppercase tracking-wider flex items-center space-x-1">
            <Award className="w-3 h-3" />
            <span>Đầy Đủ 5 Kỹ Năng • Target C1</span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">
                Aptis ESOL (C1)
              </h2>
              <p className="text-xs text-blue-700 font-semibold mt-0.5">
                British Council Standardized Format
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Bộ công cụ giả lập thi toàn diện nhất chuẩn C1: từ Ngữ pháp đảo ngữ, Viết thư song ngữ Part 4, Nói thu âm trực tiếp với sóng âm, đến Nghe tối đa 2 lần.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Core:</b> 50 câu Grammar & Vocab (25p)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Writing:</b> 4 Parts với đếm từ tự động (50p)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Speaking:</b> Ghi âm + Nhận diện giọng nói</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Listening:</b> Giới hạn đúng 2 lần nghe (40p)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Reading:</b> Sắp xếp câu mạch lạc, ghép tiêu đề</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectCertificate("aptis")}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition flex items-center justify-center space-x-2"
            >
              <span>Vào Thi Aptis ESOL (C1)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. TOEFL ITP */}
        <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-500 hover:-translate-y-0.5 transition duration-150">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Layers className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  TOEFL ITP
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Mục Tiêu 600+
                </span>
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                ETS Paper-Based Format
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Luyện thi cấu trúc ngữ pháp học thuật chuẩn đề thi TOEFL ITP với giải thích chi tiết từng câu và bảng quy đổi điểm chuẩn ETS 31 - 68.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Section 2:</b> 40 câu Structure & Written Expression</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Thời gian:</b> 25 phút đếm ngược chuẩn kỳ thi</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Quy đổi điểm:</b> Thang ETS 31 - 68 điểm</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><b>Giải thích:</b> Phân tích lỗi sai & sửa ngữ pháp</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectCertificate("toefl")}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center justify-center space-x-2"
            >
              <span>Vào Luyện TOEFL ITP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. IELTS ACADEMIC */}
        <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-amber-500 hover:-translate-y-0.5 transition duration-150">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition">
                  IELTS Academic
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  SẮP RA MẮT
                </span>
              </div>
              <p className="text-xs text-amber-700 font-semibold mt-0.5">
                Cambridge Assessment English
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Bộ công cụ dự báo điểm và giả lập IELTS Academic. Trải nghiệm công cụ tính điểm Band Score tương quan với khung tham chiếu châu Âu CEFR.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><b>Band Calculator:</b> Dự tính Band 5.0 - 9.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><b>CEFR Mapping:</b> Đối sánh B1, B2, C1, C2</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><b>Writing Task 1 & 2:</b> Đang hoàn thiện dữ liệu</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span><b>Early Access:</b> Đăng ký nhận thông báo sớm</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectCertificate("ielts")}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center justify-center space-x-2"
            >
              <span>Xem Trải Nghiệm & Tính Band</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Senior Examiner Footnote */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800">Giám khảo Khảo thí Dr. Alistair Vance:</span>
            <span className="ml-1 text-slate-600">
              Áp dụng thang điểm CEFR C1 chính thức để phân tích từ vựng, ngữ pháp và chấm điểm từng bài thi.
            </span>
          </div>
        </div>
        <span className="text-emerald-700 font-bold flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Hệ Thống Sẵn Sàng 100% Hoạt Động</span>
        </span>
      </div>

    </div>
  );
}
