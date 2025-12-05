import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GovtLayout from "../../components/GovtLayout";
import axios from "axios";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [gallery, setGallery] = useState([]);

  const filters = ["All", "Events", "Awards", "Infrastructure", "Press Meet"];

  // ------------------------------
  // ⭐ Load from Backend API
  // ------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/gallery")
      .then((res) => setGallery(res.data))
      .catch((err) => console.log("Error loading gallery:", err));
  }, []);

  // ------------------------------
  // ⭐ Filter Logic (Dynamic)
  // ------------------------------
  const filteredList =
    activeFilter === "All"
      ? gallery
      : gallery.filter((img) => img.category === activeFilter);

  return (
    <GovtLayout>
      <Box sx={{ background: "#f5f8ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 3, color: "#0c4cac" }}
          >
            Media Gallery
          </Typography>

          <Typography sx={{ textAlign: "center", mb: 4, fontSize: 16, color: "#555" }}>
            Photos from Governance Events, Awards, Infrastructure & Press Meets
          </Typography>

          {/* FILTER BUTTONS */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
            {filters.map((filter, index) => (
              <Chip
                key={index}
                label={filter}
                clickable
                onClick={() => setActiveFilter(filter)}
                sx={{
                  fontWeight: 600,
                  background: activeFilter === filter ? "#0c4cac" : "#e7efff",
                  color: activeFilter === filter ? "white" : "#0c4cac",
                  "&:hover": {
                    background: activeFilter === filter ? "#083b8c" : "#d0e3ff",
                  },
                }}
              />
            ))}
          </Box>

          {/* CARD GRID */}
          <Grid container spacing={3}>
            {filteredList.map((img, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper
                  elevation={3}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 6px 18px rgba(0,0,0,0.20)",
                    },
                  }}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    style={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                  <Typography
                    sx={{
                      p: 2,
                      fontWeight: 600,
                      textAlign: "center",
                      fontSize: 15,
                      background: "#fff",
                      borderTop: "1px solid #ddd",
                    }}
                  >
                    {img.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Typography sx={{ textAlign: "center", mt: 6, fontSize: 13, color: "#777" }}>
            Media curated by Tamil Nadu e-Governance Agency — Updated regularly
          </Typography>
        </Container>

        {/* IMAGE MODAL */}
        <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: 6,
              maxWidth: "90vw",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setSelectedImage(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <img
              src={selectedImage?.imageUrl}
              alt="Preview"
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />

            <Typography sx={{ mt: 1, textAlign: "center", fontWeight: 600 }}>
              {selectedImage?.title}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </GovtLayout>
  );
}
