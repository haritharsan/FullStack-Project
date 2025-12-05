import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

export default function AdminAddData() {
  const navigate = useNavigate();

  const [section, setSection] = useState("Certificates");

  const [certificates, setCertificates] = useState([]);
  const [schemes, setSchemes] = useState([]);

  const [form, setForm] = useState({
    code: "",
    title: "",
    description: "",
    eligibility: "",
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadData = () => {
    axios.get("http://localhost:8080/api/certificate-types")
      .then((r) => setCertificates(r.data));

    axios.get("http://localhost:8080/api/schemes")
      .then((r) => setSchemes(r.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = async () => {
    if (section === "Certificates" && (!form.code || !form.title)) {
      return setToast({
        open: true,
        message: "Fill Certificate Code & Title",
        severity: "warning",
      });
    }

    if (
      section === "Schemes" &&
      (!form.title || !form.description || !form.eligibility)
    ) {
      return setToast({
        open: true,
        message: "Fill Scheme Details Fully",
        severity: "warning",
      });
    }

    const payload =
      section === "Certificates"
        ? { code: form.code, title: form.title }
        : {
            schemeName: form.title,
            description: form.description,
            eligibility: form.eligibility,
          };

    const url =
      section === "Certificates"
        ? "http://localhost:8080/api/certificate-types/add"
        : "http://localhost:8080/api/schemes/add";

    try {
      await axios.post(url, payload);
      setForm({ code: "", title: "", description: "", eligibility: "" });
      loadData();
      setToast({ open: true, message: "Added Successfully!", severity: "success" });
    } catch {
      setToast({ open: true, message: "Failed to Add!", severity: "error" });
    }
  };

  const editItem = (item) => {
    setEditMode(true);
    setEditId(item.id);

    if (section === "Certificates") {
      setForm({ code: item.code, title: item.title });
    } else {
      setForm({
        title: item.schemeName,
        description: item.description,
        eligibility: item.eligibility,
      });
    }
  };

  const updateItem = async () => {
    const payload =
      section === "Certificates"
        ? { code: form.code, title: form.title }
        : {
            schemeName: form.title,
            description: form.description,
            eligibility: form.eligibility,
          };

    const url =
      section === "Certificates"
        ? `http://localhost:8080/api/certificate-types/update/${editId}`
        : `http://localhost:8080/api/schemes/update/${editId}`;

    try {
      await axios.put(url, payload);
      setToast({ open: true, message: "Updated Successfully!", severity: "success" });
      setEditMode(false);
      setEditId(null);
      setForm({ code: "", title: "", description: "", eligibility: "" });
      loadData();
    } catch {
      setToast({ open: true, message: "Update Failed!", severity: "error" });
    }
  };

  const deleteItem = async (id) => {
    const url =
      section === "Certificates"
        ? `http://localhost:8080/api/certificate-types/${id}`
        : `http://localhost:8080/api/schemes/${id}`;

    try {
      await axios.delete(url);
      loadData();
      setToast({ open: true, message: "Deleted Successfully!", severity: "success" });
    } catch {
      setToast({ open: true, message: "Delete Failed!", severity: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", background: "#fff3e0" }}>
      
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "700", color: "#ff6f00" }}>
            ➕ Manage Data
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={section}
            exclusive
            onChange={(e, v) => v && setSection(v)}
          >
            <ToggleButton value="Certificates">📄 Certificates</ToggleButton>
            <ToggleButton value="Schemes">🎯 Schemes</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper sx={{ p: 3, mb: 3, background: "#fffae8", borderRadius: 3, border: "1px solid #ffcc80" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#ff8f00", fontWeight: 600 }}>
            {editMode
              ? "✏ Edit Data"
              : section === "Certificates"
              ? "Add New Certificate Type"
              : "Add New Scheme"}
          </Typography>

          <Box sx={{ display: "grid", gap: 2 }}>

            {section === "Certificates" && (
              <>
                <TextField
                  label="Certificate Code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
                <TextField
                  label="Certificate Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </>
            )}

            {section === "Schemes" && (
              <>
                <TextField
                  label="Scheme Name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <TextField
                  label="Description"
                  multiline
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <TextField
                  label="Eligibility"
                  multiline
                  rows={2}
                  value={form.eligibility}
                  onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                />
              </>
            )}

            <Button
              variant="contained"
              sx={{
                background: editMode ? "#ff8f00" : "#ff6f00",
                fontWeight: "bold",
                "&:hover": { background: editMode ? "#e65c00" : "#e65c00" },
              }}
              onClick={editMode ? updateItem : addItem}
            >
              {editMode ? "✏ Update" : "➕ Add"}
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#ff6f00", fontWeight: 600 }}>
            Stored Data
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#ff6f00" }}>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(section === "Certificates" ? certificates : schemes).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {section === "Certificates"
                        ? `${item.code} - ${item.title}`
                        : `${item.schemeName} (Eligibility: ${item.eligibility})`}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ mr: 1, background: "#ff8f00" }}
                        onClick={() => editItem(item)}
                      >
                        ✏ Edit
                      </Button>

                      <Button
                        variant="contained"
                        sx={{ background: "#c62828" }}
                        onClick={() => deleteItem(item.id)}
                      >
                        🗑 Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>

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
