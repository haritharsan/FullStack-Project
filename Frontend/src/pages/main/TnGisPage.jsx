import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";

import MapIcon from "@mui/icons-material/Map";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";

import GovtLayout from "../../components/GovtLayout";

export default function TnGisPage() {
  const [loadingBtn, setLoadingBtn] = useState("");

  const openLink = (url, key) => {
    setLoadingBtn(key);

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setLoadingBtn("");
    }, 400);
  };

  return (
    <GovtLayout>
      <Box sx={{ background: "#eef3ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          {/* TITLE */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              color: "#0c4cac",
              mb: 2,
            }}
          >
            🗺 Tamil Nadu GIS Portal (TNGIS)
          </Typography>

          <Typography
            sx={{ textAlign: "center", fontSize: 17, mb: 4, color: "#333" }}
          >
            Explore Tamil Nadu’s official Geo-Spatial mapping ecosystem with
            administrative maps, satellite layers & digital land insights.
          </Typography>

          {/* MAP FRAME */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              height: 420,
              border: "2px solid #cdd6f5",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              mb: 5,
            }}
          >
            <iframe
              title="Tamil Nadu GIS Map Viewer"
              width="100%"
              height="100%"
              loading="lazy"
              frameBorder="0"
              style={{ filter: "grayscale(20%)" }}
              src="https://maps.google.com/maps?q=Tamil Nadu&t=&z=6&ie=UTF8&iwloc=&output=embed"
            />
          </Paper>

          {/* ACTION CARDS */}
          <Grid container spacing={4} justifyContent="center">

            {/* Map Viewer */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  textAlign: "center",
                  border: "1px solid #d9e1ff",
                  transition: "0.35s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <MapIcon sx={{ fontSize: 50, color: "#0c4cac" }} />
                <Typography sx={{ fontWeight: 700, fontSize: 20, mt: 1 }}>
                  GIS Map Viewer
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#777", mb: 2 }}>
                  View boundaries, roads, elevation layers & public infrastructure.
                </Typography>

                <Button
                  variant="contained"
                  sx={{ background: "#0c4cac", textTransform: "none", fontSize: 16 }}
                  onClick={() => openLink("https://tngis.tn.gov.in", "viewer")}
                >
                  {loadingBtn === "viewer" ? "Opening…" : "Open Viewer"}
                </Button>
              </Paper>
            </Grid>

            {/* Satellite */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "1px solid #d9e6d9",
                  transition: "0.35s",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <SatelliteAltIcon sx={{ fontSize: 50, color: "#009444" }} />
                <Typography sx={{ fontWeight: 700, fontSize: 20, mt: 1 }}>
                  Satellite Imagery
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#777", mb: 2 }}>
                  Access terrain, vegetation, hydrology & environmental overlays.
                </Typography>

                <Button
                  variant="contained"
                  sx={{ background: "#009444", textTransform: "none", fontSize: 16 }}
                  onClick={() => openLink("https://tngis.tn.gov.in/layers", "satellite")}
                >
                  {loadingBtn === "satellite" ? "Loading…" : "View Layers"}
                </Button>
              </Paper>
            </Grid>

            {/* LAND INSIGHTS */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "1px solid #ffe2c2",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
                  transition: "0.35s",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <TravelExploreIcon sx={{ fontSize: 50, color: "#ff7b00" }} />
                <Typography sx={{ fontWeight: 700, fontSize: 20, mt: 1 }}>
                  Land Records & Patta
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#777", mb: 2 }}>
                  Check survey numbers, patta status & ownership verification.
                </Typography>

                <Button
                  variant="contained"
                  sx={{ background: "#ff7b00", textTransform: "none", fontSize: 16 }}
                  onClick={() => openLink("https://eservices.tn.gov.in/landportal", "land")}
                >
                  {loadingBtn === "land" ? "Redirecting…" : "Explore"}
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* FOOTER */}
          <Divider sx={{ my: 5 }} />
          <Typography sx={{ textAlign: "center", fontSize: 14, color: "#666" }}>
            📩 GIS Support: <b>gis-support@tn.gov.in</b> | ☎ Helpline: <b>1800-425-6000</b>
          </Typography>
        </Container>
      </Box>
    </GovtLayout>
  );
}
