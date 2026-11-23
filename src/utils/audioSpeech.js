// audioSpeech.js
// Speech synthesis for British Council examiner prompts, audio tones, and MediaRecorder waveform visualizer

let currentUtterance = null;

export function playExamChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    console.log("Audio chime error:", e);
  }
}

export function speakText(text, options = {}) {
  if (!("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported in this environment");
    if (options.onEnd) options.onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Attempt to select a British English voice
  const voices = window.speechSynthesis.getVoices();
  const gbVoice = voices.find(v => v.lang === "en-GB" || v.name.includes("United Kingdom") || v.name.includes("British")) 
               || voices.find(v => v.lang.startsWith("en")) 
               || null;

  if (gbVoice) {
    utterance.voice = gbVoice;
  }

  utterance.rate = options.rate || 0.95; // Steady examiner pace
  utterance.pitch = options.pitch || 1.0;

  utterance.onend = () => {
    currentUtterance = null;
    if (options.onEnd) options.onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis error", e);
    currentUtterance = null;
    if (options.onEnd) options.onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

// Live Canvas Audio Waveform Visualizer
export class AudioWaveformVisualizer {
  constructor(canvasElement, stream) {
    this.canvas = canvasElement;
    this.canvasCtx = canvasElement.getContext("2d");
    this.stream = stream;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.animationId = null;
    this.isDestroyed = false;
  }

  start() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.source = this.audioCtx.createMediaStreamSource(this.stream);
      this.source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (this.isDestroyed) return;
        this.animationId = requestAnimationFrame(draw);

        this.analyser.getByteTimeDomainData(dataArray);

        const width = this.canvas.width;
        const height = this.canvas.height;

        this.canvasCtx.fillStyle = "rgba(15, 23, 42, 0.2)";
        this.canvasCtx.fillRect(0, 0, width, height);

        this.canvasCtx.lineWidth = 2.5;
        this.canvasCtx.strokeStyle = "#10b981"; // Emerald accent
        this.canvasCtx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            this.canvasCtx.moveTo(x, y);
          } else {
            this.canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        this.canvasCtx.lineTo(width, height / 2);
        this.canvasCtx.stroke();
      };

      draw();
    } catch (err) {
      console.warn("Waveform visualizer init error:", err);
    }
  }

  stop() {
    this.isDestroyed = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      this.audioCtx.close();
    }
  }
}
