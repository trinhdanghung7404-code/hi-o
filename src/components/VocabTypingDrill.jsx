// VocabTypingDrill.jsx
// Interactive C1 Vocabulary & Sentence Typing Simulator
// Clean Natural Typography (MonkeyType style, no letter boxes/borders)

import React, { useState, useEffect, useRef } from "react";
import { 
  Keyboard, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  VolumeX, 
  Lightbulb, 
  Trophy,
  Sparkles,
  BookOpen,
  FastForward,
  Layers,
  Shuffle,
  Repeat,
  XCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { c1VocabList } from "../data/c1VocabData";
import { speakText, playExamChime } from "../utils/audioSpeech";

export function VocabTypingDrill({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem("c1_vocab_completed");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Modes: "sentence" (Gõ cả câu mẫu - DEFAULT) | "echo" (Chỉ gõ cụm C1) | "cloze" (Điền câu khuyết) | "flashcard" (Thẻ ghi nhớ)
  const [drillMode, setDrillMode] = useState("sentence");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streak, setStreak] = useState(0);

  // Flashcard states
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontSide, setFrontSide] = useState("en"); // "en" | "vi"
  const [deckOrder, setDeckOrder] = useState(() => c1VocabList.map((_, idx) => idx));
  const [filterUnmastered, setFilterUnmastered] = useState(false);

  // Typing stats
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const inputRef = useRef(null);

  // Filtered indices when flashcard filter is active
  const activeDeckIndices = filterUnmastered && drillMode === "flashcard"
    ? deckOrder.filter((idx) => !completedIds.includes(c1VocabList[idx].id))
    : deckOrder;

  const safeCurrentIdx = activeDeckIndices.includes(currentIndex)
    ? currentIndex
    : (activeDeckIndices[0] ?? 0);

  const currentItem = c1VocabList[safeCurrentIdx];

  // Determine current target text according to mode
  const targetText = drillMode === "sentence" 
    ? currentItem.contextSentence 
    : currentItem.phrase;

  useEffect(() => {
    localStorage.setItem("c1_vocab_completed", JSON.stringify(completedIds));
  }, [completedIds]);

  // Focus input or reset flip state when changing word or mode
  useEffect(() => {
    setUserInput("");
    setStartTime(null);
    setMistakes(0);
    setWpm(0);
    setIsFlipped(false);
    if (drillMode !== "flashcard" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, drillMode]);

  // Keyboard shortcuts for Flashcard mode (Space to flip, ArrowLeft/Right to navigate)
  useEffect(() => {
    if (drillMode !== "flashcard") return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNextFlashcard();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrevFlashcard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleNextFlashcard = () => {
    if (activeDeckIndices.length === 0) return;
    const pos = activeDeckIndices.indexOf(safeCurrentIdx);
    const nextPos = pos >= 0 && pos < activeDeckIndices.length - 1 ? pos + 1 : 0;
    setCurrentIndex(activeDeckIndices[nextPos]);
    setIsFlipped(false);
  };

  const handlePrevFlashcard = () => {
    if (activeDeckIndices.length === 0) return;
    const pos = activeDeckIndices.indexOf(safeCurrentIdx);
    const prevPos = pos > 0 ? pos - 1 : activeDeckIndices.length - 1;
    setCurrentIndex(activeDeckIndices[prevPos]);
    setIsFlipped(false);
  };

  const handleShuffleDeck = () => {
    const shuffled = [...deckOrder].sort(() => Math.random() - 0.5);
    setDeckOrder(shuffled);
    setCurrentIndex(shuffled[0]);
    setIsFlipped(false);
  };

  const handleMarkFlashcard = (mastered) => {
    if (mastered) {
      if (!completedIds.includes(currentItem.id)) {
        setCompletedIds((prev) => [...prev, currentItem.id]);
      }
      setStreak((prev) => prev + 1);
      playExamChime();
      confetti({ particleCount: 25, spread: 55, origin: { y: 0.7 } });
    } else {
      setCompletedIds((prev) => prev.filter((id) => id !== currentItem.id));
      setStreak(0);
    }
    handleNextFlashcard();
  };

  // Play keystroke tone
  const playKeyTone = (isCorrect) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (isCorrect) {
        osc.frequency.setValueAtTime(600 + Math.random() * 80, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (isCorrect ? 0.06 : 0.12));
    } catch (e) {
      // AudioCtx fallback
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;

    // Start timer on first keystroke
    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    // Check if current typed prefix matches
    const isPrefixCorrect = targetText.toLowerCase().startsWith(val.toLowerCase());
    if (!isPrefixCorrect && val.length > userInput.length) {
      setMistakes((prev) => prev + 1);
      playKeyTone(false);
    } else {
      playKeyTone(true);
    }

    setUserInput(val);

    // Calculate WPM
    if (startTime && val.length > 3) {
      const timeElapsedMinutes = (Date.now() - startTime) / 60000;
      if (timeElapsedMinutes > 0) {
        const wordsTyped = val.length / 5;
        setWpm(Math.round(wordsTyped / timeElapsedMinutes));
      }
    }

    // Check complete match!
    if (val.trim().toLowerCase() === targetText.trim().toLowerCase()) {
      handleCompleteCurrentWord();
    }
  };

  const handleCompleteCurrentWord = () => {
    playExamChime();

    // Trigger celebratory confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 }
    });

    if (!completedIds.includes(currentItem.id)) {
      setCompletedIds((prev) => [...prev, currentItem.id]);
    }
    setStreak((prev) => prev + 1);

    // Auto speak audio pronunciation (sentence or phrase)
    speakText(drillMode === "sentence" ? currentItem.contextSentence : currentItem.phrase);

    // Advance to next item after 1000ms
    setTimeout(() => {
      if (currentIndex < c1VocabList.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Finished all 20!
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }, 1100);
  };

  const handlePronounce = (textToSay) => {
    speakText(textToSay || (drillMode === "sentence" ? currentItem.contextSentence : currentItem.phrase));
  };

  const handleResetWord = () => {
    setUserInput("");
    setStartTime(null);
    setMistakes(0);
    setWpm(0);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleResetAllProgress = () => {
    if (window.confirm("Đặt lại toàn bộ tiến độ 20 từ vựng C1?")) {
      setCompletedIds([]);
      setStreak(0);
      setCurrentIndex(0);
      setUserInput("");
      localStorage.removeItem("c1_vocab_completed");
    }
  };

  // Render normal natural text matching (No boxes, no borders, MonkeyType style)
  // Split into words so words don't break awkwardly across lines
  const renderNaturalText = () => {
    const typed = userInput;
    const words = targetText.split(" ");
    let charOffset = 0;

    // Check if the current phrase appears in the context sentence to highlight it
    const phraseStart = drillMode === "sentence" 
      ? targetText.toLowerCase().indexOf(currentItem.phrase.toLowerCase())
      : 0;
    const phraseEnd = phraseStart >= 0 ? phraseStart + currentItem.phrase.length : -1;

    return (
      <div className={`flex flex-wrap items-baseline leading-relaxed select-none font-sans ${
        drillMode === "sentence" 
          ? "text-lg sm:text-2xl justify-start my-4 text-left" 
          : "text-2xl sm:text-4xl justify-center my-6 text-center"
      }`}>
        {words.map((word, wIdx) => {
          const wordChars = word.split("");
          const currentWordStartOffset = charOffset;

          const renderedWord = (
            <span key={wIdx} className="inline-flex items-baseline mr-2 sm:mr-3 my-1">
              {wordChars.map((char, cIdx) => {
                const globalIdx = currentWordStartOffset + cIdx;
                const isTyped = globalIdx < typed.length;
                const typedChar = typed[globalIdx];
                const isCorrect = isTyped && typedChar.toLowerCase() === char.toLowerCase();
                const isCurrent = globalIdx === typed.length;
                const isTargetPhrasePart = phraseStart >= 0 && globalIdx >= phraseStart && globalIdx < phraseEnd;

                // Natural text styling: No boxes, no backgrounds, no borders!
                let textStyle = isTargetPhrasePart 
                  ? "text-slate-400 font-medium underline decoration-blue-400/60 decoration-2 underline-offset-4" 
                  : "text-slate-300 font-normal";

                if (isTyped) {
                  if (isCorrect) {
                    textStyle = isTargetPhrasePart 
                      ? "text-emerald-700 font-semibold underline decoration-emerald-500 decoration-2 underline-offset-4" 
                      : "text-emerald-600 font-medium";
                  } else {
                    textStyle = "text-rose-600 font-bold underline decoration-rose-500 decoration-2 underline-offset-4";
                  }
                }

                return (
                  <span 
                    key={cIdx} 
                    className={`relative inline-block ${textStyle} transition-colors duration-75`}
                  >
                    {isCurrent && (
                      <span className="absolute -left-0.5 top-0.5 bottom-0.5 w-0.5 bg-blue-600 animate-pulse rounded-full" />
                    )}
                    {char}
                  </span>
                );
              })}
            </span>
          );

          // Update offset for next word (+1 for the space)
          charOffset += word.length + 1;
          return renderedWord;
        })}
      </div>
    );
  };

  const isCurrentCompleted = completedIds.includes(currentItem.id);
  const progressPercent = Math.min(100, Math.round((userInput.length / Math.max(1, targetText.length)) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              C1 VOCABULARY & SENTENCE DRILL
            </span>
            <span className="text-xs text-slate-500 font-medium">
              20 Mẫu Câu Chuẩn C1 Cho Speaking & Writing
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Luyện Gõ & Ghi Nhớ Câu Mẫu C1
          </h1>
          <p className="text-xs text-slate-500">
            Gõ trực tiếp cả câu mẫu hoặc cụm từ C1 để ngấm sâu cấu trúc và phản xạ tự nhiên trong bài thi.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-[10px] text-slate-500 font-medium uppercase">Đã Thuộc</div>
            <div className="text-lg font-bold text-blue-700">{completedIds.length} / 20</div>
          </div>
          <div className="text-center px-3 border-r border-slate-200">
            <div className="text-[10px] text-slate-500 font-medium uppercase">Chuỗi Đúng</div>
            <div className="text-lg font-bold text-amber-600">{streak} 🔥</div>
          </div>
          <div className="text-center px-3">
            <div className="text-[10px] text-slate-500 font-medium uppercase">Tốc Độ</div>
            <div className="text-lg font-bold text-emerald-600">{wpm} WPM</div>
          </div>
        </div>
      </div>

      {/* Mode Switcher & Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        
        {/* Mode Switcher */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-lg text-xs font-semibold gap-1">
          <button
            onClick={() => setDrillMode("sentence")}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              drillMode === "sentence"
                ? "bg-white text-blue-700 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Gõ Cả Câu Mẫu</span>
          </button>
          <button
            onClick={() => setDrillMode("echo")}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              drillMode === "echo"
                ? "bg-white text-blue-700 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>2. Chỉ Gõ Cụm C1</span>
          </button>
          <button
            onClick={() => setDrillMode("cloze")}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              drillMode === "cloze"
                ? "bg-white text-blue-700 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>3. Điền Khuyết</span>
          </button>
          <button
            onClick={() => setDrillMode("flashcard")}
            className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
              drillMode === "flashcard"
                ? "bg-white text-indigo-700 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Flashcards (Thẻ Ghi Nhớ)</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg text-xs font-semibold border transition ${
              soundEnabled
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-slate-100 text-slate-400 border-slate-200"
            }`}
            title={soundEnabled ? "Tắt âm gõ phím" : "Bật âm gõ phím"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Current Input */}
          <button
            onClick={handleResetWord}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Gõ lại</span>
          </button>

          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
            >
              ← Quay lại
            </button>
          )}
        </div>

      </div>

      {/* FLASHCARD ARENA */}
      {drillMode === "flashcard" ? (
        <div className="space-y-5">
          {/* Flashcard Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShuffleDeck}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center space-x-1.5"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xáo trộn thẻ</span>
              </button>

              <button
                onClick={() => {
                  setFrontSide((prev) => (prev === "en" ? "vi" : "en"));
                  setIsFlipped(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center space-x-1.5"
              >
                <Repeat className="w-3.5 h-3.5 text-blue-600" />
                <span>Mặt trước: {frontSide === "en" ? "Tiếng Anh" : "Tiếng Việt"}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setFilterUnmastered((prev) => !prev);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  filterUnmastered
                    ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {filterUnmastered
                  ? `Đang lọc: Chưa thuộc (${20 - completedIds.length})`
                  : "Hiển thị tất cả (20)"}
              </button>
            </div>
          </div>

          {activeDeckIndices.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">
                Xuất sắc! Bạn đã thuộc toàn bộ 20 cụm từ C1!
              </h3>
              <p className="text-xs text-slate-500">
                Bỏ lọc để ôn tập lại tất cả các thẻ hoặc chuyển sang chế độ Luyện Gõ Câu Mẫu.
              </p>
              <button
                onClick={() => setFilterUnmastered(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 transition"
              >
                Xem lại tất cả 20 thẻ
              </button>
            </div>
          ) : (
            <>
              {/* 3D Flip Card */}
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className="cursor-pointer select-none"
                style={{ perspective: "1200px" }}
              >
                <div
                  className="relative w-full min-h-[340px] sm:min-h-[360px] transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-slate-200 shadow-md p-6 sm:p-10 flex flex-col justify-between"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-7 h-7 rounded-lg bg-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                          {currentItem.id}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                          {currentItem.category} • {currentItem.type}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {completedIds.includes(currentItem.id) && (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đã thuộc</span>
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-500">
                          Mặt trước
                        </span>
                      </div>
                    </div>

                    <div className="text-center space-y-4 my-auto py-4">
                      {frontSide === "en" ? (
                        <>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            {currentItem.phrase}
                          </h2>
                          <p className="text-sm sm:text-base font-mono text-slate-500">
                            {currentItem.ipa}
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePronounce(currentItem.phrase);
                              }}
                              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span>Nghe phát âm</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            {currentItem.meaningVi}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500">
                            Gợi ý từ B1/B2 thông thường:{" "}
                            <span className="font-semibold text-slate-700">{currentItem.b1b2Equivalent}</span>
                          </p>
                        </>
                      )}
                    </div>

                    <div className="text-center text-xs text-slate-400 font-medium">
                      👆 Nhấn vào thẻ hoặc bấm phím <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-600 font-mono">Space</kbd> để lật xem đáp án
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border-2 border-indigo-200 shadow-md p-6 sm:p-8 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                      <div>
                        <span className="text-lg sm:text-xl font-extrabold text-indigo-800">
                          {currentItem.phrase}
                        </span>
                        <span className="ml-2 text-xs font-mono text-slate-500">
                          {currentItem.ipa}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(currentItem.contextSentence);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 transition shadow-2xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe cả câu</span>
                      </button>
                    </div>

                    <div className="space-y-3 my-auto py-2 text-left">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Nghĩa Tiếng Việt & Nâng Cấp
                        </span>
                        <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                          {currentItem.meaningVi}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Thay thế cho (B1/B2):{" "}
                          <span className="line-through text-slate-400 mr-1.5">{currentItem.b1b2Equivalent}</span>
                          → <span className="font-bold text-indigo-700">{currentItem.phrase}</span>
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm text-slate-800">
                        <span className="font-bold text-indigo-700 block text-[11px] uppercase mb-1">
                          Câu mẫu thực tế (C1 Context):
                        </span>
                        <p className="font-serif italic text-slate-800 leading-relaxed">
                          "{currentItem.contextSentence}"
                        </p>
                      </div>

                      <div className="flex items-start space-x-2 text-xs text-slate-600">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p>
                          <b>Mẹo thi:</b> {currentItem.speakingTip}
                        </p>
                      </div>
                    </div>

                    <div className="text-center text-[11px] text-slate-400">
                      Nhấn lại vào thẻ để quay về mặt trước
                    </div>
                  </div>
                </div>
              </div>

              {/* Flashcard Self-Assessment & Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <button
                  onClick={handlePrevFlashcard}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Thẻ trước</span>
                </button>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => handleMarkFlashcard(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition flex items-center space-x-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cần ôn lại</span>
                  </button>
                  <button
                    onClick={() => handleMarkFlashcard(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã thuộc thẻ này</span>
                  </button>
                </div>

                <button
                  onClick={handleNextFlashcard}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center space-x-1"
                >
                  <span>Thẻ tiếp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
      /* Main Clean Typing Arena */
      <div 
        onClick={() => inputRef.current && inputRef.current.focus()}
        className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 relative cursor-text transition-all text-left"
      >
        
        {/* Word Info Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {currentIndex + 1}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {currentItem.category} • {currentItem.type}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentItem.ipa}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Cụm C1: <span className="text-blue-700 font-extrabold">{currentItem.phrase}</span> — {currentItem.meaningVi}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Pronunciation */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePronounce(); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center space-x-1"
              title="Nghe giọng đọc người bản xứ (Anh-Anh)"
            >
              <Volume2 className="w-4 h-4 text-blue-700" />
              <span>{drillMode === "sentence" ? "Nghe cả câu mẫu" : "Phát âm cụm từ"}</span>
            </button>

            {isCurrentCompleted && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã thuộc</span>
              </span>
            )}
          </div>
        </div>

        {/* CLOZE MODE: Sentence prompt */}
        {drillMode === "cloze" && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
            "{currentItem.sentenceTemplate}"
          </div>
        )}

        {/* Natural Typography Typing Area (No box around letters, normal font) */}
        <div className="py-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
            <span>
              {drillMode === "sentence" 
                ? "Gõ chính xác từng chữ của câu ví dụ dưới đây (chữ xanh = đúng, đỏ = sai):" 
                : drillMode === "echo" 
                  ? "Gõ đúng cụm từ C1 theo mẫu:" 
                  : "Điền cụm từ thích hợp vào chỗ trống:"}
            </span>
            <span>
              {userInput.length} / {targetText.length} ký tự ({progressPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-3">
            <div 
              className="bg-blue-600 h-full transition-all duration-150 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          {/* Normal typography display */}
          {renderNaturalText()}

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
            <div>
              Từ thông thường (B1/B2): <span className="font-medium text-slate-600 line-through mr-2">{currentItem.b1b2Equivalent}</span>
              → Nâng cấp lên C1: <span className="font-bold text-blue-700">{currentItem.phrase}</span>
            </div>
            {drillMode === "sentence" && (
              <span className="text-[11px] text-slate-400 italic">
                * Phần gạch chân là cụm từ C1 cốt lõi trong câu
              </span>
            )}
          </div>
        </div>

        {/* Typing Input Field */}
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder={
              drillMode === "sentence"
                ? `Bắt đầu gõ câu trên: "${targetText.slice(0, 25)}..."`
                : `Nhập cụm từ: "${targetText}"...`
            }
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-sans text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition shadow-inner"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>💡 Nhấn phím tự do • Hệ thống tự động kiểm tra và chuyển tiếp khi gõ xong câu</span>
            {mistakes > 0 && (
              <span className="text-rose-500 font-medium">Số lỗi: {mistakes}</span>
            )}
          </div>
        </div>

        {/* Context Sentence & Tip */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-left">
          <div className="flex items-start space-x-2">
            <span className="font-semibold text-slate-700 shrink-0">Dịch nghĩa câu mẫu:</span>
            <p className="text-slate-800 text-xs sm:text-sm">
              "{currentItem.meaningVi} trong ngữ cảnh bài thi."
            </p>
          </div>
          <div className="flex items-start space-x-2 pt-1 border-t border-slate-200 text-slate-600">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <b>Mẹo Speaking / Writing C1:</b> {currentItem.speakingTip}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Câu {currentIndex + 1} / {c1VocabList.length}
          </span>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(c1VocabList.length - 1, prev + 1))}
            disabled={currentIndex === c1VocabList.length - 1}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-40 transition flex items-center space-x-1"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
      )}

      {/* 20 Words Progress Palette */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm">
            Danh Sách 20 Câu Mẫu C1 ({completedIds.length}/20 Đã Thuộc)
          </h3>
          <button
            onClick={handleResetAllProgress}
            className="text-[11px] text-slate-400 hover:text-rose-600 font-medium"
          >
            Đặt lại tiến độ
          </button>
        </div>

        {/* Grid of 20 word buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {c1VocabList.map((item, idx) => {
            const isCompleted = completedIds.includes(item.id);
            const isCurrent = safeCurrentIdx === idx;

            let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
            if (isCompleted) {
              btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold";
            }
            if (isCurrent) {
              btnStyle += " ring-2 ring-blue-600 font-bold";
            }

            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-2 rounded-lg border text-left text-xs transition flex items-center justify-between truncate ${btnStyle}`}
              >
                <div className="truncate mr-1">
                  <span className="text-[10px] text-slate-400 mr-1">#{item.id}</span>
                  <span>{item.phrase}</span>
                </div>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
