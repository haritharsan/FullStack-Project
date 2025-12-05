import { Box, Container, Grid, Toolbar, Button, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MapIcon from "@mui/icons-material/Map";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HandshakeIcon from "@mui/icons-material/Handshake";

export default function GovtLayout({ children }) {

    const navigate = useNavigate();
    const [dark, setDark] = useState(false);

    const menu = [
        { title: "HOME", path: "/", icon: <HomeIcon sx={{ color: "#ff7b00" }} /> },
        { title: "ABOUT US", path: "/mainAbout", icon: <GroupsIcon sx={{ color: "#0bad02" }} /> },
        { title: "PROJECTS", path: "/projects", icon: <BusinessCenterIcon sx={{ color: "#00b3e6" }} /> },
        { title: "CSC", path: "/csc", icon: <WorkspacePremiumIcon sx={{ color: "#d100ff" }} /> },
        { title: "E-NEWSLETTER", path: "/newsletter", icon: <NewspaperIcon sx={{ color: "#d93636" }} /> },
        { title: "TNGIS", path: "/tngis", icon: <MapIcon sx={{ color: "#1a9f35" }} /> },
        { title: "DOWNLOADS", path: "/downloads", icon: <DownloadIcon sx={{ color: "#b30000" }} /> },
        { title: "TENDERS", path: "/tenders", icon: <WorkIcon sx={{ color: "#a000ff" }} /> },
        { title: "AWARDS", path: "/awards", icon: <EmojiEventsIcon sx={{ color: "#4375ff" }} /> },
        { title: "GALLERY", path: "/gallery", icon: <PhotoLibraryIcon sx={{ color: "#9c1d1d" }} /> },
        { title: "RTI", path: "/rti", icon: <ArticleIcon sx={{ color: "#b55e00" }} /> },
        { title: "CONTACT US", path: "/mainContact", icon: <ContactMailIcon sx={{ color: "#3e6a87" }} /> },
        { title: "CAREERS", path: "/careers", icon: <HandshakeIcon sx={{ color: "#007b9e" }} /> },
    ];

    return (
        <Box sx={{ background: dark ? "#0d1220" : "#f5f8ff", minHeight: "100vh",margin:-1, }}>

            {/* 🔹 Top Black Strip */}
            <Box sx={{ background: "#000", color: "#fff", p: "6px 15px", display: "flex", justifyContent: "space-between" }}>
                📞 1100 | e-Sevai Support: 1800 425 6000
                <IconButton sx={{ color: "#fff" }} onClick={() => setDark(!dark)}>
                    {dark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Box>

            {/* 🔹 Govt Header */}
            <Box sx={{ background: "#00216c", color: "white", py: 1 }}>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="center">

                        <img src="/tnlogo.png" width="85" alt="TN Logo" />

                        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                            Directorate of e-Governance <br />
                            Tamil Nadu e-Governance Agency <br />
                            <span style={{ fontSize: "14px", fontWeight: 300 }}>
                                Government of Tamil Nadu
                            </span>
                        </Typography>

                        <img src="/eSevai.png" width="85" alt="eSevai" />

                    </Grid>
                </Container>
            </Box>

            {/* 🔹 Running News */}
            <marquee style={{ background: "#fff", color: "#b30000", fontWeight: "bold", padding: "4px" }}>
                ⚠ Bribe giving and receiving is an offence | TANFINET Franchise Registration Open!
            </marquee>

            {/* 🔹 Icon Navigation */}
            {/* 🔹 Sticky Icon Navigation */}
            <Toolbar
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 999,
                    background: "#fff",
                    justifyContent: "center",
                    borderBottom: "2px solid #ddd",
                    flexWrap: "wrap",
                    gap: "14px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                    backdropFilter: "blur(6px)",
                }}
            >
                {menu.map((item, i) => (
                    <Button
                        key={i}
                        onClick={() => navigate(item.path)}
                        sx={{
                            textTransform: "none",
                            fontSize: "11px",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: 90,
                            transition: "0.2s",
                            color:
                                window.location.pathname === item.path ? "#ff6600" : "#003c88",
                            borderBottom:
                                window.location.pathname === item.path
                                    ? "3px solid #ff6600"
                                    : "none",
                            "&:hover": {
                                transform: "scale(1.07)",
                                color: "#ff6600",
                            },
                        }}
                    >
                        {item.icon}
                        {item.title}
                    </Button>
                ))}
            </Toolbar>


            {/* 🔹 Page Content */}
            <Box sx={{ px: 2, py: 3 }}>
                {children}
            </Box>

        </Box>
    );
}
