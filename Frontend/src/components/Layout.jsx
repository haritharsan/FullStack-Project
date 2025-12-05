import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {

  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "e-Sevai", path: "/esevai" },
    { name: "Services Offered", path: "/services" },
    { name: "Help", path: "/help" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#f6f6f6" }}>

      {/* 🔹 COMMON HEADER */}
      <Box sx={{ textAlign: "center", p: 2, background: "#02733e", color: "white" }}>
        <Typography variant="h5" fontWeight={600}>
          Directorate of e-Governance <br /> Tamil Nadu e-Governance Agency
        </Typography>
        <Typography sx={{ fontSize: 13 }}>
          Information Technology & Digital Services Department, Government of Tamil Nadu
        </Typography>
      </Box>

      {/* 🔹 NAV BAR */}
      <Box sx={{
        background: "#1b7c2d",
        display: "flex",
        justifyContent: "center",
        gap: 3,
        p: 1
      }}>
        {navItems.map((item) => (
          <Button
            key={item.name}
            component={Link}
            to={item.path}
            sx={{
              color: "white",
              fontWeight: location.pathname === item.path ? 900 : 500,
              fontSize: 15,
              borderBottom: location.pathname === item.path ? "3px solid yellow" : "none",
              borderRadius: 0
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      {/* 🔹 PAGE CONTENT */}
      <Box sx={{ p: 3 }}>{children}</Box>

      {/* 🔹 FOOTER */}
      <Box sx={{ background: "#006400", color: "white", p: 3, textAlign: "center", mt: 3 }}>
        📞 HELPDESK: tnesevaihelpdesk@tn.gov.in | Toll Free: 18004256000
      </Box>
    </Box>
  );
}
