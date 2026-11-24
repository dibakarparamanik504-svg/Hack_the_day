
import { useState, useRef } from "react";
import "./voiceAssistant.css";

const languages = [
  { label: "English", value: "en-US" },
  { label: "বাংলা", value: "bn-IN" },
  { label: "हिन्दी", value: "hi-IN" },
];

const commands = [
  "Repeat this cooking step",
  "What should I do next?",
  "How much salt should I add?",
  "Explain this step in Bengali",
];

function VoiceAssistant() {
  const [language, setLanguage] = useState("en-US");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "Now mix the leftover rice, mashed potato and chopped vegetables. Add spices and combine everything until the mixture holds together."
  );
  const [status, setStatus] = useState("Ready to listen");

  const recognitionRef = useRef(null);

  // Start voice recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setStatus("Listening... Speak now");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setTranscript(text);
      setStatus("Voice captured");

      // Demo response until Gemini API is connected
      generateDemoResponse(text);
    };

    recognition.onerror = (event) => {
      setStatus("Voice error: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Stop voice recognition
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setStatus("Microphone stopped");
  };

  // Demo AI response
  const generateDemoResponse = (question) => {
    const q = question.toLowerCase();

    let response =
      "Continue mixing your ingredients until the mixture holds together. You can ask me to repeat any cooking instruction.";

    if (q.includes("next")) {
      response =
        "Your next step is shaping. Take small portions of the mixture and shape them into round or oval cutlets.";
    } else if (q.includes("salt")) {
      response =
        "Start with a small amount of salt, mix well and taste the mixture before adding more.";
    } else if (q.includes("repeat")) {
      response =
        "Combine leftover rice, mashed potato, chopped vegetables, breadcrumbs and spices. Mix until the texture holds together.";
    } else if (q.includes("bengali") || q.includes("বাংলা")) {
      response =
        "এবার অবশিষ্ট ভাত, সেদ্ধ আলু, কুচি করা সবজি এবং মশলা একসঙ্গে ভালোভাবে মিশিয়ে নিন। মিশ্রণটি শক্ত ও একসঙ্গে ধরে রাখার মতো হতে হবে।";
    }

    setAiResponse(response);
    setStatus("AI response ready");
  };

  // Example command click
  const selectCommand = (command) => {
    setTranscript(command);
    generateDemoResponse(command);
  };

  // Text to speech
  const speakResponse = () => {
    if (!("speechSynthesis" in window)) {
      setStatus("Speech output is not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(aiResponse);
    speech.lang = language;
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
  };

  return (
    <div className="va-page">

      {/* Header */}
      <header className="va-header">
        <div className="va-brand">
          <span className="va-logo">🌿</span>
          <div>
            <h2>ZERO-WASTE KITCHEN AI</h2>
            <p>Smart Cooking Assistant</p>
          </div>
        </div>

        <span className="va-mode-badge">
          <span className="va-green-dot"></span>
          Voice Mode
        </span>
      </header>

      {/* Page Heading */}
      <section className="va-title">
        <span className="va-eyebrow">HANDS-FREE COOKING EXPERIENCE</span>
        <h1>AI Voice Assistant</h1>
        <p>
          Talk to your AI cooking assistant while preparing a recipe.
        </p>
      </section>

      {/* Current Cooking Session */}
      <section className="va-card va-session-card">
        <div className="va-section-heading">
          <div>
            <span className="va-small-label">CURRENT COOKING SESSION</span>
            <h2>Leftover Rice Vegetable Cutlet</h2>
          </div>
          <span className="va-food-icon">🍽️</span>
        </div>

        <div className="va-current-step">
          <span>Current step</span>
          <strong>STEP 02 — MIXING</strong>
        </div>
      </section>

      {/* Main Voice Section */}
      <section className="va-card va-voice-card">
        <span className="va-small-label">VOICE INTERACTION</span>

        <h2>Speak to your assistant</h2>
        <p className="va-voice-description">
          Press the microphone to start a voice interaction.
        </p>

        <div className={`va-mic-wrapper ${listening ? "active" : ""}`}>
          <div className="va-mic-ring">
            <button
              className="va-mic-button"
              onClick={listening ? stopListening : startListening}
              aria-label={listening ? "Stop microphone" : "Start microphone"}
            >
              {listening ? "■" : "🎙️"}
            </button>
          </div>
        </div>

        <div className="va-listening-status">
          <span className={`va-status-dot ${listening ? "listening" : ""}`}></span>
          <strong>{status}</strong>
        </div>

        <p className="va-mic-hint">
          {listening
            ? "Listening to your voice..."
            : "Tap the microphone to speak"}
        </p>

        <div className="va-voice-note">
          <span>ℹ️</span>
          Voice recognition uses your browser's speech recognition API.
        </div>
      </section>

      {/* Example Commands */}
      <section className="va-card">
        <div className="va-section-heading">
          <div>
            <span className="va-small-label">TRY THESE COMMANDS</span>
            <h2>Example Voice Commands</h2>
          </div>
          <span className="va-command-icon">💬</span>
        </div>

        <div className="va-command-list">
          {commands.map((command, index) => (
            <button
              key={index}
              className="va-command"
              onClick={() => selectCommand(command)}
            >
              <span>🎤</span>
              {command}
              <span className="va-command-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Conversation */}
      <section className="va-card va-conversation-card">
        <div className="va-section-heading">
          <div>
            <span className="va-small-label">VOICE CHAT</span>
            <h2>Conversation</h2>
          </div>
          <span className="va-chat-status">Active Session</span>
        </div>

        <div className="va-chat-message va-user-message">
          <div className="va-avatar va-user-avatar">👤</div>
          <div className="va-message-content">
            <strong>You</strong>
            <p>
              {transcript
                ? `"${transcript}"`
                : '"What should I do next?"'}
            </p>
          </div>
        </div>

        <div className="va-chat-message va-ai-message">
          <div className="va-avatar va-ai-avatar">✨</div>
          <div className="va-message-content">
            <strong>AI Assistant</strong>
            <p>{aiResponse}</p>

            <div className="va-response-controls">
              <button onClick={speakResponse}>
                🔊 Listen to response
              </button>
              <button onClick={stopSpeaking}>
                ■ Stop audio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="va-card va-language-card">
        <div>
          <span className="va-small-label">PERSONALIZATION</span>
          <h2>Language Selection</h2>
          <p>Choose your preferred assistant language.</p>
        </div>

        <div className="va-language-options">
          {languages.map((item) => (
            <button
              key={item.value}
              className={`va-language-option ${
                language === item.value ? "selected" : ""
              }`}
              onClick={() => setLanguage(item.value)}
            >
              {item.label}
              {language === item.value && <span>✓</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="va-footer">
        <div>
          <span className="va-green-dot"></span>
          <strong>Voice Assistant Ready</strong>
        </div>
        <p>
          UI preview. Gemini AI integration through Django API is pending.
        </p>
      </footer>

    </div>
  );
}

export default VoiceAssistant;
