import { Box, Typography, Paper, Divider, Grid, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function ServicesPage() {

  const location = useLocation();

  const services = [
    "Community Certificate / சமூகச் சான்று",
    "Income Certificate / வருமானச் சான்று",
    "Nativity Certificate / பிறப்பிடம் சான்று",
    "First Graduate Certificate / முதல் பட்டதாரி சான்று",
    "Destitute Widow Certificate / ஆதரவற்ற விதவைச் சான்று",
    "Residence Certificate / குடியிருப்பு சான்று",
    "Legal Heir Certificate / சட்டபூர்வ வாரிசு சான்று",
    "Unemployment Certificate / வேலைஇல்லா சான்று",
    "OBC Certificate / பிற்படுத்தப்பட்டோர் சான்று",
    "Small / Marginal Farmer Certificate / சிறு/வறிய விவசாயி சான்று",
    "Migration Certificate / இடமாற்றுச் சான்று",
    "No Male Child Certificate / ஆண் குழந்தையில்லா சான்று"
  ];

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
        pb: 6,
        position: "relative",
        margin: -1,
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
          opacity: 0.05,
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
          boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
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
              "&:hover": { color: "#F9FF87" },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      {/* CONTENT */}
      <Paper
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 3,
          background: "#FFFFFF",
          border: "2px solid #D9FFE6",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          color="#0B8A42"
        >
          📃 Available Citizen Services / வழங்கப்படும் குடிமக்கள் சேவைகள்
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{ fontSize: 17, textAlign: "center", mb: 3 }}>
          Apply for government certificates & services via Tamil Nadu e-Sevai portal. <br />
          தமிழ்நாடு இ-சேவை தளம் மூலம் அரசு சான்றுகள் மற்றும் சேவைகளுக்கு விண்ணப்பிக்கலாம்.
        </Typography>

        {/* SERVICE GRID */}
        <Grid container spacing={2}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  fontWeight: 600,
                  background: "#FFFFFF",
                  border: "1px solid #CFFFE0",
                  color: "#024A2A",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "scale(1.04)",
                    background: "#E8FFF1",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.18)",
                  },
                }}
              >
                ✔ {service}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" sx={{ fontSize: 16, color: "#0B8A42" }}>
          📌 More services will be added soon as part of Digital Tamil Nadu. <br />
          📌 டிஜிட்டல் தமிழ்நாடு திட்டத்தின் கீழ் மேலும் பல சேவைகள் விரைவில் சேர்க்கப்படும்.
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
          fontWeight: 600,
        }}
      >
        © Tamil Nadu e-Governance Agency — Empowering Digital Tamil Nadu <br />
        © தமிழ்நாடு மின்தகவல் முகமை — டிஜிட்டல் தமிழகத்தை வலுப்படுத்தல்
      </Box>

    </Box>
  );
}
