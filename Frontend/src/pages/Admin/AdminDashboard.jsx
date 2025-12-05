import { useEffect, useState } from "react";
import {
  Box, Paper, Typography, Button, Chip, Table,
  TableBody, TableCell, TableHead, TableRow,
  TableContainer, ToggleButtonGroup, ToggleButton,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent
} from "@mui/material";

import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {

  const [applications, setApplications] = useState([]);
  const [section, setSection] = useState("Certificates");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // FETCH APPLICATIONS
  useEffect(() => {
    axios.get("http://localhost:8080/applications/admin")
      .then(res => setApplications(res.data));
  }, []);

  // ======================= FILTER LOGIC =======================
  const filteredSectionApps = applications.filter(app => {
    const hasTamil = app.tamilCertificateType && app.tamilCertificateType.trim() !== "";

    const isScheme = hasTamil;
    const isCertificate = !hasTamil;

    if (section === "Schemes") return isScheme;
    return isCertificate;
  });

  // ======================= COUNTS =======================
  const total = filteredSectionApps.length;
  const pending = filteredSectionApps.filter(a => a.status === "Pending").length;
  const approved = filteredSectionApps.filter(a => a.status === "Approved").length;
  const rejected = filteredSectionApps.filter(a => a.status === "Rejected").length;

  const handleView = (app) => {
    setSelectedApp(app);
    setOpenDialog(true);
  };

  // APPROVE STATUS
  const updateStatus = async (app, status) => {
    try {
      await axios.put(
        `http://localhost:8080/applications/status/${app.id}?status=${status}`
      );

      setApplications(prev =>
        prev.map(a => (a.id === app.id ? { ...a, status } : a))
      );

      setToast({
        open: true,
        message: `Application ${status}!`,
        severity: status === "Approved" ? "success" : "error"
      });

    } catch (error) {
      setToast({ open: true, message: "Update failed", severity: "error" });
    }
  };

  // ======================= REJECT FUNCTION (ADDED) =======================
  const rejectApplication = async (app) => {
    try {
      const reason = "Rejected by Admin";

      await axios.put(
        `http://localhost:8080/applications/reject/${app.id}?reason=${reason}`
      );

      setApplications(prev =>
        prev.map(a => (a.id === app.id ? { ...a, status: "Rejected" } : a))
      );

      setToast({
        open: true,
        message: "Application Rejected!",
        severity: "error"
      });

    } catch (error) {
      setToast({
        open: true,
        message: "Reject Failed",
        severity: "error"
      });
    }
  };

  // ======================= EXCEL EXPORT =======================
  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(filteredSectionApps);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, section);
    XLSX.writeFile(wb, `${section}_Applications.xlsx`);
  };

  // ======================= PDF EXPORT =======================
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`${section} Applications Report`, 14, 10);
    autoTable(doc, {
      head: [["Type", "Applicant", "Mobile", "Date", "Status"]],
      body: filteredSectionApps.map(app => [
        app.certificateType +
          (app.tamilCertificateType ? " / " + app.tamilCertificateType : ""),
        app.fullName,
        app.mobile,
        app.appliedDate,
        app.status
      ])
    });
    doc.save("Report.pdf");
  };

  return (
    <Box sx={{ display: "flex", height: 819, background: "#fff3e0" }}>

      <AdminSidebar />

      <Box sx={{ flexGrow: 1, padding: 4 }}>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#ff6f00" }}>
          🏛 Admin Dashboard
        </Typography>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={section}
            exclusive
            onChange={(e, v) => v && setSection(v)}
          >
            <ToggleButton value="Certificates">Certificates</ToggleButton>
            <ToggleButton value="Schemes">Schemes</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            mb: 3
          }}
        >
          <Summary label="Total" value={total} bg="#fff" />
          <Summary label="Pending" value={pending} bg="#ffe0b2" />
          <Summary label="Approved" value={approved} bg="#ffecb3" />
          <Summary label="Rejected" value={rejected} bg="#ffccbc" />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
          <Button variant="contained" sx={{ background: "#ff8f00" }} onClick={exportExcel}>
            📁 Excel
          </Button>
          <Button variant="contained" sx={{ background: "#d84315" }} onClick={exportPDF}>
            📄 PDF
          </Button>
        </Box>

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#ff6f00" }}>
                  {["Type", "Applicant", "Mobile", "Date", "Status", "Actions"].map((t) => (
                    <TableCell key={t} sx={{ color: "#fff", fontWeight: 700 }}>
                      {t}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSectionApps.map(app => (
                  <TableRow key={app.id}>
                    <TableCell>
                      {app.certificateType}
                      {app.tamilCertificateType ? " / " + app.tamilCertificateType : ""}
                    </TableCell>

                    <TableCell>{app.fullName}</TableCell>
                    <TableCell>{app.mobile}</TableCell>
                    <TableCell>{app.appliedDate}</TableCell>

                    <TableCell>
                      <Chip
                        label={app.status}
                        color={
                          app.status === "Approved"
                            ? "success"
                            : app.status === "Rejected"
                              ? "error"
                              : "warning"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleView(app)}
                        >
                          VIEW
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            background:
                              app.status === "Approved" ? "#ffb74d" : "#ff8f00",
                          }}
                          disabled={
                            app.status === "Approved" || app.status === "Rejected"
                          }
                          onClick={() => updateStatus(app, "Approved")}
                        >
                          {app.status === "Approved" ? "APPROVED ✔" : "APPROVE"}
                        </Button>

                        {/* ====== FIXED REJECT BUTTON ====== */}
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            background:
                              app.status === "Rejected" ? "#ffab91" : "#d84315",
                          }}
                          disabled={
                            app.status === "Approved" || app.status === "Rejected"
                          }
                          onClick={() => rejectApplication(app)}   
                        >
                          {app.status === "Rejected" ? "REJECTED ✖" : "REJECT"}
                        </Button>

                      </Box>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ fontWeight: 700 }}>Application Details</DialogTitle>
          <DialogContent dividers sx={{ width: 350 }}>
            {selectedApp && (
              <>
                <b>Name:</b> {selectedApp.fullName} <br />
                <b>Mobile:</b> {selectedApp.mobile} <br />
                <b>Date:</b> {selectedApp.appliedDate} <br />
                <b>Type:</b>{" "}
                {selectedApp.certificateType}
                {selectedApp.tamilCertificateType
                  ? " / " + selectedApp.tamilCertificateType
                  : ""}
              </>
            )}
          </DialogContent>
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
  );
}

// ================== SUMMARY CARD ==================
function Summary({ label, value, bg }) {
  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        borderRadius: 3,
        bgcolor: bg,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
      <Typography sx={{ fontSize: 28, fontWeight: 900 }}>{value}</Typography>
    </Paper>
  );
}
