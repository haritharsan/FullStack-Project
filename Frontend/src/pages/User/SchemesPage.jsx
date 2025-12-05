import { useEffect, useState } from "react";
import {
  Box, Typography, Card, Button, TextField, Dialog,
  DialogContent, DialogActions
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SchemesPage() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch Schemes
  useEffect(() => {
    axios.get("http://localhost:8080/api/schemes")
      .then(res => setSchemes(res.data))
      .catch(err => console.error("Error loading schemes:", err));
  }, []);

  const filtered = schemes.filter(s =>
    (s.schemeName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{
      minHeight: "100vh",
      margin: -1,
      background: "#F3FFF6",
      position: "relative",
      "&::before": {
        content: '""',
        position: "fixed",
        width: "480px",
        height: "480px",
        bottom: "120px",
        right: "50%",
        transform: "translateX(50%)",
        backgroundImage: `url("/tnlogo.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        opacity: 0.06,
        pointerEvents: "none"
      }
    }}>

      {/* HEADER */}
      <Box sx={{ textAlign: "center", background: "#015C3A", color: "white", py: 2 }}>
        <Typography variant="h6">Tamil Nadu e-Governance Agency</Typography>
        <Typography variant="h5" fontWeight={900}>e-Sevai | இ-சேவை</Typography>
      </Box>

      {/* NAV BAR */}
      <Box sx={{
        background: "#024A2A",
        display: "flex",
        justifyContent: "center",
        gap: 3,
        py: 1,
        flexWrap: "wrap",
        boxShadow: "0px 3px 8px rgba(0,0,0,0.15)"
      }}>
        <Button
          sx={{ color: "white" }}
          startIcon={<DescriptionIcon />}
          onClick={() => navigate("/certificates")}
        >
          Certificates / சான்றிதழ்கள்
        </Button>

        <Button
          sx={{ color: "white", fontWeight: 700 }}
          startIcon={<AccountBalanceWalletIcon />}
        >
          Schemes / திட்டங்கள்
        </Button>

        <Button
          sx={{ color: "white" }}
          startIcon={<ListAltIcon />}
          onClick={() => navigate("/user/dashboard")}
        >
          Track Status / நிலை கண்காணிப்பு
        </Button>

        <Button
          sx={{ color: "white" }}
          startIcon={<AccountCircleIcon />}
          onClick={() => navigate("/user/dashboard?view=profile")}
        >
          Profile / சுயவிவரம்
        </Button>

        <Button
          sx={{ color: "white" }}
          startIcon={<ExitToAppIcon />}
          onClick={logout}
        >
          Logout / வெளியேறு
        </Button>

      </Box>

      {/* BODY */}
      <Box sx={{ p: 4 }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 3, color: "#024A2A" }}
        >
          Available Schemes
        </Typography>

        {/* SEARCH BAR */}
        <TextField
          fullWidth
          placeholder="Search schemes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 4,
            background: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.10)"
          }}
        />

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 2fr))",
            gap: "22px",
          }}
        >

          {filtered.map((scheme, i) => (
            <Card
              key={i}
              sx={{
                width: "100%",
                minHeight: "430px",
                borderRadius: "25px",
                overflow: "hidden",
                background: "#FFFFFF",
                boxShadow: "0 8px 22px rgba(0,0,0,0.15)",
                border: "1px solid #dceee3",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                transition: "0.35s ease",
                animation: "fadeInScale 0.7s ease forwards",

                "@keyframes fadeInScale": {
                  from: { opacity: 0, transform: "scale(0.92)" },
                  to: { opacity: 1, transform: "scale(1)" },
                },

                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
                  borderColor: "#0B8A42",
                },
              }}
            >

              {/* GLOW */}
              <Box sx={{
                position: "absolute",
                top: "-40px",
                left: "-40px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(11,138,66,0.22)",
                filter: "blur(45px)",
                opacity: 0,
                transition: "0.5s ease",
                ".MuiCard-root:hover &": {
                  opacity: 1,
                  transform: "scale(1.25)",
                }
              }} />

              {/* TOP STRIP */}
              <Box
                sx={{
                  height: "130px",
                  background: "linear-gradient(180deg,#0B8A42,#024A2A)",
                  opacity: 0.25,
                  animation: "slideDown 0.6s ease",
                  "@keyframes slideDown": {
                    from: { transform: "translateY(-30px)", opacity: 0 },
                    to: { transform: "translateY(0)", opacity: 0.25 },
                  }
                }}
              />

              {/* CONTENT */}
              <Box sx={{ padding: "20px", zIndex: 5 }}>

                {/* ICON + TITLE */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: -8 }}>

                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "18px",
                      background: "linear-gradient(135deg,#0B8A42,#046030)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 30,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",

                      animation: "iconBounce 1.1s ease",
                      "@keyframes iconBounce": {
                        "0%": { transform: "scale(0.6)", opacity: 0 },
                        "60%": { transform: "scale(1.15)" },
                        "100%": { transform: "scale(1)", opacity: 1 },
                      },

                      ".MuiCard-root:hover &": {
                        transform: "scale(1.08) rotate(3deg)",
                      }
                    }}
                  >
                    🏛️
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: "17px", fontWeight: 800, color: "#024A2A" }}>
                      {scheme.schemeName}
                    </Typography>

                    <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#046030", opacity: 0.8 }}>
                      அரசு திட்டம்
                    </Typography>
                  </Box>
                </Box>

                {/* DIVIDER */}
                <Box
                  sx={{
                    height: "2px",
                    width: "100%",
                    background: "linear-gradient(90deg,transparent,#0B8A42,transparent)",
                    my: 2,
                    borderRadius: 2,
                    animation: "fadeLine 0.8s ease",
                    "@keyframes fadeLine": {
                      from: { width: "20%", opacity: 0 },
                      to: { width: "100%", opacity: 1 },
                    }
                  }}
                />

                {/* DESCRIPTION */}
                <Typography sx={{ fontSize: "14px", color: "#444", mb: 2 }}>
                  {scheme.shortDescription || "Government welfare scheme for eligible citizens."}
                </Typography>

                {/* DETAILS */}
                <Box sx={{ fontSize: "14px", display: "grid", gap: 1.2, color: "#024A2A" }}>
                  <div>🎯 <b>Category:</b> {scheme.category || "General Welfare"}</div>
                  <div>👥 <b>Eligibility:</b> {scheme.eligibility || "Based on government norms"}</div>
                </Box>

                {/* TAGS */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Box sx={{ px: 1.5, py: 0.5, borderRadius: "10px", background: "#eafff3", color: "#0B8A42", fontWeight: 600, fontSize: "12px" }}>
                    GOVT APPROVED
                  </Box>
                  <Box sx={{ px: 1.5, py: 0.5, borderRadius: "10px", background: "#f0f7ff", color: "#1b5bb8", fontWeight: 600, fontSize: "12px" }}>
                    WELFARE
                  </Box>
                </Box>

                {/* BUTTON */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "15px",
                    background: "linear-gradient(90deg,#0B8A42,#046030)",
                    "&:hover": { background: "linear-gradient(90deg,#046030,#0B8A42)" }
                  }}
                  onClick={() => setSelectedScheme(scheme)}
                >
                  VIEW DETAILS
                </Button>

              </Box>

            </Card>
          ))}

        </Box>

      </Box>

      {/* POPUP */}
      <Dialog open={Boolean(selectedScheme)} onClose={() => setSelectedScheme(null)} fullWidth maxWidth="sm">
        <DialogContent>

          <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
            {selectedScheme?.schemeName}
          </Typography>

          <Typography sx={{ color: "#333", mb: 2 }}>
            <b>Description:</b> {selectedScheme?.description}
          </Typography>

          <Typography sx={{ color: "#333", mb: 2 }}>
            <b>Eligibility:</b> {selectedScheme?.eligibility}
          </Typography>

          <Typography sx={{ color: "#333", mb: 2 }}>
            <b>Benefits:</b> {selectedScheme?.benefits}
          </Typography>

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedScheme(null)}>Close</Button>
          <Button
            variant="contained"
            sx={{ background: "#0A6B37" }}
            onClick={() => {
              const englishName = selectedScheme?.schemeName.split("/")[0].trim();
              navigate(`/apply/${englishName.replace(/\s+/g, "-")}`);
            }}
          >
            Apply Now
          </Button>

        </DialogActions>

      </Dialog>

    </Box>
  );
}
