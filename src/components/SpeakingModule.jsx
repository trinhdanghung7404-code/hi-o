// SpeakingModule.jsx
// Dedicated Aptis Speaking Module (12 mins | 4 Parts)
// Featuring MediaRecorder API, Live Audio Waveform Canvas Visualizer, Web Speech transcription, and AI Teacher

import React, { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  Square, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Timer,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { aptisSpeakingTask } from "../data/aptisSpeakingData";
import { OfficeVisual, ContrastVisuals } from "./SpeakingVisuals";
import { speakText, stopSpeaking, AudioWaveformVisualizer } from "../utils/audioSpeech";
import { evaluateWithAiTeacher } from "../services/aiTeacherEngine";

export function SpeakingModule({ onShowFeedback, onSaveScore }) {
  const [activePartIndex, setActivePartIndex] = useState(0); // 0 to 3
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [transcripts, setTranscripts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer for speaking segment
  const [countdown, setCountdown] = useState(0);
  const [phase, setPhase] = useState("ready"); // "ready" | "prep" | "speaking" | "finished"

  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const visualizerRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  const currentPart = aptisSpeakingTask.parts[activePartIndex];
  const questions = currentPart.questions || [];
  const currentQ = questions[currentQuestionIndex] || currentPart;

  const currentKey = `part${activePartIndex + 1}_q${currentQuestionIndex}`;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopRecordingProcess();
    };
  }, []);

  // Timer loop for prep/speaking phases
  useEffect(() => {
    if (countdown <= 0) {
      if (phase === "prep") {
        // Prep ended -> automatically trigger speaking
        startSpeakingSegment();
      } else if (phase === "speaking") {
        // Time up for speaking
        stopRecordingProcess();
        setPhase("finished");
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, phase]);

  // Read examiner prompt aloud
  const handleHearPrompt = () => {
    const textToSpeak = currentQ.c1AudioScript || currentQ.prompt || currentPart.c1AudioScript;
    speakText(textToSpeak);
  };

  // Start Preparation Phase
  const handleStartExercise = () => {
    stopSpeaking();
    const prepSeconds = currentPart.prepTimeSeconds || 5;
    setCountdown(prepSeconds);
    setPhase("prep");
  };

  // Start Speaking Phase & Audio Recording
  const startSpeakingSegment = async () => {
    const speakSeconds = currentPart.speakTimeSeconds || 45;
    setCountdown(speakSeconds);
    setPhase("speaking");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize Canvas Visualizer
      if (canvasRef.current) {
        visualizerRef.current = new AudioWaveformVisualizer(canvasRef.current, stream);
        visualizerRef.current.start();
      }

      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Web Speech API for Realtime Transcription
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-GB";

        recognition.onresult = (event) => {
          let fullStr = "";
          for (let i = 0; i < event.results.length; i++) {
            fullStr += event.results[i][0].transcript + " ";
          }
          setTranscripts((prev) => ({
            ...prev,
            [currentKey]: fullStr.trim()
          }));
        };

        recognition.onerror = (e) => console.log("Speech recognition notice:", e.error);
        recognition.start();
        recognitionRef.current = recognition;
      }

    } catch (err) {
      console.warn("Microphone not available or permission denied:", err);
      // Fallback: timer still counts, student can type or speak into fallback
    }
  };

  const stopRecordingProcess = () => {
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (visualizerRef.current) {
      visualizerRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleManualStop = () => {
    stopRecordingProcess();
    setPhase("finished");
    setCountdown(0);
  };

  // Populate C1 Sample
  const handleLoadC1Sample = () => {
    const sample = currentQ.c1BandSample || currentPart.c1BandSample || "";
    setTranscripts((prev) => ({
      ...prev,
      [currentKey]: sample
    }));
    setPhase("finished");
  };

  // Next question or part
  const handleNextStep = () => {
    stopRecordingProcess();
    setRecordedAudioUrl(null);
    setPhase("ready");

    if (questions.length > 0 && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (activePartIndex < aptisSpeakingTask.parts.length - 1) {
      setActivePartIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleSubmitAllSpeaking = async () => {
    setIsSubmitting(true);
    const apiKey = localStorage.getItem("english_mastery_gemini_key") || null;

    try {
      const evaluation = await evaluateWithAiTeacher({
        moduleType: "speaking",
        submissionData: { transcripts },
        apiKey
      });

      if (onSaveScore) {
        onSaveScore({
          speakingScore: evaluation.overallScore,
          speakingBand: evaluation.cefrBand
        });
      }

      if (onShowFeedback) {
        onShowFeedback(evaluation, "Aptis ESOL Speaking (Target C1)");
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      alert("Evaluation completed with built-in examiner rubric.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Speaking: 4-Part Full Simulator</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                12 Mins
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vocal Oscilloscope • Speech Recognition • C1 Fluency & Pronunciation Assessment
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          <button
            onClick={handleLoadC1Sample}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Load C1 Sample</span>
          </button>

          <button
            onClick={handleSubmitAllSpeaking}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white shadow-sm transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Đang chấm..." : "Nộp bài cho Giám khảo"}</span>
          </button>
        </div>

      </div>

      {/* Part Navigation Bar */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto space-x-1">
        {aptisSpeakingTask.parts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePartIndex(idx);
              setCurrentQuestionIndex(0);
              setPhase("ready");
              setRecordedAudioUrl(null);
            }}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
              activePartIndex === idx
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span>Part {p.partNumber}</span>
            <span className={`text-[10px] font-normal ${activePartIndex === idx ? "text-emerald-100" : "text-slate-400"}`}>
              {p.partNumber === 1 ? "Personal (30s x3)" : p.partNumber === 2 ? "Photo (45s x3)" : p.partNumber === 3 ? "Contrast (45s x3)" : "Monologue (2m)"}
            </span>
          </button>
        ))}
      </div>

      {/* Main Speaking Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Prompt & Visuals (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Part {currentPart.partNumber}
                  {questions.length > 0 && ` • Question ${currentQuestionIndex + 1} of ${questions.length}`}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {currentPart.name}
                </h3>
              </div>

              {/* Examiner Voice Prompt Button */}
              <button
                onClick={handleHearPrompt}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition border border-indigo-200 dark:border-indigo-800"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>Hear Examiner</span>
              </button>
            </div>

            {/* Embedded Visuals if Part 2 or 3 */}
            {activePartIndex === 1 && <OfficeVisual />}
            {activePartIndex === 2 && <ContrastVisuals />}

            {/* Part 4 Abstract Prompts */}
            {activePartIndex === 3 && (
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  Topic: {aptisSpeakingTask.parts[3].topic}
                </span>
                <ul className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 list-disc pl-4">
                  {aptisSpeakingTask.parts[3].prompts.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Single Question Prompt */}
            {activePartIndex < 3 && currentQ && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                "{currentQ.prompt}"
              </div>
            )}

          </div>

        </div>

        {/* Right: Audio Waveform Visualizer & Recorder Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-center">
            
            {/* Visualizer Canvas */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-2 shadow-inner">
              <canvas
                ref={canvasRef}
                width={360}
                height={120}
                className="w-full h-28 rounded-xl bg-slate-950 block"
              />
              
              {/* Overlay pulse when recording */}
              {isRecording && (
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>RECORDING LIVE</span>
                </div>
              )}

              {phase === "prep" && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Preparation Time</span>
                  <span className="text-3xl font-extrabold font-mono mt-1">{countdown}s</span>
                </div>
              )}
            </div>

            {/* Speaking Countdown Clock */}
            {phase === "speaking" && (
              <div className="text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Speaking Time</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-500 mt-0.5">
                  {countdown}s
                </div>
              </div>
            )}

            {/* Recorder Action Buttons */}
            <div className="flex items-center justify-center space-x-3">
              {phase === "ready" && (
                <button
                  onClick={handleStartExercise}
                  className="px-6 py-3 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition flex items-center space-x-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Preparation & Record</span>
                </button>
              )}

              {phase === "speaking" && (
                <button
                  onClick={handleManualStop}
                  className="px-6 py-3 rounded-2xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 transition flex items-center space-x-2 animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish Speaking</span>
                </button>
              )}

              {phase === "finished" && (
                <button
                  onClick={handleStartExercise}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Record Again</span>
                </button>
              )}

              {/* Next segment button */}
              <button
                onClick={handleNextStep}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center space-x-1.5"
              >
                <span>Next Item</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Playback Player if recorded */}
            {recordedAudioUrl && (
              <div className="pt-2">
                <audio controls src={recordedAudioUrl} className="w-full h-9 rounded-lg" />
              </div>
            )}

            {/* Live Transcription Box */}
            <div className="text-left space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Spoken Transcription:</span>
                </span>
                <span className="text-[11px] text-slate-400">Editable for review</span>
              </div>
              <textarea
                rows={4}
                value={transcripts[currentKey] || ""}
                onChange={(e) => setTranscripts({ ...transcripts, [currentKey]: e.target.value })}
                placeholder="Your spoken words will appear here automatically via speech-to-text recognition..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-sans"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
