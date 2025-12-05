import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tamilNaduData } from "./tamilNaduData";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    taluk: "",
    mobile: "",
    email: "",
    aadhaar: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    dob: "",
    enteredCaptcha: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [taluks, setTaluks] = useState([]);

  const [captcha, setCaptcha] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", type: "info" });

  const today = new Date();
  const minDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  // EMAIL OTP STATES
  const [emailOtp, setEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // ---------------- CAPTCHA ----------------
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(text);

    const canvas = document.getElementById("captchaCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#E8FFF1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Georgia";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const rotation = Math.random() * 0.6 - 0.3;
      ctx.translate(25 + i * 25, 25);
      ctx.rotate(rotation);
      ctx.fillStyle = `rgb(${Math.random()*100},${Math.random()*40},${Math.random()*50})`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const showToast = (msg, type = "info") =>
    setSnack({ open: true, message: msg, type });

  const handleChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

  const handleDistrictChange = (d) => {
    setSelectedDistrict(d);
    setTaluks(tamilNaduData[d] || []);
    handleChange("district", d);
  };

  // ---------------- SEND OTP ----------------
  const sendEmailOtp = async () => {
    if (!formData.email.includes("@"))
      return showToast("⚠ Enter valid email / சரியான மின்னஞ்சலை உள்ளிடவும்", "error");

    try {
      await axios.get(`http://localhost:8080/api/otp/send?email=${formData.email}`);
      showToast("📩 OTP sent to Email / OTP மின்னஞ்சலுக்கு அனுப்பப்பட்டது", "success");
    } catch {
      showToast("❌ Failed to send OTP! / OTP அனுப்புதல் தோல்வியடைந்தது", "error");
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyEmailOtp = async () => {
    if (!emailOtp) return showToast("⚠ Enter OTP / OTP ஐ உள்ளிடவும்", "warning");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/otp/verify",
        { email: formData.email, otp: Number(emailOtp) }
      );

      if (response.data === true) {
        setEmailVerified(true);
        showToast("✔ Email Verified! / மின்னஞ்சல் சரிபார்க்கப்பட்டது", "success");
      } else {
        showToast("❌ Wrong OTP / தவறான OTP", "error");
      }
    } catch {
      showToast("⚠ Verification Failed / சரிபார்ப்பு தோல்வி", "error");
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!emailVerified) return showToast("⚠ Verify Email OTP First / OTP ஐ முதலில் சரிபார்க்கவும்", "warning");

    if (!/^\d{12}$/.test(formData.aadhaar))
      return showToast("⚠ Aadhaar must be 12 digits / ஆதார் 12 இலக்கமாக இருக்க வேண்டும்", "error");

    if (formData.password !== formData.confirmPassword)
      return showToast("⚠ Password mismatch / கடவுச்சொற்கள் பொருந்தவில்லை", "error");

    if (formData.enteredCaptcha !== captcha) {
      generateCaptcha();
      return showToast("❌ Invalid Captcha / தவறான படத்தொகுப்பு குறியீடு", "error");
    }

    try {
      await axios.post("http://localhost:8080/register", formData);
      showToast("🎉 Registration Successful! / பதிவு வெற்றிகரமாக முடிந்தது", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      showToast("❌ Registration Failed / பதிவு தோல்வி", "error");
    }
  };

  return (
    <Box sx={{ background: "#F3FFF6", minHeight: "100vh", pb: 6 }}>

      {/* HEADER */}
      <Box sx={{ background: "#015C3A", color: "white", py: 2, textAlign: "center" }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Tamil Nadu e-Governance Agency / தமிழ்நாடு மின்தகவல் முகமை
        </Typography>
        <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
          e-Sevai | இ-சேவை
        </Typography>
      </Box>

      {/* CARD BOX */}
      <Paper sx={{
        width: 850,
        mx: "auto",
        mt: 5,
        p: 5,
        borderRadius: 4,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        border: "2px solid #D9FFE6",
      }}>

        <Typography textAlign="center" sx={{ fontSize: 22, fontWeight: 700, color: "#024A2A" }}>
          User Registration / பயனர் பதிவு
        </Typography>

        {/* FORM GRID */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, mt: 4 }}>

          <TextField label="Full Name / முழுபெயர் *" onChange={(e) => handleChange("name", e.target.value)} />
          <TextField label="Mobile Number / மொபைல் எண் *" onChange={(e) => handleChange("mobile", e.target.value)} />

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField fullWidth label="Email / மின்னஞ்சல் *" onChange={(e) => handleChange("email", e.target.value)} />
            <Button sx={{ background: "#0B8A42", color: "white" }} onClick={sendEmailOtp}>SEND</Button>
          </Box>

          {!emailVerified && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField fullWidth placeholder="Enter Email OTP / OTP ஐ உள்ளிடவும்" onChange={(e) => setEmailOtp(e.target.value)} />
              <Button sx={{ background: "#0B8A42", color: "white" }} onClick={verifyEmailOtp}>VERIFY</Button>
            </Box>
          )}

          <TextField
            label="District / மாவட்டம் *"
            select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
          >
            {Object.keys(tamilNaduData).map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Taluk / வட்டம் *"
            value={formData.taluk}
            disabled={!taluks.length}
            onChange={(e) => handleChange("taluk", e.target.value)}
          >
            {taluks.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>

          <TextField label="Aadhaar Number / ஆதார் எண் *" onChange={(e) => handleChange("aadhaar", e.target.value)} />
          <TextField label="Login ID / உள்நுழைவு ID *" onChange={(e) => handleChange("loginId", e.target.value)} />
          <TextField type="password" label="Password / கடவுச்சொல் *" onChange={(e) => handleChange("password", e.target.value)} />
          <TextField type="password" label="Confirm Password / கடவுச்சொல் உறுதி *" onChange={(e) => handleChange("confirmPassword", e.target.value)} />

          <TextField
            type="date"
            label="DOB / பிறந்த தேதி *"
            inputProps={{ max: minDOB }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </Box>

        {/* CAPTCHA */}
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <canvas id="captchaCanvas" width={160} height={50} style={{ border: "2px solid #0B8A2A" }} />
          <IconButton onClick={generateCaptcha}><RefreshIcon /></IconButton>
          <TextField fullWidth label="Enter Captcha / எழுத்துகளை உள்ளிடவும்" onChange={(e) => handleChange("enteredCaptcha", e.target.value)} />
        </Box>

        {/* SUBMIT */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button disabled={!emailVerified} sx={{ background: "#0B8A42", color: "white", width: 200 }} onClick={handleSubmit}>
            SIGN UP / பதிவு செய்க
          </Button>
        </Box>

      </Paper>

      {/* SNACKBAR */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.type}>{snack.message}</Alert>
      </Snackbar>

    </Box>
  );
}
