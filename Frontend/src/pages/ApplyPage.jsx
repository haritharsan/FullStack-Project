import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Paper, Typography, TextField, Button, MenuItem,
  Snackbar, Stepper, Step, StepLabel, Divider
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import Tesseract from "tesseract.js";
import { tamilNaduData } from "./tamilNaduData";

const bi = (en, ta) => `${en} / ${ta}`;

export default function ApplyPage() {

  const { certId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const steps = [
    bi("Personal Details", "தனிப்பட்ட தகவல்கள்"),
    bi("Address Details", "முகவரி விவரங்கள்"),
    bi("Upload Aadhaar", "ஆதார் பதிவேற்றம்"),
    bi("Review & Submit", "சரிபார்த்து சமர்ப்பிக்கவும்")
  ];

  // ❗ Correct placement (removed duplicate)
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const certRes = await axios.get("http://localhost:8080/api/certificate-types");

        let found = certRes.data.find(
          c =>
            c.code?.toLowerCase() === certId.toLowerCase() ||
            c.title?.replace(/\s+/g, "-").toLowerCase() === certId.toLowerCase()
        );

        if (found) return setCertData(found);

        const schemeRes = await axios.get("http://localhost:8080/api/schemes");
        found = schemeRes.data.find(
          s =>
            s.schemeName?.split("/")[0]?.trim()?.replace(/\s+/g, "-")?.toLowerCase() === certId.toLowerCase()
        );

        if (found) {
          setCertData({
            title: found.schemeName.split("/")[0].trim(),
            tamilTitle: found.schemeName.split("/")[1]?.trim() || ""
          });
        }

      } catch (err) {
        console.log("Fetch Error:", err);
      }
    }

    loadData();
  }, [certId]);

  const displayName = certData
    ? `${certData.title} / ${certData.tamilTitle || ""}`
    : "⏳ Loading...";

  const [activeStep, setActiveStep] = useState(0);
  const [taluks, setTaluks] = useState([]);

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [realOtp, setRealOtp] = useState(null);

  const [snack, setSnack] = useState({ open: false, msg: "", type: "info" });
  const [timer, setTimer] = useState(0);

  const triggerSnack = (msg, type = "info") => {
    setSnack({ open: true, msg, type });
  };

  const [form, setForm] = useState({
    loginId: user?.loginId,
    certificateType: "",
    tamilCertificateType: "",
    fullName: user?.name || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    district: "",
    taluk: "",
    address: "",
    appliedDate: new Date().toISOString().split("T")[0],
    status: "Pending"
  });

  useEffect(() => {
    if (certData) {
      setForm(prev => ({
        ...prev,
        certificateType: certData.title,
        tamilCertificateType: certData.tamilTitle || ""
      }));
    }
  }, [certData]);

  // OCR
  const runAadhaarOCR = async (file) => {
    setAadhaarVerified(false);
    triggerSnack("🔍 Reading Aadhaar…", "info");

    try {
      const { data: { text } } = await Tesseract.recognize(file, "eng");

      const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
      const foundAadhaar = text.match(aadhaarRegex);

      if (foundAadhaar) {
        setAadhaarVerified(true);
        triggerSnack(`✔ Valid Aadhaar Detected: ${foundAadhaar[0]}`, "success");
      } else {
        setAadhaarVerified(false);
        triggerSnack("❌ Invalid Aadhaar — upload a clear Aadhaar card", "error");
      }

    } catch (err) {
      setAadhaarVerified(false);
      triggerSnack("❌ OCR Failed — Use a clear Aadhaar image", "error");
    }
  };

  // OTP
  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      return triggerSnack("❌ Enter valid mobile number", "error");

    const otpNo = Math.floor(1000 + Math.random() * 9000);
    setRealOtp(otpNo);

    triggerSnack(`OTP Sent (${otpNo})`);

    setTimer(15);
    const interval = setInterval(() => {
      setTimer(prev => prev <= 1 ? (clearInterval(interval), 0) : prev - 1);
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp == realOtp) {
      setOtpVerified(true);
      triggerSnack("✔ OTP Verified", "success");
    } else triggerSnack("❌ Incorrect OTP", "error");
  };

  const nextStep = () => {
    if (activeStep === 0 &&
      (!form.fullName || !otpVerified || !form.fatherName || !form.motherName || !form.dob || !form.gender)
    ) return triggerSnack("❌ Fill all personal details & verify OTP", "error");

    if (activeStep === 1 &&
      (!form.district || !form.taluk || !form.address)
    ) return triggerSnack("❌ Fill address details", "error");

    if (activeStep === 2) {
      if (!aadhaarFile) return triggerSnack("❌ Upload Aadhaar card", "error");
      if (!aadhaarVerified) return triggerSnack("❌ Invalid Aadhaar — clear photo needed", "error");
    }

    setActiveStep(prev => prev + 1);
  };

  // SUBMIT
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(form));
      formData.append("aadhaarFile", aadhaarFile);

      await axios.post("http://localhost:8080/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      triggerSnack("✔ Application Submitted", "success");
      setTimeout(() => navigate("/user/dashboard"), 1500);

    } catch (err) {
      console.log(err);
      triggerSnack("❌ Submission Failed", "error");

    } finally {
      setIsSubmitting(false);
    }
  };

  // PDF Download
  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const logo = new Image();
    logo.src = "/tnlogo.png";

    pdf.addImage(logo, "PNG", 40, 60, 130, 130);

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Tamil Nadu e-Sevai - Application Copy", 20, 20);

    let y = 40;
    pdf.setFontSize(11);

    Object.entries(form).forEach(([k, v]) => {
      if (typeof v === "string") pdf.text(`${k}: ${v}`, 20, y), y += 7;
    });

    const qrText = `APP-${user?.loginId}-${Date.now()}`;
    const qr = await QRCode.toDataURL(qrText);
    pdf.addImage(qr, "PNG", 150, 20, 40, 40);

    pdf.save(`${form.fullName}_${form.certificateType}.pdf`);
  };

  // UI
  return (
    <Box sx={{ minHeight: "100vh", background: "#eef5eb", pb: 6 }}>

      {/* HEADER */}
      <Box sx={{ textAlign: "center", background: "#0b5f2a", color: "white", py: 2 }}>
        <Typography variant="h6">Tamil Nadu e-Governance Agency</Typography>
        <Typography variant="h5" fontWeight={900}>e-Sevai | இ-சேவை</Typography>
      </Box>

      <Paper sx={{
        p: 4, mt: 4, mx: "auto", width: "85%", maxWidth: "800px",
        borderRadius: 4, boxShadow: "0px 4px 20px rgba(0,0,0,0.15)"
      }}>

        <Typography variant="h5" textAlign="center" fontWeight={800} sx={{ color: "#0b5f2a" }}>
          {displayName}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {/* STEP 1 */}
        {activeStep === 0 && (
          <>
            <TextField fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("Full Name", "முழு பெயர்")}
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />

            <TextField fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("Father Name", "தந்தையின் பெயர்")}
              value={form.fatherName}
              onChange={e => setForm({ ...form, fatherName: e.target.value })}
            />

            <TextField fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("Mother Name", "தாயின் பெயர்")}
              value={form.motherName}
              onChange={e => setForm({ ...form, motherName: e.target.value })}
            />

            <TextField type="date" fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("Date of Birth", "பிறந்த தேதி")}
              InputLabelProps={{ shrink: true }}
              onChange={e => setForm({ ...form, dob: e.target.value })}
            />

            <TextField select fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("Gender", "பாலினம்")}
              onChange={e => setForm({ ...form, gender: e.target.value })}>
              <MenuItem value="Male">{bi("Male", "ஆண்")}</MenuItem>
              <MenuItem value="Female">{bi("Female", "பெண்")}</MenuItem>
              <MenuItem value="Other">{bi("Other", "வேறு")}</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth sx={{ background: "white" }}
                label={bi("Mobile Number", "கைபேசி எண்")}
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
              />

              <Button variant="contained" sx={{ background: "#0b5f2a" }}
                disabled={timer > 0} onClick={sendOtp}>
                {timer > 0 ? `(${timer}s)` : bi("Send OTP", "OTP அனுப்பு")}
              </Button>
            </Box>

            {!otpVerified && (
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <TextField fullWidth sx={{ background: "white" }}
                  placeholder={bi("Enter OTP", "OTP உள்ளிடவும்")}
                  onChange={e => setOtp(e.target.value)}
                />

                <Button variant="contained" sx={{ background: "#024c26" }} onClick={verifyOtp}>
                  {bi("Verify", "சரிபார்")}
                </Button>
              </Box>
            )}

            <TextField fullWidth sx={{ background: "white", mt: 2 }}
              label={bi("Email", "மின்னஞ்சல்")}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </>
        )}

        {/* STEP 2 */}
        {activeStep === 1 && (
          <>
            <TextField select fullWidth sx={{ background: "white", mb: 2 }}
              label={bi("District", "மாவட்டம்")}
              onChange={e => {
                setForm({ ...form, district: e.target.value });
                setTaluks(tamilNaduData[e.target.value]);
              }}>
              {Object.keys(tamilNaduData).map(d => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>

            <TextField select fullWidth disabled={!taluks.length}
              sx={{ background: "white", mb: 2 }}
              label={bi("Taluk", "தாலுக்கு")}
              onChange={e => setForm({ ...form, taluk: e.target.value })}>
              {taluks.map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>

            <TextField fullWidth multiline rows={3} sx={{ background: "white" }}
              label={bi("Full Address", "முழு முகவரி")}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />
          </>
        )}

        {/* STEP 3 */}
        {activeStep === 2 && (
          <>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              📎 {bi("Upload Aadhaar Card", "ஆதார் அட்டை பதிவேற்றவும்")}
            </Typography>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                setAadhaarFile(file);

                await runAadhaarOCR(file);
              }}
            />

            {aadhaarFile && (
              <Typography sx={{ mt: 1, color: aadhaarVerified ? "green" : "red" }}>
                {aadhaarVerified ? "✔ Valid Aadhaar" : "❌ Invalid Aadhaar"}
              </Typography>
            )}
          </>
        )}

        {/* STEP 4 */}
        {activeStep === 3 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#024c26", mb: 2 }}>
              {bi("Review completed — Submit your application",
                "சரிபார்ப்பு முடிந்தது — விண்ணப்பத்தை சமர்ப்பிக்கவும்")}
            </Typography>

            <Button variant="contained" sx={{ background: "#004AAD", mb: 2 }}
              onClick={downloadPDF}>
              📄 {bi("Download Application PDF", "PDF பதிவிறக்கவும்")}
            </Button>
          </Box>
        )}

        {/* BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)}>
            ⬅ {bi("Back", "பின்")}
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button variant="contained" sx={{ background: "#0b5f2a" }} onClick={submitForm}>
              {bi("Submit", "சமர்ப்பிக்கவும்")}
            </Button>
          ) : (
            <Button variant="contained" sx={{ background: "#024c26" }} onClick={nextStep}>
              {bi("Next", "அடுத்து")} ➡
            </Button>
          )}
        </Box>

      </Paper>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ ...snack, open: false })}
        autoHideDuration={2500}
        message={snack.msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            background: snack.type === "success" ? "#0b5f2a"
              : snack.type === "error" ? "crimson"
                : "#004AAD",
            color: "white",
            fontWeight: "bold"
          }
        }}
      />

    </Box>
  );
}
