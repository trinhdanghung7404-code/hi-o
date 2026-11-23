// SpeakingVisuals.jsx
// Embedded high-fidelity visual representations for Aptis Speaking Module Parts 2 & 3

import React from "react";

export function OfficeVisual() {
  return (
    <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 border border-indigo-100 dark:border-slate-700/60 shadow-sm relative flex items-center justify-center p-4">
      <svg className="w-full h-full max-w-lg" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background architectural windows & city view */}
        <rect x="20" y="20" width="460" height="150" rx="10" fill="#e2e8f0" fillOpacity="0.8" />
        <line x1="120" y1="20" x2="120" y2="170" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="250" y1="20" x2="250" y2="170" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="380" y1="20" x2="380" y2="170" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="20" y1="95" x2="480" y2="95" stroke="#cbd5e1" strokeWidth="2" />

        {/* City skyline silhouettes through window */}
        <rect x="40" y="80" width="30" height="90" fill="#94a3b8" fillOpacity="0.6" />
        <rect x="80" y="60" width="25" height="110" fill="#94a3b8" fillOpacity="0.6" />
        <rect x="150" y="70" width="40" height="100" fill="#94a3b8" fillOpacity="0.6" />
        <rect x="280" y="50" width="45" height="120" fill="#94a3b8" fillOpacity="0.6" />
        <rect x="350" y="75" width="25" height="95" fill="#94a3b8" fillOpacity="0.6" />
        <rect x="400" y="90" width="35" height="80" fill="#94a3b8" fillOpacity="0.6" />

        {/* Biophilic indoor plants */}
        <path d="M430 200 C430 170 410 160 410 150 C425 155 445 165 440 180" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        <path d="M435 200 C435 165 455 155 460 145 C455 160 445 180 440 195" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="435" cy="205" rx="14" ry="6" fill="#64748b" />
        <rect x="425" y="205" width="20" height="25" fill="#94a3b8" rx="3" />

        {/* Collaborative conference table */}
        <ellipse cx="250" cy="210" rx="160" ry="32" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
        <ellipse cx="250" cy="205" rx="155" ry="28" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

        {/* Laptops and architectural blueprint plans on table */}
        <rect x="210" y="190" width="80" height="30" rx="3" fill="#e2e8f0" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="140" y="195" width="28" height="18" rx="2" fill="#3b82f6" />
        <rect x="330" y="195" width="28" height="18" rx="2" fill="#0284c7" />

        {/* Collaborative people avatars */}
        {/* Person Left */}
        <circle cx="110" cy="180" r="14" fill="#f87171" />
        <path d="M90 220 C90 198 130 198 130 220" fill="#ef4444" />
        {/* Person Center Left */}
        <circle cx="210" cy="165" r="14" fill="#fbbf24" />
        <path d="M190 205 C190 185 230 185 230 205" fill="#f59e0b" />
        {/* Person Center Right */}
        <circle cx="290" cy="165" r="14" fill="#34d399" />
        <path d="M270 205 C270 185 310 185 310 205" fill="#10b981" />
        {/* Person Right */}
        <circle cx="390" cy="180" r="14" fill="#818cf8" />
        <path d="M370 220 C370 198 410 198 410 220" fill="#6366f1" />

        <text x="250" y="260" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="600" letterSpacing="0.5">
          IMAGE: Collaborative Open-Plan Co-Working Sanctuary & Biophilic Architecture
        </text>
      </svg>
    </div>
  );
}

export function ContrastVisuals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Picture A: Crowded Subway / Urban Rush */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-sm flex flex-col items-center">
        <div className="w-full text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 flex items-center justify-between">
          <span>Picture A: Metropolitan High-Density Commuting</span>
          <span className="bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded text-[10px]">Urban Rush</span>
        </div>
        <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#f1f5f9" rx="8" />
          {/* Train interior lines */}
          <line x1="20" y1="40" x2="280" y2="40" stroke="#94a3b8" strokeWidth="3" />
          <line x1="20" y1="160" x2="280" y2="160" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="40" x2="60" y2="160" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="150" y1="40" x2="150" y2="160" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="240" y1="40" x2="240" y2="160" stroke="#cbd5e1" strokeWidth="2" />

          {/* Handrails hanging */}
          <circle cx="100" cy="55" r="7" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <line x1="100" y1="40" x2="100" y2="48" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="200" cy="55" r="7" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <line x1="200" y1="40" x2="200" y2="48" stroke="#f59e0b" strokeWidth="2" />

          {/* Crowded silhouette figures */}
          <circle cx="65" cy="110" r="16" fill="#64748b" />
          <path d="M40 170 C40 135 90 135 90 170" fill="#475569" />

          <circle cx="115" cy="100" r="16" fill="#0284c7" />
          <path d="M90 170 C90 125 140 125 140 170" fill="#0369a1" />
          <rect x="110" y="130" width="12" height="18" rx="2" fill="#38bdf8" />

          <circle cx="165" cy="105" r="16" fill="#6366f1" />
          <path d="M140 170 C140 130 190 130 190 170" fill="#4f46e5" />

          <circle cx="215" cy="102" r="16" fill="#64748b" />
          <path d="M190 170 C190 125 240 125 240 170" fill="#475569" />

          <circle cx="255" cy="112" r="15" fill="#94a3b8" />
          <path d="M230 170 C230 135 280 135 280 170" fill="#64748b" />

          <text x="150" y="188" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">Fast-paced, sensory overload, crowded subway</text>
        </svg>
      </div>

      {/* Picture B: Solitary Mountain Trekker */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-sm flex flex-col items-center">
        <div className="w-full text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center justify-between">
          <span>Picture B: Solitary Wilderness Contemplation</span>
          <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px]">Pristine Nature</span>
        </div>
        <svg className="w-full h-48" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="#f8fafc" rx="8" />
          {/* Alpine Sky and Sun */}
          <path d="M0 0 H300 V120 H0 Z" fill="url(#skyGradBright)" />
          <defs>
            <linearGradient id="skyGradBright" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#bae6fd" />
              <stop offset="1" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <circle cx="240" cy="40" r="18" fill="#fde047" />

          {/* Distant Mountain Peaks */}
          <polygon points="20,120 90,45 160,120" fill="#94a3b8" />
          <polygon points="90,45 110,65 80,65" fill="#f8fafc" />
          <polygon points="120,120 190,30 270,120" fill="#64748b" />
          <polygon points="190,30 215,58 175,58" fill="#f8fafc" />

          {/* Foreground Ridge */}
          <path d="M0 130 Q100 115 180 145 T300 135 L300 200 L0 200 Z" fill="#059669" />
          <path d="M0 150 Q120 140 200 165 T300 155 L300 200 L0 200 Z" fill="#047857" />

          {/* Solitary Hiker with Backpack on Ridge */}
          <circle cx="160" cy="118" r="8" fill="#f87171" />
          <rect x="154" y="126" width="12" height="22" rx="3" fill="#dc2626" />
          {/* Backpack */}
          <rect x="148" y="128" width="7" height="15" rx="2" fill="#0284c7" />
          {/* Trekking poles */}
          <line x1="152" y1="134" x2="142" y2="155" stroke="#f1f5f9" strokeWidth="1.5" />
          <line x1="168" y1="134" x2="175" y2="155" stroke="#f1f5f9" strokeWidth="1.5" />

          <text x="150" y="188" textAnchor="middle" fill="#ecfdf5" fontSize="11" fontWeight="600">Solitary contemplation, silence, expansive horizon</text>
        </svg>
      </div>
    </div>
  );
}
