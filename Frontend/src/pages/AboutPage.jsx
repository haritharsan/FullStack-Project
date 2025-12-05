import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function AboutPage() {
  const location = useLocation();

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
        overflow: "hidden",
        margin: -1,
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
          opacity: 0.04,
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

      {/* NAVIGATION (Same as Landing Page) */}
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
              "&:hover": { color: "#F9FF87" },
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
          boxShadow: "0px 4px 12px rgba(0,0,0,0.10)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          color="#0B8A42"
        >
          📌 About TN e-Sevai Portal / தமிழ்நாடு இ-சேவை பற்றி
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{ fontSize: 17, lineHeight: 1.7 }}>
          The <b>Tamil Nadu e-Sevai Portal</b> aims to deliver government
          services to citizens in a simple, transparent, and digital manner.
          <br /><br />
          <b>தமிழ்நாடு இ-சேவை தளம்</b> பொதுமக்களுக்கு அரசு சேவைகளை எளிமையாகவும்,
          வெளிப்படையாகவும், டிஜிட்டல் முறையில் வழங்கும் நோக்கத்துடன் உருவாக்கப்பட்டது.
          <br /><br />
          e-Sevai ensures:
        </Typography>

        <ul style={{ fontSize: "16px", lineHeight: "1.8", marginTop: "10px", color: "#024A2A" }}>
          <li>Easy access to certificates and licenses / சான்றிதழ்கள் & உரிமங்கள் பெற எளிதான வழி</li>
          <li>Reduced processing time / செயல்முறை நேரம் குறைகிறது</li>
          <li>Improved service transparency / வெளிப்படையான சேவை</li>
          <li>Secure authentication / பாதுகாப்பான அடையாள சரிபார்ப்பு</li>
          <li>Online & CSC center service delivery / ஆன்லைன் + CSC மையம் சேவை</li>
        </ul>

        <Typography sx={{ fontSize: 17, lineHeight: 1.7, mt: 2 }}>
          Citizens commonly apply for:
          <br />
          பொதுமக்கள் விண்ணப்பிக்கும் முக்கிய சேவைகள்:
        </Typography>

        <ul style={{ fontSize: "16px", lineHeight: "1.8", marginTop: "10px", color: "#024A2A" }}>
          <li>Community Certificate / சமூகச் சான்று</li>
          <li>Income Certificate / வருமானச் சான்று</li>
          <li>Nativity Certificate / பிறப்பிடம் சான்று</li>
          <li>Educational Records / கல்வி தொடர்பான சான்றுகள்</li>
          <li>Licenses / உரிமப்பத்திரங்கள்</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography sx={{ fontSize: 16, textAlign: "center", color: "#0B8A42" }}>
          🚀 <b>Empowering Citizens Through Digital Governance</b>
          <br />
          <i>“Simple | Fast | Transparent | Paperless”</i>  
          <br />
          <i>“எளிமை | விரைவு | வெளிப்படை | காகிதமின்மை”</i>
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
        © Tamil Nadu e-Governance Agency — All Rights Reserved <br />
        © தமிழ்நாடு மின்தகவல் முகமை — அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை
      </Box>

    </Box>
  );
}
