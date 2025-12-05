import { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

export default function GalleryAdminPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", category: "" });
  const [image, setImage] = useState(null);

  const [gallery, setGallery] = useState([]);

  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    category: "",
    imageUrl: "",
  });
  const [editImage, setEditImage] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = ["Events", "Awards", "Infrastructure", "Press Meet"];

  const loadGallery = () => {
    axios
      .get("http://localhost:8080/api/gallery")
      .then((res) => setGallery(res.data))
      .catch(() => console.log("Failed to load gallery"));
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // UPLOAD
  const handleUpload = () => {
    if (!form.title.trim() || !form.category.trim() || !image) {
      return setToast({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", form.title);
    formData.append("category", form.category);

    axios
      .post("http://localhost:8080/api/gallery/upload", formData)
      .then(() => {
        setToast({
          open: true,
          message: "Image Uploaded Successfully!",
          severity: "success",
        });
        setForm({ title: "", category: "" });
        setImage(null);
        loadGallery();
      })
      .catch(() => {
        setToast({ open: true, message: "Upload Failed!", severity: "error" });
      });
  };

  // DELETE
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/gallery/${id}`)
      .then(() => {
        setToast({
          open: true,
          message: "Deleted Successfully!",
          severity: "success",
        });
        loadGallery();
      })
      .catch(() => {
        setToast({ open: true, message: "Delete Failed!", severity: "error" });
      });
  };

  // OPEN EDIT
  const openEdit = (img) => {
    setEditData(img);
    setEditDialog(true);
  };

  // UPDATE
  const handleEditSave = () => {
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("category", editData.category);
    if (editImage) formData.append("image", editImage);

    axios
      .put(`http://localhost:8080/api/gallery/${editData.id}`, formData)
      .then(() => {
        setToast({
          open: true,
          message: "Updated Successfully!",
          severity: "success",
        });
        setEditDialog(false);
        loadGallery();
      })
      .catch(() => {
        setToast({ open: true, message: "Update Failed!", severity: "error" });
      });
  };

  return (
    <Box sx={{ display: "flex", background: "#fff3e0", minHeight: "100vh" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Container maxWidth="lg">

          {/* PAGE TITLE */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "#ff6f00",
              mb: 4,
            }}
          >
            🖼️ Gallery Management (Admin)
          </Typography>

          {/* UPLOAD SECTION */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              background: "#fffae8",
              border: "1px solid #ffcc80",
            }}
            elevation={2}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ff8f00", fontWeight: 600, mb: 2 }}
            >
              ➕ Upload New Image
            </Typography>

            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="Image Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                fullWidth
              />

              <TextField
                label="Category"
                select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                variant="contained"
                component="label"
                sx={{
                  background: "#ff8f00",
                  "&:hover": { background: "#ff6f00" },
                }}
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>

              {image && (
                <Typography sx={{ color: "#444" }}>
                  Selected: {image.name}
                </Typography>
              )}

              <Button
                variant="contained"
                sx={{
                  background: "#ff6f00",
                  "&:hover": { background: "#e65c00" },
                }}
                onClick={handleUpload}
              >
                Upload Image
              </Button>
            </Box>
          </Paper>

          {/* GALLERY GRID */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#ff6f00", mb: 2 }}
          >
            📸 Uploaded Images
          </Typography>

          <Grid container spacing={3}>
            {gallery.map((img) => (
              <Grid item xs={12} sm={6} md={4} key={img.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "white",
                    border: "1px solid #ffcc80",
                  }}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  <Typography sx={{ fontWeight: 600, mt: 1 }}>
                    {img.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#777" }}>
                    {img.category}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <IconButton
                      onClick={() => openEdit(img)}
                      sx={{ color: "#ff6f00" }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDelete(img.id)}
                      sx={{ color: "#c62828" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

        </Container>

        {/* EDIT MODAL */}
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} fullWidth>
          <DialogTitle sx={{ background: "#ff8f00", color: "white" }}>
            ✏️ Edit Image
          </DialogTitle>

          <DialogContent sx={{ p: 3, display: "grid", gap: 2 }}>
            <TextField
              label="Title"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Category"
              select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              component="label"
              sx={{ background: "#ff6f00" }}
            >
              Change Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setEditImage(e.target.files[0])}
              />
            </Button>

            {editImage && <Typography>Selected: {editImage.name}</Typography>}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>

            <Button
              variant="contained"
              sx={{ background: "#ff8f00" }}
              onClick={handleEditSave}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Toast */}
        <Snackbar
          open={toast.open}
          autoHideDuration={2000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert severity={toast.severity}>{toast.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
