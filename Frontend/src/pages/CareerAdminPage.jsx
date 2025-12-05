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
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

export default function CareerAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [form, setForm] = useState({
    id: null,
    title: "",
    location: "",
    experience: "",
    closingDate: "",
    summary: "",
    responsibilities: "",
    skills: "",
  });

  const [editOpen, setEditOpen] = useState(false);

  // Load jobs
  const loadJobs = () => {
    axios
      .get("http://localhost:8080/api/careers")
      .then((res) => setJobs(res.data))
      .catch(() => alert("Failed to load jobs"));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Validate
  const validateForm = () => {
    const fields = ["title", "location", "experience", "closingDate", "summary"];
    for (let f of fields) {
      if (!form[f].trim()) {
        setToast({ open: true, message: "All fields are required!", severity: "error" });
        return false;
      }
    }
    return true;
  };

  // Add
  const handleAdd = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8080/api/careers", form)
      .then(() => {
        setToast({ open: true, message: "Career Added Successfully!", severity: "success" });
        loadJobs();
        setForm({
          id: null,
          title: "",
          location: "",
          experience: "",
          closingDate: "",
          summary: "",
          responsibilities: "",
          skills: "",
        });
      })
      .catch(() => setToast({ open: true, message: "Add failed!", severity: "error" }));
  };

  // Open edit
  const openEdit = (job) => {
    setForm(job);
    setEditOpen(true);
  };

  // Update
  const handleUpdate = () => {
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8080/api/careers/${form.id}`, form)
      .then(() => {
        setToast({ open: true, message: "Updated successfully!", severity: "success" });
        setEditOpen(false);
        loadJobs();
      })
      .catch(() => setToast({ open: true, message: "Update failed", severity: "error" }));
  };

  // Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/careers/${id}`)
      .then(() => {
        setToast({ open: true, message: "Deleted Successfully!", severity: "success" });
        loadJobs();
      })
      .catch(() => setToast({ open: true, message: "Delete failed", severity: "error" }));
  };

  return (
    <Box sx={{ display: "flex", background: "#fff3e0", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Container maxWidth="lg">

          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "#ff6f00",
              fontWeight: 700,
            }}
          >
            Career Management (Admin)
          </Typography>

          {/* ADD JOB FORM */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: "#fff8e6",
              border: "1px solid #ffcc80",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#ff8f00", fontWeight: 700 }}>
              ➕ Add Career Opportunity
            </Typography>

            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField fullWidth label="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <TextField fullWidth label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <TextField fullWidth label="Experience Required" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />

              <TextField
                label="Closing Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form.closingDate}
                onChange={(e) => setForm({ ...form, closingDate: e.target.value })}
              />

              <TextField multiline rows={3} label="Job Summary" fullWidth value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
              <TextField multiline rows={3} label="Responsibilities" fullWidth value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} />
              <TextField multiline rows={2} label="Skills Required" fullWidth value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />

              <Button
                variant="contained"
                sx={{
                  background: "#ff8f00",
                  "&:hover": { background: "#ff6f00" }
                }}
                onClick={handleAdd}
              >
                Add Career
              </Button>
            </Box>
          </Paper>

          {/* JOB TABLE */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#ff6f00" }}>
              📋 Careers List
            </Typography>

            <Table>
              <TableHead>
                <TableRow sx={{ background: "#ffecb3" }}>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Location</b></TableCell>
                  <TableCell><b>Closing Date</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.closingDate}</TableCell>
                    <TableCell>
                      <IconButton sx={{ color: "#ff6f00" }} onClick={() => openEdit(job)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton sx={{ color: "red" }} onClick={() => handleDelete(job.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

        </Container>
      </Box>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle sx={{ background: "#ff8f00", color: "white" }}>
          ✏️ Edit Career
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField label="Job Title" fullWidth value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField label="Location" fullWidth value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <TextField label="Experience" fullWidth value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />

            <TextField
              label="Closing Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={form.closingDate}
              onChange={(e) => setForm({ ...form, closingDate: e.target.value })}
            />

            <TextField multiline rows={3} label="Summary" fullWidth value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            <TextField multiline rows={3} label="Responsibilities" fullWidth value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} />
            <TextField multiline rows={2} label="Skills" fullWidth value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            sx={{ background: "#ff8f00" }}
            onClick={handleUpdate}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>

    </Box>
  );
}
