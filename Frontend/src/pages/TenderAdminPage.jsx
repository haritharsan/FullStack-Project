import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import dayjs from "dayjs";

import AdminSidebar from "../components/AdminSidebar";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function TenderAdminPage() {
  const [tenders, setTenders] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState({
    id: null,
    title: "",
    refNo: "",
    status: "Open",
    lastDate: "",
  });

  const [openEdit, setOpenEdit] = useState(false);

  const validateForm = () => {
    if (!form.title.trim() || !form.refNo.trim() || !form.status.trim() || !form.lastDate.trim()) {
      setToast({ open: true, message: "All fields are required!", severity: "error" });
      return false;
    }
    return true;
  };

  const loadTenders = () => {
    axios
      .get("http://localhost:8080/api/tenders")
      .then((res) => setTenders(res.data))
      .catch(() => alert("Failed loading tenders"));
  };

  useEffect(() => {
    loadTenders();
  }, []);

  const handleAdd = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8080/api/tenders", form)
      .then(() => {
        setToast({ open: true, message: "Tender Added Successfully!", severity: "success" });
        loadTenders();
        setForm({ id: null, title: "", refNo: "", status: "Open", lastDate: "" });
      })
      .catch(() => setToast({ open: true, message: "Add failed!", severity: "error" }));
  };

  const openEditDialog = (t) => {
    setForm({
      id: t.id,
      title: t.title,
      refNo: t.refNo,
      status: t.status,
      lastDate: t.lastDate,
    });
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8080/api/tenders/${form.id}`, form)
      .then(() => {
        setToast({ open: true, message: "Tender Updated!", severity: "success" });
        setOpenEdit(false);
        loadTenders();
      })
      .catch(() => setToast({ open: true, message: "Update failed!", severity: "error" }));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/tenders/${id}`)
      .then(() => {
        setToast({ open: true, message: "Tender Deleted!", severity: "success" });
        loadTenders();
      })
      .catch(() => setToast({ open: true, message: "Delete failed!", severity: "error" }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", background: "#fff3e0", height: "200vh" }}>

        <AdminSidebar />

        <Box sx={{ flexGrow: 1, p: 4, height: 754 }}>

          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 700, color: "#ff6f00", textAlign: "center" }}
          >
            Tender Management
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              mb: 5,
              background: "#fffae8",
              border: "1px solid #ffcc80",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 600, color: "#ff8f00" }}
            >
              ➕ Add New Tender
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <TextField
                label="Tender Title"
                fullWidth
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <TextField
                label="Reference Number"
                fullWidth
                value={form.refNo}
                onChange={(e) => setForm({ ...form, refNo: e.target.value })}
              />

              <TextField
                label="Status"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Upcoming">Upcoming</option>
              </TextField>

              <DatePicker
                label="Last Date"
                value={form.lastDate ? dayjs(form.lastDate, "DD/MM/YYYY") : null}
                onChange={(value) =>
                  setForm({
                    ...form,
                    lastDate: value ? dayjs(value).format("DD/MM/YYYY") : "",
                  })
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                background: "#ff8f00",
                px: 4,
                py: 1.3,
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { background: "#ff6f00" },
              }}
              onClick={handleAdd}
            >
              Add Tender
            </Button>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 4, background: "#FFFFFF" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#ffe0b2" }}>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Ref No</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Last Date</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tenders.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.title}</TableCell>
                    <TableCell>{t.refNo}</TableCell>

                    <TableCell>
                      <Chip
                        label={t.status}
                        sx={{
                          background:
                            t.status.toLowerCase() === "open"
                              ? "#00c853"   // GREEN
                              : t.status.toLowerCase() === "closed"
                                ? "#d50000"   // RED
                                : "#ffeb3b",  // YELLOW (Upcoming)

                          color:
                            t.status.toLowerCase() === "open"
                              ? "white"
                              : t.status.toLowerCase() === "closed"
                                ? "white"
                                : "black",

                          fontWeight: "bold",
                          textTransform: "capitalize"
                        }}
                      />



                    </TableCell>

                    <TableCell>{t.lastDate}</TableCell>

                    <TableCell>
                      <IconButton onClick={() => openEditDialog(t)} sx={{ color: "#ff6f00" }}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(t.id)} sx={{ color: "#c62828" }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Dialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle
              sx={{
                fontWeight: 700,
                color: "white",
                background: "linear-gradient(90deg, #ff8f00, #ff6f00)",
              }}
            >
              ✏️ Update Tender
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ display: "grid", gap: 3 }}>
                <TextField
                  label="Tender Title"
                  fullWidth
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <TextField
                  label="Reference Number"
                  fullWidth
                  value={form.refNo}
                  onChange={(e) => setForm({ ...form, refNo: e.target.value })}
                />

                <TextField
                  label="Status"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Upcoming">Upcoming</option>
                </TextField>

                <DatePicker
                  label="Last Date"
                  value={form.lastDate ? dayjs(form.lastDate, "DD/MM/YYYY") : null}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      lastDate: value ? dayjs(value).format("DD/MM/YYYY") : "",
                    })
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
              <Button
                variant="contained"
                sx={{
                  background: "#ff6f00",
                  fontWeight: 600,
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

        </Box>
      </Box>
    </LocalizationProvider>
  );
}
