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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

export default function ProjectAdminPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    id: null,
    sno: "",
    projectName: "",
    department: "",
  });

  const [openEdit, setOpenEdit] = useState(false);

  const validateForm = () => {
    if (!form.sno || !form.projectName.trim() || !form.department.trim()) {
      setToast({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
      return false;
    }
    return true;
  };

  const loadProjects = () => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => alert("Failed to load projects"));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8080/api/projects", form)
      .then(() => {
        setToast({
          open: true,
          message: "Project Added Successfully!",
          severity: "success",
        });
        loadProjects();
        setForm({ id: null, sno: "", projectName: "", department: "" });
      })
      .catch(() =>
        setToast({ open: true, message: "Add Failed!", severity: "error" })
      );
  };

  const openEditDialog = (p) => {
    setForm({
      id: p.id,
      sno: p.sno,
      projectName: p.projectName,
      department: p.department,
    });
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8080/api/projects/${form.id}`, form)
      .then(() => {
        setToast({
          open: true,
          message: "Project Updated Successfully!",
          severity: "success",
        });
        setOpenEdit(false);
        loadProjects();
      })
      .catch(() =>
        setToast({ open: true, message: "Update Failed!", severity: "error" })
      );
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/projects/${id}`)
      .then(() => {
        setToast({
          open: true,
          message: "Project Deleted Successfully!",
          severity: "success",
        });
        loadProjects();
      })
      .catch(() =>
        setToast({ open: true, message: "Delete Failed!", severity: "error" })
      );
  };

  return (
    <Box sx={{ display: "flex", background: "#fff3e0", minHeight: "100vh" }}>
      
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Container maxWidth="md">

          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 4,
              color: "#ff6f00",
            }}
          >
            🟧 Project Management
          </Typography>

          <Paper
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: "#fffae8",
              border: "1px solid #ffcc80",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#ff8f00" }}>
              ➕ Add New Project
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              <TextField
                label="S.No"
                type="number"
                value={form.sno}
                onChange={(e) => setForm({ ...form, sno: e.target.value })}
                error={!form.sno}
                helperText={!form.sno ? "Required" : ""}
              />

              <TextField
                label="Project Name"
                value={form.projectName}
                onChange={(e) =>
                  setForm({ ...form, projectName: e.target.value })
                }
                error={!form.projectName}
                helperText={!form.projectName ? "Required" : ""}
              />

              <TextField
                label="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                sx={{ gridColumn: "1 / -1" }}
                error={!form.department}
                helperText={!form.department ? "Required" : ""}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                background: "#ff8f00",
                "&:hover": { background: "#ff6f00" },
                px: 4,
                fontWeight: 600,
              }}
              onClick={handleAdd}
            >
              Add Project
            </Button>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#ffe0b2" }}>
                  <TableCell><b>S.No</b></TableCell>
                  <TableCell><b>Project Name</b></TableCell>
                  <TableCell><b>Department</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {projects.map((p) => (
                  <TableRow
                    key={p.id}
                    sx={{ "&:hover": { background: "#fff4e0" } }}
                  >
                    <TableCell>{p.sno}</TableCell>
                    <TableCell>{p.projectName}</TableCell>
                    <TableCell>{p.department}</TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => openEditDialog(p)}
                        sx={{ color: "#ff6f00" }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(p.id)}
                        sx={{ color: "#c62828" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
            <DialogTitle
              sx={{
                background: "#ff8f00",
                color: "white",
                fontWeight: 700,
              }}
            >
              ✏️ Edit Project
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="S.No"
                  type="number"
                  value={form.sno}
                  onChange={(e) => setForm({ ...form, sno: e.target.value })}
                />

                <TextField
                  label="Project Name"
                  value={form.projectName}
                  onChange={(e) =>
                    setForm({ ...form, projectName: e.target.value })
                  }
                />

                <TextField
                  label="Department"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpenEdit(false)}>Cancel</Button>

              <Button
                variant="contained"
                sx={{
                  background: "#ff6f00",
                  "&:hover": { background: "#e65c00" },
                }}
                onClick={handleUpdate}
              >
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
  );
}
