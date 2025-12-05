import { useState, useEffect } from "react";
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  Paper, Divider, TextField, Button, Snackbar, Alert, IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import jsPDF from "jspdf";
import { Link, useLocation } from "react-router-dom";

export default function HelpPage() {

  const location = useLocation();

  const [search, setSearch] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [lang, setLang] = useState("en-IN");
  const [voices, setVoices] = useState([]);

  const [snack, setSnack] = useState({ open: false, message: "", type: "success" });

  // FAQ Tamil + English
  const faqs = [
    {
      q: "How to register? | பதிவு செய்வது எப்படி?",
      a: "Click 'New User Sign Up' and verify OTP. | 'New User Sign Up' ஐ கிளிக் செய்து OTP ஐ சரிபார்க்கவும்."
    },
    {
      q: "Forgot password? | கடவுச்சொல் மறந்துவிட்டதா?",
      a: "Recover using registered mobile. | பதிவு செய்யப்பட்ட மொபைல் எண்ணை பயன்படுத்தி மீட்டெடுக்கலாம்."
    },
    {
      q: "How to apply? | விண்ணப்பிப்பது எப்படி?",
      a: "Select certificate → fill details → submit. | சான்றிதழை தேர்ந்தெடுத்து → விவரங்களை நிரப்பி → சமர்ப்பிக்கவும்."
    },
    {
      q: "Track status? | நிலையை எப்படி பார்க்கலாம்?",
      a: "Dashboard → Application Status. | Dashboard → Application Status மூலம் சரிபார்க்கலாம்."
    },
    {
      q: "Support? | உதவி?",
      a: "Call 1800-425-6000 or email support. | 1800-425-6000 க்கு அழைக்கவும் அல்லது மின்னஞ்சல் அனுப்பவும்."
    },
  ];

  const filteredFaqs = faqs.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Speak function
  const speak = (text) => {
    if (!voiceEnabled) return;

    const msg = new SpeechSynthesisUtterance(text.replace("|", ","));
    const tamilVoice = voices.find(v =>
      v.lang.toLowerCase().includes("ta") || v.name.toLowerCase().includes("tamil")
    );

    msg.voice = tamilVoice ?? voices[0];
    msg.lang = tamilVoice ? tamilVoice.lang : "en-IN";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  // PDF Download
  const downloadManual = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.text("Tamil Nadu e-Sevai User Manual - Help Guide", 10, 15);

    pdf.setFont("helvetica", "normal");
    let y = 35;
    faqs.forEach(f => {
      pdf.text(`• ${f.q}`, 10, y);
      y += 8;
      pdf.text(`   → ${f.a}`, 10, y);
      y += 12;
    });

    pdf.save("eSevai_Help_Guide.pdf");

    setSnack({ open: true, message: "📄 User Manual Downloaded!", type: "success" });
  };

  // Nav Items bilingual
  const navItems = [
    { name: "Home / முகப்பு", path: "/" },
    { name: "About Us / எங்களை பற்றி", path: "/about" },
    { name: "e-Sevai / இ-சேவை", path: "/esevai" },
    { name: "Services Offered / வழங்கப்படும் சேவைகள்", path: "/services" },
    { name: "Help / உதவி", path: "/help" },
    { name: "Contact / தொடர்புக்கு", path: "/contact" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F3FFF6",
        margin: -1,
        pb: 6,
        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "430px",
          height: "430px",
          background: `url("/tnlogo.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
        }
      }}
    >

      {/* HEADER */}
      <Box sx={{ textAlign: "center", background: "#015C3A", color: "white", py: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          Directorate of e-Governance / மின்தகவல் ஆணையகம்
        </Typography>
        <Typography variant="h5" fontWeight={900}>
        Tamil Nadu e-Governance Agency / தமிழ்நாடு மின்தகவல் முகமை
        </Typography>
        <Typography sx={{ fontSize: 13 }}>
          Information Technology & Digital Services Department /
          தகவல் தொழில்நுட்ப மற்றும் டிஜிட்டல் சேவைத் துறை
        </Typography>
      </Box>

      {/* NAVBAR */}
      <Box
        sx={{
          background: "#024A2A",
          display: "flex",
          justifyContent: "center",
          gap: 3,
          p: 1,
          boxShadow: "0px 3px 8px rgba(0,0,0,0.2)"
        }}
      >
        {navItems.map(item => (
          <Button
            key={item.name}
            component={Link}
            to={item.path}
            sx={{
              color: "white",
              fontWeight: location.pathname === item.path ? 900 : 500,
              fontSize: 15,
              borderBottom:
                location.pathname === item.path ? "3px solid #F9FF87" : "none",
              borderRadius: 0,
              "&:hover": { color: "#F9FF87" }
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      {/* MAIN CONTENT */}
      <Paper
        sx={{
          maxWidth: 850,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 3,
          border: "2px solid #D9FFE6",
          background: "#FFFFFF",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
        }}
      >

        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          color="#0B8A42"
        >
          🛠 Help & User Support / உதவி & பயனர் வழிகாட்டி
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* SEARCH + ICONS */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            label="🔍 Search / தேடு..."
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* PDF BUTTON */}
          <IconButton onClick={downloadManual}>
            <PictureAsPdfIcon sx={{ fontSize: 28, color: "#b40000" }} />
          </IconButton>

          {/* VOICE BUTTON */}
          <IconButton onClick={() => setVoiceEnabled(!voiceEnabled)}>
            {voiceEnabled
              ? <VolumeOffIcon sx={{ fontSize: 28, color: "crimson" }} />
              : <KeyboardVoiceIcon sx={{ fontSize: 28, color: "#0B8A42" }} />}
          </IconButton>

          {/* LANGUAGE SWITCH */}
          <Button
            variant="outlined"
            onClick={() => setLang(lang === "en-IN" ? "ta-IN" : "en-IN")}
            sx={{ borderColor: "#0B8A42", color: "#0B8A42" }}
          >
            {lang === "en-IN" ? "Tamil 🇮🇳" : "English 🇬🇧"}
          </Button>
        </Box>

        {/* FAQ ACCORDIONS */}
        {filteredFaqs.map((item, i) => (
          <Accordion
            key={i}
            sx={{
              background: "#E8FFF1",
              border: "1px solid #CFFFE0",
              borderRadius: 2,
              mb: 1
            }}
            onClick={() => speak(item.q + " " + item.a)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600} color="#024A2A">
                {item.q}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography color="#024A2A">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" sx={{ fontSize: 16, color: "#024A2A" }}>
          📧 support: tnesevaihelpdesk@tn.gov.in |
          ☎ 1800-425-6000 |
          🕒 Mon–Sat | 9AM – 6PM  
          <br />
          💚 எங்களை தொடர்பு கொள்ளுங்கள் — எப்போதும் உதவ தயாராக இருக்கிறோம்.
        </Typography>
      </Paper>

      {/* FOOTER */}
      <Box
        sx={{
          background: "#014122",
          color: "white",
          p: 3,
          textAlign: "center",
          mt: 4,
          fontWeight: 600
        }}
      >
        © Tamil Nadu e-Governance Agency — Citizen Service Portal  
        <br />
        © தமிழ்நாடு மின்தகவல் முகமை — குடிமக்கள் சேவை தளம்
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}
