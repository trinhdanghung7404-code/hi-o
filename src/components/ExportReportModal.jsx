// ExportReportModal.jsx
// Export student performance review report to Markdown or trigger Print-to-PDF

import React, { useState } from "react";
import { X, Copy, Check, Printer, Download, FileText } from "lucide-react";

export function ExportReportModal({ isOpen, onClose, reportData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reportData) return null;

  const markdownText = generateMarkdown(reportData);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `English_Mastery_C1_Report_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Performance Review & CEFR Diagnostic Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 overflow-x-auto whitespace-pre-wrap text-slate-800 dark:text-slate-200">
            {markdownText}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-sans">
            Ready for submission to tutors or portfolio archival
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Markdown"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function generateMarkdown(data) {
  const dateStr = new Date().toLocaleDateString("en-GB", { 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return `# ENGLISH MASTERY AI — OFFICIAL TEST REPORT
**Candidate Assessment & CEFR C1 Diagnostic Dossier**
*Certified by AI Master Examiner Dr. Alistair Vance (British Council Persona)*
*Date: ${dateStr}*

---

## 1. EXECUTIVE PERFORMANCE SUMMARY
| Exam Component | Raw Score | CEFR Band | Evaluation Status |
| :--- | :--- | :--- | :--- |
| **Core Grammar & Vocabulary** | ${data.coreScore || "—"}/50 | ${data.coreBand || "C1 Candidate"} | ${data.coreCompleted ? "Completed" : "In Progress"} |
| **Writing Module (4 Parts)** | ${data.writingScore || "—"}/50 | ${data.writingBand || "C1"} | ${data.writingCompleted ? "Examiner Graded" : "Draft Saved"} |
| **Speaking Module (4 Parts)** | ${data.speakingScore || "—"}/50 | ${data.speakingBand || "C1"} | ${data.speakingCompleted ? "Speech Evaluated" : "Pending"} |
| **Listening Module (25 Items)** | ${data.listeningScore || "—"}/25 | ${data.listeningBand || "C1 Candidate"} | ${data.listeningCompleted ? "Completed" : "In Progress"} |
| **Reading Module (4 Parts)** | ${data.readingScore || "—"}/24 | ${data.readingBand || "C1 Candidate"} | ${data.readingCompleted ? "Completed" : "In Progress"} |

---

## 2. EXAMINER CRITIQUE & ACTIONABLE C1 RECOMMENDATIONS
- **Primary Examiner**: Dr. Alistair Vance (Senior British Council C1 Applied Linguist)
- **Target Standard**: CEFR C1 (Effective Operational Proficiency)

### Key Examiner Insights:
1. **Syntactical Flexibility**: Incorporate negative inversions (*"Rarely have we witnessed..."*) and cleft focal framing (*"What proved decisive was..."*) to solidify the upper-range mark.
2. **Lexical Precision**: Systematically replace conversational B2 verbs (*"make better"*, *"deal with"*) with formal C1 academic collocations (*"ameliorate"*, *"mitigate"*, *"spearhead"*).
3. **Register Control**: Strict observance of the distinction between informal peer correspondence and formal administrative submissions.

---
*Generated by English Mastery AI (Production Simulator)*
`;
}
