import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Select,
  MenuItem
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

export default function NewsAdminPage() {
  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    date: "",
    content: "",
    featured: false,
  });

  const [openEdit, setOpenEdit] = useState(false);

  const validateForm = () => {
    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.date.trim() ||
      !form.content.trim()
    ) {
      setToast({ open: true, message: "All fields are required!", severity: "error" });
      return false;
    }
    return true;
  };

  const loadNews = () => {
    axios
      .get("http://localhost:8080/api/news")
      .then((res) => setNewsList(res.data))
      .catch(() => alert("Failed to load news"));
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleAdd = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8080/api/news", form)
      .then(() => {
        setToast({ open: true, message: "News Added Successfully!", severity: "success" });
        loadNews();
        setForm({
          id: null,
          title: "",
          category: "",
          date: "",
          content: "",
          featured: false,
        });
      })
      .catch(() => setToast({ open: true, message: "Add Failed!", severity: "error" }));
  };

  const openEditDialog = (n) => {
    setForm({
      id: n.id,
      title: n.title,
      category: n.category,
      date: n.date,
      content: n.content,
      featured: n.featured,
    });
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8080/api/news/${form.id}`, form)
      .then(() => {
        setToast({ open: true, message: "News Updated!", severity: "success" });
        setOpenEdit(false);
        loadNews();
      })
      .catch(() => setToast({ open: true, message: "Update Failed!", severity: "error" }));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/news/${id}`)
      .then(() => {
        setToast({ open: true, message: "News Deleted!", severity: "success" });
        loadNews();
      })
      .catch(() => setToast({ open: true, message: "Delete Failed!", severity: "error" }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", background: "#fff3e0", minHeight: "100vh" }}>

        <AdminSidebar />

        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Container maxWidth="lg">

            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: 700, color: "#ff6f00", mb: 4 }}
            >
               News Management (Admin)
            </Typography>

            <Paper
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 4,
                background: "#fffae8",
                border: "1px solid #ffcc80",
              }}
              elevation={3}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ff8f00" }}>
                ➕ Add News
              </Typography>

              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="News Title"
                  value={form.title}
                  error={!form.title.trim()}
                  helperText={!form.title.trim() ? "Required" : ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  fullWidth
                />

                <Select
                  value={form.category}
                  displayEmpty
                  fullWidth
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  error={!form.category.trim()}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  <MenuItem value="Announcements">Announcements</MenuItem>
                  <MenuItem value="Services">Services</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Governance">Governance</MenuItem>
                </Select>

                <DatePicker
                  label="Select Date"
                  value={form.date ? dayjs(form.date) : null}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      date: value ? dayjs(value).format("YYYY-MM-DD") : "",
                    })
                  }
                />

                <TextField
                  label="News Content"
                  multiline
                  rows={4}
                  value={form.content}
                  error={!form.content.trim()}
                  helperText={!form.content.trim() ? "Required" : ""}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  fullWidth
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                    />
                  }
                  label="Featured News"
                />

                <Button
                  variant="contained"
                  sx={{
                    background: "#ff8f00",
                    "&:hover": { background: "#ff6f00" }
                  }}
                  onClick={handleAdd}
                >
                  Add News
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 4 }} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#ffecb3" }}>
                    <TableCell><b>Title</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Featured</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {newsList.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell>{n.title}</TableCell>
                      <TableCell>{n.category}</TableCell>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{n.featured ? "Yes" : "No"}</TableCell>

                      <TableCell>
                        <IconButton onClick={() => openEditDialog(n)} sx={{ color: "#ff6f00" }}>
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleDelete(n.id)} sx={{ color: "#c62828" }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
              <DialogTitle sx={{ background: "#ff8f00", color: "white" }}>
                ✏️ Edit News
              </DialogTitle>

              <DialogContent sx={{ p: 3 }}>
                <Box sx={{ display: "grid", gap: 2 }}>
                  <TextField
                    label="News Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    fullWidth
                  />

                  <Select
                    value={form.category}
                    fullWidth
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <MenuItem value="Announcements">Announcements</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Governance">Governance</MenuItem>
                  </Select>

                  <DatePicker
                    label="Select Date"
                    value={form.date ? dayjs(form.date) : null}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        date: value ? dayjs(value).format("YYYY-MM-DD") : "",
                      })
                    }
                  />

                  <TextField
                    label="News Content"
                    multiline
                    rows={4}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    fullWidth
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      />
                    }
                    label="Featured"
                  />
                </Box>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                <Button variant="contained" sx={{ background: "#ff6f00" }} onClick={handleUpdate}>
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={toast.open}
              autoHideDuration={2000}
              onClose={() => setToast({ ...toast, open: false })}
            >
              <Alert severity={toast.severity}>{toast.message}</Alert>
            </Snackbar>

          </Container>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
