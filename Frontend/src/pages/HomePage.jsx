import React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";


import { useTranslation } from "react-i18next";


import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import BannerSlider from "./BannerSlider"
import { useNavigate } from "react-router-dom";

// Icons colored like original site
import LinkIcon from "@mui/icons-material/Link";
import PlaceIcon from "@mui/icons-material/Place";



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



export default function HomePage() {
    const [dark, setDark] = React.useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();



    const menu = [
        { title: "HOME", path: "/", icon: <HomeIcon sx={{ color: "#ff7b00", fontSize: "25px" }} /> },
        { title: "ABOUT US", path: "/mainAbout", icon: <GroupsIcon sx={{ color: "#0bad02", fontSize: "25px" }} /> },
        { title: "PROJECTS", path: "/projects", icon: <BusinessCenterIcon sx={{ color: "#00b3e6", fontSize: "25px" }} /> },
        { title: "CSC", path: "/csc", icon: <WorkspacePremiumIcon sx={{ color: "#d100ff", fontSize: "25px" }} /> },
        { title: "E-NEWSLETTER", path: "/newsletter", icon: <NewspaperIcon sx={{ color: "#d93636", fontSize: "25px" }} /> },
        { title: "TNGIS", path: "/tngis", icon: <MapIcon sx={{ color: "#1a9f35", fontSize: "25px" }} /> },
        { title: "DOWNLOADS", path: "/downloads", icon: <DownloadIcon sx={{ color: "#b30000", fontSize: "25px" }} /> },
        { title: "TENDERS", path: "/tenders", icon: <WorkIcon sx={{ color: "#a000ff", fontSize: "25px" }} /> },
        { title: "AWARDS", path: "/awards", icon: <EmojiEventsIcon sx={{ color: "#4375ff", fontSize: "25px" }} /> },
        { title: "GALLERY", path: "/gallery", icon: <PhotoLibraryIcon sx={{ color: "#9c1d1d", fontSize: "25px" }} /> },
        { title: "RTI", path: "/rti", icon: <ArticleIcon sx={{ color: "#b55e00", fontSize: "25px" }} /> },
        { title: "CONTACT US", path: "/mainContact", icon: <ContactMailIcon sx={{ color: "#3e6a87", fontSize: "25px" }} /> },
        { title: "CAREERS", path: "/careers", icon: <HandshakeIcon sx={{ color: "#007b9e", fontSize: "25px" }} /> },
    ];


    return (
        <Box sx={{ background: dark ? "#0d1220" : "#f3f5f9", minHeight: "100vh", marginLeft: -1, marginTop: -1 }}>


            {/* 🔹 TOP BAR */}
            <Box sx={{
                background: "#000",
                color: "#fff",
                padding: "6px 15px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                height:20,
            }}>
                📞 CM Helpline: 1100 | e-Sevai Support: 18004256000

                <div style={{ display: "flex", gap: 15 }}>
                    <IconButton size="small" sx={{ color: "#fff" }} onClick={() => setDark(!dark)}>
                        {dark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>


                </div>
            </Box>

            {/* 🔹 HEADER LOGOS */}
            {/* 🔹 HEADER LOGOS (FIXED ROUND + ALIGNMENT) */}
            <Box sx={{ background: "#00216C", color: "white", py: 2, height: 70 }}>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="center">

                        {/* LEFT 2 LOGOS */}
                        <Grid item sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <img
                                src="tnlogo.png"
                                width="89"
                                style={{ borderRadius: "50%", marginTop: -12 }}
                                alt="TN Logo"
                            />
                            <img
                                src="cm.png"
                                width="89"
                                style={{ borderRadius: "50%", marginTop: -13,marginLeft:-70 }}
                                alt="Chief Minister"
                            />
                        </Grid>

                        {/* TITLE */}
                        <Typography
                            textAlign="center"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "22px",
                                lineHeight: "26px",
                                marginTop: "-16px",
                                color: "white",
                            }}
                        >
                            Directorate of e-Governance /<br />
                            Tamil Nadu e-Governance Agency
                            <br />

                            <span
                                style={{
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    display: "block",
                                    marginTop: "5px",
                                }}
                            >
                                Information Technology and Digital Services Department <br />
                                Government of Tamil Nadu
                            </span>
                        </Typography>


                        {/* RIGHT 2 LOGOS */}
                        <Grid item sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <img
                                src="ptr.png"
                                width="89"
                                style={{ borderRadius: "50%", marginTop: -10,marginRight:-80 }}
                                alt="PTR Minister"
                            />
                            <img
                                src="eSevai.png"
                                width="89"
                                style={{ borderRadius: "50%", marginTop: -10 }}
                                alt="eSevai"
                            />
                        </Grid>

                    </Grid>
                </Container>
                <Box sx={{ width: "100%", mt: 1 }}>
                    <BannerSlider />
                </Box>


            </Box>
            {/* 🔹 SCROLL TEXT */}
            <Box sx={{ background: "er.svg", py: 1 }}>
                <marquee style={{ color: "#c00000", fontWeight: "bold" }}>
                 " TANFINET has launched the Franchisee partners Registration for delivering high quality internet services under the BharatNet Project. Interested Individual and organizations can submit their applications through the TANFIENT website: https://tanfinet.tn.gov.in/ "
                </marquee>
            </Box>

            {/* 🔹 ICON MENU + ADDED BUTTONS */}
            {/* 🔹 ICON MENU + ADDED BUTTONS */}
            <Toolbar
                sx={{
                    background: "white",
                    justifyContent: "center",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    paddingY: "6px",
                    position: "sticky",
                    top: 0,
                    zIndex: 200,
                }}
            >
                {menu.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => navigate(item.path)}
                        sx={{
                            flexDirection: "column",
                            color: "#003c88",
                            fontWeight: "bold",
                            fontSize: "12px",
                            alignItems: "center",
                            minWidth: "65px",
                            padding: "4px 6px",
                            transition: "0.2s",
                                  borderBottom: window.location.pathname === item.path ? "3px solid #ff6600" : "none",
                            "&:hover": { color: "#ff6600", transform: "scale(1.06)" },
                        }}
                    >
                        {item.icon}
                        {item.title}
                    </Button>
                ))}


               
            </Toolbar>

            {/* 🔹 STATIC BANNER */}
            <Box sx={{
                height: "350px",
                backgroundImage: `url("/banner.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} />


            {/* 🔹 FOUR MAIN SERVICE CARDS */}
            <Container sx={{
                py: 5, position: "relative",
                zIndex: 10,
                marginTop: "-30px",
            }}>
                <Grid container spacing={3} justifyContent="center">

                    {[
                        {
                            title: "Citizen Services",
                            desc: "Now, access all Tamil Nadu Government Services at the comfort of your home",
                            btns: [
                                { label: "Login", url: "/portal" }, // 👈 local route path
                                { label: "Sign up", url: "/register" }
                            ],
                            icon: "👥",
                        },
                        {
                            title: "AI Initiatives",
                            desc: "TNeGA is committed in leading the adoption of Artificial Intelligence to provide innovative solutions.",
                            btns: [
                                { label: "TNeGA AI initiatives", url: "https://www.youtube.com/watch?v=winoJzPMf2M" },
                                { label: "iTNT HUB", url: "https://itnthub.tn.gov.in/" },
                                { label: "G.O Files", url: "http://localhost:5173/gallery" }
                            ],
                            icon: "🤖",
                        },
                        {
                            title: "Services to Govt Dept",
                            desc: "TNeGA is also providing software applications to the departments in SAS mode",
                            btns: [{ label: "Explore", url: "http://localhost:5173/services" }],
                            icon: "⚙️",
                        },
                        {
                            title: "List of e-Sevai Services",
                            desc: "List of Services offered through e-Sevai Centres",
                            btns: [
                                { label: "Services", url: "http://localhost:5173/services" },
                                { label: "Centre Locator", url: "http://localhost:5173/csc" }
                            ],
                            icon: "📄",
                        },
                    ].map((item, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Box sx={{
                                background: "white",
                                borderRadius: "12px",
                                padding: "25px",
                                textAlign: "center",
                                boxShadow: "0px 5px 18px rgba(0,0,0,0.1)",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "scale(1.03)",
                                    boxShadow: "0px 7px 20px rgba(0,0,0,0.18)"
                                },
                                width: 220,
                                zIndex: 1,
                                height: 400,
                            }}>
                                <Typography sx={{ fontSize: "45px" }}>{item.icon}</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "18px", mt: 1 }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", mt: 1, color: "#444" }}>
                                    {item.desc}
                                </Typography>

                                {/* BUTTONS */}
                                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
                                    {item.btns.map((b, index) => (
                                        <Button
                                            key={index}
                                            variant="outlined"
                                            onClick={() => navigate(b.url)}
                                            sx={{
                                                borderRadius: "25px",
                                                color: "#024f2e",
                                                borderColor: "#024f2e",
                                                "&:hover": { background: "#024f2e", color: "white" }
                                            }}
                                        >
                                            {b.label}
                                        </Button>
                                    ))}
                                </Box>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>




            {/* ================= FOOTER SECTION ================= */}

            {/* 🔹 STATISTICAL DETAILS */}
            <Box
                sx={{
                    position: "relative",
                    height: 300,
                    color: "white",
                    textAlign: "center",
                    py: 5,
                    backgroundImage: `url('/footer.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* 🔥 Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.6)", // 👈 opacity control
                        backdropFilter: "brightness(50%)",
                        zIndex: 1,
                    }}
                />

                {/* 🔥 Content (Text / Logo) */}
                <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
                        Statistical Details
                    </Typography>
                    <Typography sx={{ fontSize: "18px", mt: 2 }}>
                        Government of Tamil Nadu | e-Governance Platform
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 10,
                        flexWrap: "wrap"
                    }}>
                        {[{
                            icon: "🌍",
                            value: "260",
                            label: "Services"
                        }, {
                            icon: "📍",
                            value: "12798",
                            label: "CSCs"
                        }, {
                            icon: "👥",
                            value: "10399662",
                            label: "People Served during 2024"
                        }, {
                            icon: "🤝",
                            value: "8558987",
                            label: "People Served in 2025 so far"
                        }].map((stat, i) => (
                            <Box key={i} sx={{ minWidth: 180 }}>
                                <Typography sx={{ fontSize: "45px" }}>{stat.icon}</Typography>
                                <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={{ fontSize: "15px", opacity: 0.8 }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>


            {/* 🔹 IMPORTANT LINKS + MAP */}

            {/* 🔹 IMPORTANT LINKS + LOCATION MAP SECTION */}
            <Box sx={{ background: "#2d2d2d", color: "white", py: 6 }}>
                <Container>
                    <Grid container spacing={4}>

                        {/* 🔹 Important Links (Left Side) */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: "22px", fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                                <LinkIcon sx={{ fontSize: 26, color: "#00e676" }} />
                                Important Links
                            </Typography>

                            <Grid container spacing={1}>
                                {[
                                    "National Portal of India",
                                    "Tamil Nadu Govt Portal",
                                    "ELCOT",
                                    "TN e-Sevai",
                                    "Dept of Electronics & IT",
                                    "TN NIC",
                                    "IT Department",
                                    "TACTV",
                                    "Tamil Virtual Academy",
                                    "MeitY",
                                    "e-Governance Standards",
                                    "NeGD"
                                ].map((text, i) => (
                                    <Grid size={{ xs: 6 }} key={i}>
                                        <Typography
                                            sx={{
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                fontSize: "15px",
                                                "&:hover": { color: "#00e676" },
                                                transition: "0.3s",
                                            }}
                                        >
                                            <LinkIcon sx={{ fontSize: 16, color: "#00e676" }} />
                                            {text}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* 🔹 Location Map (Right Side) */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: "22px", fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                                <PlaceIcon sx={{ fontSize: 26, color: "#00d0ff" }} />
                                Location Map
                            </Typography>

                            <iframe
                                title="TNeGA Office Location"
                                width="100%"
                                height="260"
                                style={{
                                    borderRadius: "10px",
                                    border: "2px solid #555",
                                    filter: "grayscale(30%)",
                                }}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.982626972842!2d78.099!3d9.938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b011c5d5b815af5%3A0xa7c0e57fbfea3c4d!2sTamil%20Nadu%20e-Governance%20Agency!5e0!3m2!1sen!2sin!4v1700000000"
                            />
                        </Grid>

                    </Grid>
                </Container>
            </Box>


            {/* 🔹 BOTTOM FOOTER BAR */}
            <Box sx={{
                background: "#111",
                color: "#bbb",
                textAlign: "center",
                py: 2,
                fontSize: "14px"
            }}>
                © {new Date().getFullYear()} Tamil Nadu e-Governance Agency — All Rights Reserved.
            </Box>



        </Box>

    );
}
