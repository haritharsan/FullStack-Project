import { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Paper,
  Typography,
  Chip
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatBot() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Vanakkam! எப்படி உதவலாம்?" }
  ]);
  const [input, setInput] = useState("");

  const chatRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Removed auto greeting — now this stays empty
  useEffect(() => {}, []);

  // Auto scroll to bottom when new message appears
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Text-to-speech
  const botSpeak = (text) => {
    if ("speechSynthesis" in window) {
      const speak = new SpeechSynthesisUtterance(text);
      speak.lang = "ta-IN";
      window.speechSynthesis.speak(speak);
    }
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { from: "bot", text }]);
    botSpeak(text);
  };

  // Voice Recognition
  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Voice not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ta-IN";
    recognition.start();

    recognition.onresult = (e) => {
      const speechText = e.results[0][0].transcript;
      sendMessage(speechText);
    };
  };

  // Knowledge Base (Improved)
  const knowledgeBase = [
    {
      id: 1,
      keywords: ["community", "caste", "certificate", "samuga", "ஜாதி", "apply", "epdi"],
      answer:
        "🪪 Community Certificate apply செய்ய Aadhaar, Ration Card + Birth Certificate தேவை. 👉 Services → Certificates → Community Certificate."
    },
    {
      id: 2,
      keywords: ["income", "varumanam", "salary"],
      answer: "💰 Income Certificate செய்ய VAO Verification + Salary Proof தேவை."
    },
    {
      id: 3,
      keywords: ["nativity", "native", "உறவுநிலை", "tc"],
      answer: "📌 Nativity Certificate செய்ய Birth Certificate அல்லது School TC போதும்."
    },
    {
      id: 4,
      keywords: ["track", "status", "application"],
      answer: "⏳ Application status check 👉 e-Sevai dashboard → Track Application."
    },
    {
      id: 5,
      keywords: ["nearest", "center", "location", "near", "எங்க", "எங்கே"],
      answer: "📍 உங்களுக்கு அருகிலுள்ள e-Sevai Center கண்டுபிடிக்க Google Maps ல 'e-Sevai center near me' என type பண்ணுங்க. GPS On இருக்கணும்."
    },
    {
      id: 6,
      keywords: ["support", "help", "contact", "phone"],
      answer: "☎ Support: 1800-425-6000 | 📧 tnesevaihelpdesk@tn.gov.in"
    },
    {
      id: 7,
      keywords: ["first graduate", "fg", "முதலாம் பட்டதாரி"],
      answer: "🎓 First Graduate Certificate apply செய்ய Parent Education Proof + Ration Card தேவை."
    },
    {
      id: 8,
      keywords: ["password", "forgot", "reset"],
      answer: "🔑 Password மறந்தால் Login page → 'Forgot Password' click பண்ணுங்க."
    },
    {
      id: 9,
      keywords: ["ration", "smart card", "card update", "சமர்க்கார்டு"],
      answer: "🛍 Smart Ration Card update செய்ய அருகிலுள்ள e-Sevai center சென்று விண்ணப்பிக்கலாம்."
    },
    {
      id: 10,
      keywords: ["bye", "nandri", "thanks"],
      answer: "😊 நன்றி! உங்களுக்கு எப்போ வேண்டுமானாலும் நான் இருக்கேன்."
    }
  ];

  // AI Process
  const aiReplies = async (text) => {
    return new Promise((resolve) => {
      let cleanText = text.toLowerCase().trim();

      // Tamil → English assist mapping
      const tamilMapper = [
        { word: "சமூக", map: "community" },
        { word: "ஜாதி", map: "community" },
        { word: "சான்று", map: "certificate" },
        { word: "வருமானம்", map: "income" },
        { word: "உறவுநிலை", map: "nativity" },
        { word: "எப்படி", map: "apply" }
      ];

      tamilMapper.forEach(item => {
        if (cleanText.includes(item.word)) cleanText += ` ${item.map}`;
      });

      let bestMatch = null, bestScore = 0;

      knowledgeBase.forEach(item => {
        let score = 0;
        item.keywords.forEach(keyword => {
          const partial = keyword.slice(0, Math.ceil(keyword.length * 0.5));
          if (cleanText.includes(partial)) score++;
        });

        if (score > bestScore) {
          bestScore = score;
          bestMatch = item;
        }
      });

      if (bestMatch && bestScore > 0) resolve(bestMatch.answer);
      else resolve("🤖 இதை இன்னும் train பண்ணிக்கிட்டு இருக்கேன்... வேற கேள்வி கேளுங்க!");
    });
  };

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");

    const botReply = await aiReplies(text);
    setTimeout(() => addBotMessage(botReply), 400);
  };

  const quickReplies = [
    { label: "📄 Apply Certificate", action: "apply certificate" },
    { label: "📍 Nearest Center", action: "nearest" },
    { label: "⏳ Track Status", action: "track" },
    { label: "☎ Support", action: "support" }
  ];

  return (
    <>
      {open && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 460,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0px 6px 25px rgba(0,0,0,0.4)",
            zIndex: 9999
          }}
        >
          <Box sx={{ background: "#0059c9", p: 2, color: "white", display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight="bold">🤖 TNeGA Assistant</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Box */}
          <Box ref={chatRef} sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {messages.map((msg, i) => (
              <Typography
                key={i}
                sx={{
                  padding: "10px",
                  borderRadius: 2,
                  mb: 1,
                  maxWidth: "85%",
                  display: "inline-block",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  ...(msg.from === "user"
                    ? { background: "#b2ffcb", marginLeft: "auto", textAlign: "right" }
                    : { background: "#e3e9ff", marginRight: "auto", textAlign: "left" })
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          {/* Quick Buttons */}
          <Box sx={{ p: 1, gap: 1, display: "flex", flexWrap: "wrap" }}>
            {quickReplies.map((btn, index) => (
              <Chip key={index} size="small" label={btn.label} onClick={() => sendMessage(btn.action)} />
            ))}
          </Box>

          {/* Input Bar */}
          <Box sx={{ display: "flex", p: 1, gap: 1 }}>
            <IconButton onClick={startVoiceRecognition}>🎤</IconButton>
            <TextField fullWidth placeholder="Type here..." value={input} onChange={(e) => setInput(e.target.value)} />
            <Button variant="contained" onClick={() => sendMessage()}>
              Send
            </Button>
          </Box>
        </Paper>
      )}

      {/* Floating Button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#0052cc",
          color: "white",
          width: 60,
          height: 60,
          borderRadius: "50%",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
          zIndex: 9999
        }}
      >
        <ChatIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </>
  );
}
