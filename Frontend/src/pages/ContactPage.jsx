import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function ContactPage() {

  const location = useLocation();
  const [snack, setSnack] = useState({ open: false, message: "", type: "success" });

  const handleSubmit = () => {
    setSnack({ open: true, message: "📩 Your message has been sent! / உங்கள் செய்தி அனுப்பப்பட்டது!", type: "success" });
  };

  // NAVBAR ITEMS (Tamil + English)
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
          width: "450px",
          height: "450px",
          background: `url("/tnlogo.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
        },
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
        {navItems.map((item) => (
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

      {/* MAIN CONTENT CARD */}
      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 3,
          border: "2px solid #D9FFE6",
          background: "#FFFFFF",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
        }}
      >

        <Typography variant="h5" fontWeight={700} textAlign="center" color="#0B8A42">
          📞 Contact & Support / தொடர்பு & உதவி
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* CONTACT INFO GRID */}
        <Grid container spacing={2}>

          {/* EMAIL BOX */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                background: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", background: "#E8FFF1" },
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#024A2A" }}>
                📧 Email Support / மின்னஞ்சல் உதவி
              </Typography>
              <Typography sx={{ mt: 1, fontSize: 16, color: "#333" }}>
                tnesevaihelpdesk@tn.gov.in
              </Typography>
            </Paper>
          </Grid>

          {/* HELPLINE BOX */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                background: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", background: "#E8FFF1" },
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#024A2A" }}>
                ☎ Helpline Number / உதவி எண்
              </Typography>
              <Typography sx={{ mt: 1, fontSize: 16, color: "#333" }}>
                1800-425-6000 (Toll Free)
              </Typography>
            </Paper>
          </Grid>

          {/* WORKING HOURS */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, background: "#E8FFF1", textAlign: "center" }}>
              <Typography sx={{ fontSize: 17, color: "#024A2A" }}>
                ⏳ <b>Working Hours:</b> Monday – Saturday | 9:00 AM – 6:00 PM  
                <br />
                செயல் நேரம்: திங்கள் – சனி | காலை 9:00 – மாலை 6:00
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* MAP */}
        <Typography textAlign="center" sx={{ fontSize: 18, fontWeight: 700, color: "#024A2A", mb: 1 }}>
          📍 Location – Tamil Nadu e-Governance Agency / இடம் – தமிழ்நாடு மின்தகவல் முகமை
        </Typography>

        <Box sx={{ textAlign: "center" }}>
          <iframe
            title="TNeGA"
            width="100%"
            height="300"
            style={{ borderRadius: "10px", border: "2px solid #0B8A42" }}
            src="https://maps.google.com/maps?q=TNeGA%20Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* CONTACT FORM */}
        <Typography textAlign="center" sx={{ fontSize: 18, fontWeight: 700, mb: 2, color: "#024A2A" }}>
          📨 Send Us a Message / எங்களுக்கு செய்தி அனுப்பவும்
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Name / உங்கள் பெயர்" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email / மின்னஞ்சல்" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Subject / தலைப்பு" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Message / செய்தி" multiline rows={4} />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              background: "#0B8A42",
              width: 200,
              "&:hover": { background: "#097334" }
            }}
            onClick={handleSubmit}
          >
            Send Message / அனுப்பு
          </Button>
        </Box>

      </Paper>

      {/* FOOTER */}
      <Box sx={{
        background: "#014122",
        color: "white",
        p: 3,
        textAlign: "center",
        mt: 4,
        fontWeight: 600
      }}>
        © Tamil Nadu e-Governance Agency — Citizen Service Portal  
        <br />
        © தமிழ்நாடு மின்தகவல் முகமை — குடிமக்கள் சேவை தளம்
      </Box>

      {/* SNACKBAR */}
      <Snackbar open={snack.open} autoHideDuration={1800} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.type} variant="filled">{snack.message}</Alert>
      </Snackbar>

    </Box>
  );
}
