import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Button, Stepper, Step, StepLabel, Fade, Chip,
  Dialog, DialogTitle, DialogContent, TextField, Snackbar, Alert
} from "@mui/material";
import jsPDF from "jspdf";
import axios from "axios";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EditIcon from "@mui/icons-material/Edit";

export default function UserDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [view, setView] = useState("track");
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  // ⭐ EDIT STATES
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  // ⭐ SNACKBAR STATE
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:8080/applications/track/email/${user.email}`)
      .then((res) => setApplications(res.data))
      .catch(() => setApplications([]));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ⭐ SAVE PROFILE + SNACKBAR
  const saveProfile = () => {
    axios
      .put(`http://localhost:8080/update/${user.id}`, editData)
      .then(() => {
        localStorage.setItem("user", JSON.stringify(editData));
        setEditMode(false);

        setSnack({
          open: true,
          message: "Profile Updated Successfully 🎉",
          type: "success",
        });
      })
      .catch(() =>
        setSnack({
          open: true,
          message: "Failed to Update Profile ❌",
          type: "error",
        })
      );
  };

  // PDF
  const downloadPDF = async (app) => {
    const pdf = new jsPDF();
    const logo = new Image();
    logo.src = "/tnlogo.png";

    await new Promise((resolve) => (logo.onload = resolve));

    pdf.setGState(pdf.GState({ opacity: 0.15 }));
    pdf.addImage(logo, "PNG", 40, 30, 130, 130);
    pdf.setGState(pdf.GState({ opacity: 1 }));

    pdf.setFontSize(18);
    pdf.text("Government of Tamil Nadu", 20, 20);

    pdf.setFontSize(14);
    pdf.text(`Certificate: ${app.certificateType}`, 20, 50);
    pdf.text(`Applicant Name: ${app.fullName}`, 20, 65);
    pdf.text(`Status: ${app.status}`, 20, 80);
    pdf.text(`Issued Date: ${new Date().toLocaleDateString()}`, 20, 95);

    pdf.save(`${app.certificateType}.pdf`);
  };

  const stepLabels = ["Submitted", "Under Review", "Completed"];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#EEF5EF",
        position: "relative",
        margin: -1,

        "&::before": {
          content: '""',
          position: "fixed",
          width: "550px",
          height: "550px",
          bottom: "10%",
          right: "50%",
          transform: "translateX(50%)",
          backgroundImage: `url('/tnlogo.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.07,
          zIndex: 0,
          pointerEvents: "none",
        }
      }}
    >

      {/* HEADER */}
      <Box sx={{ textAlign: "center", background: "#015C3A", color: "white", py: 2 }}>
        <Typography variant="h6">Tamil Nadu e-Governance Agency</Typography>
        <Typography variant="h5" fontWeight={900}>e-Sevai | இ-சேவை</Typography>
      </Box>

      {/* NAVIGATION */}
      <Box sx={{
        background: "#024A2A",
        display: "flex",
        justifyContent: "center",
        gap: 2,
        py: 1
      }}>
        <Button sx={{ color: "white" }} startIcon={<DescriptionIcon />} onClick={() => navigate("/certificates")}>
          Certificates / சான்றிதழ்கள்
        </Button>

        <Button sx={{ color: "white" }} startIcon={<AccountBalanceWalletIcon />} onClick={() => navigate("/schemes")}>
          Schemes / திட்டங்கள்
        </Button>

        <Button sx={{ color: "white" }} startIcon={<ListAltIcon />} onClick={() => setView("track")}>
          Track Status / நிலை கண்காணிப்பு
        </Button>

        <Button sx={{ color: "white" }} startIcon={<AccountCircleIcon />} onClick={() => setView("profile")}>
          Profile / சுயவிவரம்
        </Button>

        <Button sx={{ color: "white" }} startIcon={<ExitToAppIcon />} onClick={logout}>
          Logout / வெளியேறு
        </Button>

      </Box>

      {/* BODY */}
      <Box sx={{ p: 3, position: "relative", zIndex: 1 }}>

        {/* TRACK STATUS */}
        {view === "track" && (
          <Fade in timeout={500}>
            <Box>
              {applications.length === 0 ? (
                <Fade in timeout={700}>
                  <Typography sx={{ textAlign: "center", mt: 4, fontSize: "18px", opacity: 0.7 }}>
                    No applications submitted yet.
                  </Typography>
                </Fade>
              ) : (
                applications.map((app) => (
                  <Fade in timeout={500} key={app.id}>
                    <Box sx={{ mb: 2, transition: "0.3s" }}>

                      {/* Main Application Card */}
                      <Paper
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderRadius: 2,
                          boxShadow: 3,
                          transition: "0.3s",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: 6
                          }
                        }}
                        onClick={() =>
                          setSelectedApp(selectedApp?.id === app.id ? null : app)
                        }
                      >
                        <Box>
                          <Typography fontWeight="bold" fontSize="17px">
                            {app.certificateType}
                          </Typography>

                          <Chip
                            sx={{ mt: 1 }}
                            icon={
                              app.status === "Approved" ? (
                                <VerifiedIcon />
                              ) : app.status === "Rejected" ? (
                                <ReportProblemIcon />
                              ) : (
                                <PendingIcon />
                              )
                            }
                            label={app.status}
                            color={
                              app.status === "Approved"
                                ? "success"
                                : app.status === "Rejected"
                                  ? "error"
                                  : "warning"
                            }
                          />
                        </Box>

                        {selectedApp?.id === app.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Paper>

                      {/* Expanded Details */}
                      {selectedApp?.id === app.id && (
                        <Fade in timeout={500}>
                          <Paper
                            sx={{
                              mt: 1,
                              p: 3,
                              borderRadius: 2,
                              boxShadow: 4,
                              animation: "slideDown 0.4s ease"
                            }}
                          >
                            <Typography fontWeight="bold" fontSize="17px">
                              {selectedApp.certificateType}
                            </Typography>

                            {/* Stepper Animation */}
                            <Fade in timeout={600}>
                              <Stepper
                                alternativeLabel
                                sx={{ mt: 2 }}
                                activeStep={
                                  selectedApp.status === "Pending"
                                    ? 1
                                    : selectedApp.status === "Approved"
                                      ? 2
                                      : 0
                                }
                              >
                                {stepLabels.map((s) => (
                                  <Step key={s}>
                                    <StepLabel>{s}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </Fade>

                            {/* Action Buttons */}
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                              <Button
                                fullWidth
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                disabled={selectedApp.status !== "Approved"}
                                onClick={() => downloadPDF(selectedApp)}
                                sx={{
                                  py: 1.3,
                                  fontSize: "15px",
                                  borderRadius: 2
                                }}
                              >
                                Download
                              </Button>

                              <Button
                                fullWidth
                                startIcon={<VisibilityIcon />}
                                variant="outlined"
                                onClick={() => setViewModal(true)}
                                sx={{
                                  py: 1.3,
                                  fontSize: "15px",
                                  borderRadius: 2
                                }}
                              >
                                View
                              </Button>
                            </Box>
                          </Paper>
                        </Fade>
                      )}
                    </Box>
                  </Fade>
                ))
              )}
            </Box>
          </Fade>
        )}



        {/* ⭐ PROFILE EDIT ⭐ */}
        {view === "profile" && (
          <Fade in timeout={600}>
            <Box
              sx={{
                p: 4,
                maxWidth: 650,
                mx: "auto",
                borderRadius: 4,
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                animation: "slideUp 0.6s ease",
              }}
            >
              {/* HEADING */}
              <Fade in timeout={700}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight={700}
                  mb={3}
                  color="#024F2E"
                  sx={{ letterSpacing: "1px" }}
                >
                  User Profile
                </Typography>
              </Fade>

              {/* AVATAR */}
              <Fade in timeout={800}>
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      bgcolor: "#024F2E",
                      color: "white",
                      fontSize: 40,
                      boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.35)"
                      }
                    }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                </Box>
              </Fade>

              {/* EDIT MODE */}
              {editMode ? (
                <Fade in timeout={500}>
                  <Box>
                    <Typography fontWeight={600} sx={{ fontSize: 18 }}>
                      Edit Your Details
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                        mt: 2,
                        animation: "fadeIn 0.5s ease",
                      }}
                    >
                      <TextField label="Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                      <TextField label="Email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                      <TextField label="Mobile" value={editData.mobile} onChange={(e) => setEditData({ ...editData, mobile: e.target.value })} />
                      <TextField label="District" value={editData.district} onChange={(e) => setEditData({ ...editData, district: e.target.value })} />
                      <TextField label="Taluk" value={editData.taluk} onChange={(e) => setEditData({ ...editData, taluk: e.target.value })} />
                      <TextField label="Aadhaar" value={editData.aadhaar} onChange={(e) => setEditData({ ...editData, aadhaar: e.target.value })} />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#024F2E",
                          px: 3,
                          py: 1,
                          borderRadius: 2,
                          "&:hover": { background: "#013820" }
                        }}
                        onClick={saveProfile}
                      >
                        Save
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ px: 3, py: 1, borderRadius: 2 }}
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              ) : (
                <Fade in timeout={500}>
                  <Box>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 3,
                        fontSize: 16,
                        animation: "fadeIn 0.6s ease",
                      }}
                    >
                      <Typography><b>Name:</b> {user?.name}</Typography>
                      <Typography><b>Email:</b> {user?.email}</Typography>
                      <Typography><b>Mobile:</b> {user?.mobile}</Typography>
                      <Typography><b>District:</b> {user?.district}</Typography>
                      <Typography><b>Taluk:</b> {user?.taluk}</Typography>
                      <Typography><b>Aadhaar:</b> XXXX-XXXX-{String(user?.aadhaar).slice(-4)}</Typography>
                    </Box>

                    {/* EDIT BUTTON */}
                    <Fade in timeout={700}>
                      <Box textAlign="center" mt={4}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          sx={{
                            background: "#0A6B37",
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            fontSize: 16,
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                            "&:hover": {
                              background: "#084f2a",
                            }
                          }}
                          onClick={() => setEditMode(true)}
                        >
                          Edit Profile
                        </Button>
                      </Box>
                    </Fade>
                  </Box>
                </Fade>
              )}

            </Box>
          </Fade>
        )}
      </Box> 

      {/* VIEW MODAL */}
      <Dialog open={viewModal} onClose={() => setViewModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          📄 Application Details
        </DialogTitle>

        <DialogContent>
          {selectedApp &&
            Object.entries(selectedApp).map(([key, value]) => (
              <Typography key={key} sx={{ my: 1 }}>
                <b>{key}:</b> {value}
              </Typography>
            ))}
        </DialogContent>
      </Dialog>

      {/* ⭐ SNACKBAR (SUCCESS + ERROR) ⭐ */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.type} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}
