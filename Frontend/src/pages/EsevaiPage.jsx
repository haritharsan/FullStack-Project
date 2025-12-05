import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function EsevaiPage() {

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
          opacity: 0.04,
        },
      }}
    >

      {/* HEADER SAME AS LANDING */}
      <Box
        sx={{
          textAlign: "center",
          background: "#015C3A",
          color: "white",
          py: 2,
        }}
      >
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

      {/* NAVIGATION SAME AS LANDING */}
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
          💻 e-Sevai Portal Overview / இ-சேவை தள அறிமுகம்
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography sx={{ fontSize: 17, lineHeight: 1.8 }}>
          The <b>e-Sevai Portal</b> is an initiative by Tamil Nadu Government
          to make public services available online in a simple, fast, and
          transparent manner.
          <br /><br />
          <b>தமிழ்நாடு அரசு</b> உருவாக்கிய <b>இ-சேவை தளம்</b> 
          பொதுமக்களுக்கு அரசு சேவைகளை எளிமையாகவும், விரைவாகவும், 
          வெளிப்படையாகவும் வழங்கும் டிஜிட்டல் முயற்சியாகும்.
        </Typography>

        <Typography sx={{ fontSize: 17, mt: 2, fontWeight: 600, color: "#024A2A" }}>
          🎯 Key Features / முக்கிய அம்சங்கள்:
        </Typography>

        <ul style={{ fontSize: "16px", lineHeight: "1.9", color: "#024A2A" }}>
          <li>Online application submission / ஆன்லைன் விண்ணப்பம்</li>
          <li>OTP-based authentication / OTP அடிப்படையிலான சரிபார்ப்பு</li>
          <li>Real-time status tracking / முன்னேற்ற நிலை கண்காணிப்பு</li>
          <li>Digital certificate download / டிஜிட்டல் சான்றிதழ் பதிவிறக்கம்</li>
          <li>Available at CSC centers & home / CSC மையம் + வீட்டிலிருந்தே சேவை</li>
        </ul>

        <Typography sx={{ fontSize: 17, mt: 2, fontWeight: 600, color: "#024A2A" }}>
          📍 Services You Can Apply / விண்ணப்பிக்கக்கூடிய சேவைகள்:
        </Typography>

        <ul style={{ fontSize: "16px", lineHeight: "1.9", color: "#024A2A" }}>
          <li>Community & Income Certificates / சமூக & வருமானச் சான்று</li>
          <li>Birth / Death Records / பிறப்பு / இறப்பு பதிவுகள்</li>
          <li>Legal Heir Certificate / சட்ட வாரிசு சான்று</li>
          <li>OBC / First Graduate / Destitute Woman Certificates</li>
          <li>Licenses & Welfare Schemes / உரிமங்கள் & நலத்திட்டங்கள்</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" sx={{ fontSize: 16, color: "#0B8A42" }}>
          📌 <b>Goal:</b> Deliver transparent & digital services to every citizen of Tamil Nadu.  
          <br />
          📌 <b>நோக்கம்:</b> பொதுமக்களுக்கு வெளிப்படையான & முழுமையான டிஜிட்டல் சேவை வழங்குதல்.
        </Typography>
      </Paper>

      {/* FOOTER SAME AS LANDING */}
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
