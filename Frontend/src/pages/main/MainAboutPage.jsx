import { Box, Container, Typography, Divider, Paper, Grid } from "@mui/material";
import GovtLayout from "../../components/GovtLayout";

export default function AboutPages() {
  return (
    <GovtLayout>
      <Box sx={{ background: "#f5f8ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          {/* 📌 Page Heading */}
          <Box
            sx={{
              borderLeft: "6px solid #0c4cac",
              pl: 2,
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#0c4cac", textTransform: "uppercase" }}
            >
              About Tamil Nadu e-Governance Agency
            </Typography>
          </Box>

          {/* 📌 Overview */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "10px",
              background: "#fff",
              border: "1px solid #e1e6f2",
              lineHeight: 1.7,
              fontSize: "1.05rem",
              mb: 5,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Overview
            </Typography>
            <Typography sx={{ mb: 3, color: "#333" }}>
              Tamil Nadu e-Governance Agency (TNeGA) was created to promote
              digital transformation and ensure transparent, efficient, and
              citizen-centric public governance enabled by technology.
            </Typography>
          </Paper>

          {/* -------------------------- VISION & MISSION SECTION -------------------------- */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "#002b60",
              mb: 4,
            }}
          >
            Vision & Mission
          </Typography>

          {/* Vision Block */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              border: "1px solid #e1e6f2",
              background: "#ffffff",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <img src="https://img.icons8.com/color/96/idea.png" alt="vision icon" />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Vision
                </Typography>
                <Typography sx={{ color: "#444", fontSize: "16px" }}>
                  To fulfill the vision of Good Governance using IT tools ensuring
                  transparency, accessibility and efficiency in delivery of
                  government services to citizens.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Mission Block */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              border: "1px solid #e1e6f2",
              background: "#ffffff",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <img
                  src="https://img.icons8.com/color/96/target.png"
                  alt="mission icon"
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Mission
                </Typography>
                <Typography sx={{ color: "#444", fontSize: "16px" }}>
                  To improve the quality of life of citizens by delivering highly
                  efficient public service platforms using emerging technologies
                  like AI/ML, Blockchain, Data Analytics, IoT, and cloud systems.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Objectives Section */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #e1e6f2",
              background: "#ffffff",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                <img
                  src="https://img.icons8.com/color/96/ok.png"
                  alt="objectives icon"
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Objectives
                </Typography>
                <Typography sx={{ fontSize: "16px", color: "#333" }}>
                  • Build transparent, digital-first public governance system. <br />
                  • Enable seamless citizen access to all government services. <br />
                  • Promote secure, scalable, and modern e-governance architecture. <br />
                  • Deploy AI-powered automation and digitally efficient workflows. <br />
                  • Support innovation-led research and technology adoption.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </GovtLayout>
  );
}
