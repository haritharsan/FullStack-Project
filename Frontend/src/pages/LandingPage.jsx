import { useState } from "react";

import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // ---------------- CAPTCHA ----------------
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const refreshCaptcha = () => setCaptcha(generateCaptcha());

  // ---------------- SNACKBAR ----------------
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // ---------------- SEND LOGIN OTP ----------------
  const sendOtp = async () => {
    if (!loginData.email.includes("@")) {
      return setSnack({ open: true, message: "⚠ Enter valid Email ID / சரியான மின்னஞ்சலை உள்ளிடவும்", type: "error" });
    }

    try {
      await axios.get(`http://localhost:8080/api/otp/send?email=${loginData.email}`);
      setSnack({ open: true, message: "📩 OTP Sent to Email! / OTP மின்னஞ்சலுக்கு அனுப்பப்பட்டது!", type: "success" });
    } catch {
      setSnack({ open: true, message: "❌ Failed to send OTP! / OTP அனுப்புதல் தோல்வியடைந்தது", type: "error" });
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/otp/verify",
        { email: loginData.email, otp: Number(otp) }
      );

      if (res.data === true) {
        setOtpVerified(true);
        setSnack({ open: true, message: "✔ OTP Verified! / OTP சரிபார்க்கப்பட்டது", type: "success" });
      } else {
        setSnack({ open: true, message: "❌ Wrong OTP! / தவறான OTP", type: "error" });
      }

    } catch {
      setSnack({ open: true, message: "⚠ Verification Failed! / சரிபார்த்தல் தோல்வி", type: "error" });
    }
  };

  // ---------------- LOGIN FUNCTION ----------------
  const handleLogin = async () => {

    if (!otpVerified)
      return setSnack({ open: true, message: "⚠ Please Verify OTP! / OTP சரிபார்க்கவும்", type: "warning" });

    if (loginData.captcha.trim().toUpperCase() !== captcha) {
      refreshCaptcha();
      return setSnack({ open: true, message: "❌ Invalid Captcha! / தவறான பாதுகாப்பு குறியீடு", type: "error" });
    }

    try {
      let response;

      // Check if admin login
      if (loginData.email === "haritharsan1@gmail.com") {
        response = await axios.post("http://localhost:8080/admin/login", loginData);
      } else {
        response = await axios.post("http://localhost:8080/login", loginData);
      }
      if (response.data.status === "success") {

        const role = response.data.role;

        if (role === "user") {
          const u = response.data.user;

          // SAVE FULL USER DETAILS
          localStorage.setItem("user", JSON.stringify({
            id: u.id,
            name: u.name,
            email: u.email,
            mobile: u.mobile,
            district: u.district,
            taluk: u.taluk,
            aadhaar: u.aadhaar,
            dob: u.dob,
            role: "user"
          }));
        }
        else {
          // ADMIN LOGIN
          localStorage.setItem("user", JSON.stringify({
            role: "admin",
            email: loginData.email
          }));
        }

        setSnack({
          open: true,
          message: "🎉 Login Successful! / உள்நுழைவு வெற்றிகரமாக முடிந்தது!",
          type: "success",
        });

        setTimeout(() => {
          role === "admin"
            ? navigate("/admin/dashboard")
            : navigate("/user/dashboard");
        }, 900);
      }

    } catch {
      setSnack({ open: true, message: "❌ Invalid Login! / தவறான உள்நுழைவு", type: "error" });
    }
  };

  // ---------------- NAV MENU ----------------
  const navItems = [
    { name: "Home / முகப்பு", path: "/" },
    { name: "About Us / எங்களை பற்றி", path: "/about" },
    { name: "e-Sevai / இ-சேவை", path: "/esevai" },
    { name: "Services Offered / வழங்கப்படும் சேவைகள்", path: "/services" },
    { name: "Help / உதவி", path: "/help" },
    { name: "Contact / தொடர்புக்கு", path: "/contact" },
  ];

  return (
    <Box sx={{ background: "#F3FFF6", minHeight: "100vh", margin: -1 }}>

      {/* HEADER */}
      <Box sx={{ textAlign: "center", p: 2, background: "#015C3A", color: "white" }}>
        <Typography variant="h5" fontWeight={600}>
          Directorate of e-Governance / மின்தகவல் ஆணையகம் <br />
          Tamil Nadu e-Governance Agency / தமிழ்நாடு மின்தகவல் முகமை
        </Typography>
        <Typography sx={{ fontSize: 13 }}>
          Information Technology & Digital Services Department / தகவல் தொழில்நுட்ப மற்றும் டிஜிட்டல் சேவைத் துறை
        </Typography>
      </Box>

      {/* TITLE */}
      <Typography sx={{ mt: 2, textAlign: "center", color: "#0B8A42", fontWeight: 700, fontSize: 28 }}>
        e-Sevai | இ-சேவை
      </Typography>

      {/* NAVIGATION */}
      <Box sx={{
        background: "#024A2A",
        display: "flex",
        justifyContent: "center",
        gap: 3,
        p: 1,
        boxShadow: "0px 3px 8px rgba(0,0,0,0.2)"
      }}>
        {navItems.map((item) => (
          <Button
            key={item.name}
            component={Link}
            to={item.path}
            sx={{
              color: "white",
              fontWeight: location.pathname === item.path ? 900 : 500,
              borderBottom: location.pathname === item.path ? "3px solid #F9FF87" : "none",
              transition: "0.3s",
              "&:hover": { color: "#F9FF87" }
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      {/* WARNING */}
      <marquee style={{
        padding: 6,
        background: "#FFFFFF",
        color: "#C80000",
        fontWeight: 700,
        borderBottom: "2px solid #96E6B3"
      }}>
        ⚠️ Please register as a new user to continue using services. / சேவைகளை பயன்படுத்த புதிய பயனராக பதிவு செய்யவும்.
      </marquee>

      {/* BODY */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>

          {/* LEFT BOX */}
          <Grid>
            <Paper elevation={3} sx={{
              p: 3,
              width: 700,
              height: 500,
              borderRadius: 3,
              border: "2px solid #D9FFE6",
              background: "#FFFFFF",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#0B8A42" }}>
                e-Sevai Services for Citizen / பொதுமக்களுக்கு இ-சேவை
              </Typography>

              <Typography sx={{ mt: 1, mb: 2, color: "#333" }}>
                Tamil Nadu e-Governance Agency provides online services securely and efficiently. /
                தமிழ்நாடு மின்தகவல் முகமை பொதுமக்களுக்கு பாதுகாப்பான மற்றும் திறம்பட சேவைகளை வழங்குகிறது.
              </Typography>

              <ul style={{ columns: 2, fontSize: 15, color: "#024A2A" }}>
                <li>REV-101 Community Certificate / சமூகச் சான்று</li>
                <li>REV-102 Nativity Certificate / பிறப்பிடம்</li>
                <li>REV-103 Income Certificate / வருமானச் சான்று</li>
                <li>REV-104 First Graduate / முதல் பட்டதாரி</li>
                <li>REV-105 Widow Certificate / விதவைச் சான்று</li>
                <li>REV-108 Unemployment / வேலைஇல்லா சான்று</li>
                <li>REV-117 Farmer Certificate / விவசாயி சான்று</li>
                <li>REV-119 No Male Child / ஆண் குழந்தையில்லா சான்று</li>
                <li>REV-120 Unmarried Certificate / திருமணம் ஆகாதவர்</li>
                <li>REV-125 COVID-19 Death / கோவிட் மரணச் சான்று</li>
              </ul>
            </Paper>
          </Grid>

          {/* LOGIN BOX */}
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            <Paper elevation={3} sx={{
              p: 3,
              width: 500,
              height: 500,
              borderRadius: 3,
              border: "2px solid #D9FFE6",
              background: "#FFFFFF",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
            }}>

              <Typography textAlign="center" fontWeight={700} sx={{ mb: 2, color: "#024A2A" }}>
                🔐 Sign In / உள்நுழை
              </Typography>

              {/* Email + OTP */}
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Login Email / மின்னஞ்சல்"
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <Button sx={{
                  background: "#0B8A42",
                  color: "white",
                  "&:hover": { background: "#097334" }
                }} onClick={sendOtp}>
                  SEND OTP
                </Button>
              </Box>

              {!otpVerified && (
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter OTP / OTP ஐ உள்ளிடவும்"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button sx={{
                    background: "#0B8A42",
                    color: "white",
                    "&:hover": { background: "#097334" }
                  }} onClick={verifyOtp}>
                    VERIFY
                  </Button>
                </Box>
              )}

              <TextField
                fullWidth
                type="password"
                label="Password / கடவுச்சொல்"
                sx={{ mb: 2 }}
                disabled={!otpVerified}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />

              {/* CAPTCHA */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box sx={{
                  width: 120,
                  height: 50,
                  background: "#E8FFF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #0B8A42",
                  fontWeight: 900,
                  fontSize: 24,
                  color: "#024A2A",
                  borderRadius: 2
                }}>
                  {captcha}
                </Box>
                <Button variant="outlined" onClick={refreshCaptcha}
                  sx={{ borderColor: "#0B8A42", color: "#0B8A42", "&:hover": { background: "#0B8A42", color: "white" } }}>
                  ↻
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Enter Captcha / பாதுகாப்பு குறியீடு"
                sx={{ mb: 2 }}
                disabled={!otpVerified}
                onChange={(e) => setLoginData({ ...loginData, captcha: e.target.value })}
              />

              <Button fullWidth variant="contained" sx={{
                background: "#0B8A42",
                "&:hover": { background: "#097334" }
              }} onClick={handleLogin} disabled={!otpVerified}>
                LOGIN / உள்நுழை
              </Button>

              <Typography sx={{ textAlign: "right", mt: 2 }}>
                <Link to="/register">New User? Sign Up / புதிய பயனர்? பதிவு செய்க</Link>
              </Typography>

            </Paper>
          </Grid>

        </Grid>
      </Box>

      {/* FOOTER */}
      <Box sx={{
        background: "#014122",
        color: "white",
        p: 2,
        textAlign: "center",
        fontWeight: 600
      }}>
        📞 HELPLINE: 18004256000 | tnesevaihelpdesk@tn.gov.in <br />
        உதவி எண்: 18004256000 | மின்னஞ்சல்: tnesevaihelpdesk@tn.gov.in
      </Box>

      {/* SNACKBAR */}
      <Snackbar open={snack.open} autoHideDuration={2500} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.type} variant="filled">{snack.message}</Alert>
      </Snackbar>

    </Box>
  );
}
