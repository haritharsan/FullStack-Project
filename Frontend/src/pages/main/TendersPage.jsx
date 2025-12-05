import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import GovtLayout from "../../components/GovtLayout";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

export default function TendersPage() {

  const filters = ["All", "Open", "Closed", "Upcoming"];

  // Backend dynamic tender list
  const [tendersData, setTendersData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/tenders")
      .then((res) => {
        setTendersData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching tenders:", err);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // NEW COLOR LOGIC (STRONG GREEN, RED, YELLOW)
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "#00c853";   // 🟢 GREEN
      case "closed":
        return "#d50000";   // 🔴 RED
      case "upcoming":
        return "#ffeb3b";   // 🟡 YELLOW
      default:
        return "#757575";
    }
  };

  // ---------------- PDF Generator ----------------
  const generatePDF = (tender, action) => {
    const doc = new jsPDF();

    const gState = doc.GState({ opacity: 0.2 });
    doc.setGState(gState);

    doc.addImage("/tnlogo.png", "PNG", 40, 40, 130, 130);

    doc.setGState(doc.GState({ opacity: 1 }));

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Tamil Nadu Government", 14, 20);
    doc.text("Tender Notice Document", 14, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Tender Title: ${tender.title}`, 14, 50);
    doc.text(`Reference Number: ${tender.refNo}`, 14, 60);
    doc.text(`Status: ${tender.status}`, 14, 70);
    doc.text(`Submission Last Date: ${tender.lastDate}`, 14, 80);

    doc.line(14, 85, 195, 85);

    doc.setFont("helvetica", "bold");
    doc.text("Scope of Work:", 14, 100);

    doc.setFont("helvetica", "normal");
    doc.text(
      "The selected vendor will implement, test, and deploy the proposed system. All deliverables must comply with Indian IT Act, cybersecurity standards and Tamil Nadu e-Governance infrastructure guidelines.",
      14,
      110,
      { maxWidth: 180 }
    );

    doc.setFont("helvetica", "bold");
    doc.text("Eligibility Requirements:", 14, 145);

    doc.setFont("helvetica", "normal");
    doc.text("- Minimum 3 years industry experience", 14, 155);
    doc.text("- Should have executed large-scale IT/government projects", 14, 163);
    doc.text("- Must be a registered legal entity with PAN & GST number", 14, 171);
    doc.text("- Cyber Security & Data Privacy compliance is mandatory", 14, 179);

    doc.line(14, 190, 195, 190);

    doc.setFont("helvetica", "bold");
    doc.text("Department Contact:", 14, 205);

    doc.setFont("helvetica", "normal");
    doc.text("Tamil Nadu e-Governance Agency (TNeGA)", 14, 215);
    doc.text("Email: tenders@tn.gov.in", 14, 223);
    doc.text("Phone: 044-25276100", 14, 231);

    doc.setFont("helvetica", "bold");
    doc.text("Authorized Digital Signature:", 14, 255);

    doc.rect(150, 240, 45, 25);
    doc.setFontSize(10);
    doc.text("Official Seal / Sign", 153, 255);

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    if (action === "view") window.open(url, "_blank");
    else {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tender.refNo}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // ---------------- Filter Logic ----------------
  const filteredTenders = tendersData.filter((item) => {
    return (
      (selectedFilter === "All" || item.status === selectedFilter) &&
      (item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.refNo?.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <GovtLayout>
      <Box sx={{ background: "#f5f8ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 700, color: "#0c4cac", mb: 3 }}>
            📄 Tenders & Government Notices
          </Typography>

          <Box sx={{ maxWidth: 600, margin: "0 auto", mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search tender title or reference number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton><SearchIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Filter Chips */}
          <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
            {filters.map((f, i) => (
              <Chip
                key={i}
                label={f}
                onClick={() => setSelectedFilter(f)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  background: selectedFilter === f ? "#dceaff" : "",
                }}
              />
            ))}
          </Grid>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#e7f0ff" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Tender Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reference No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Last Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTenders.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: 600 }}>{item.title}</TableCell>
                    <TableCell>{item.refNo}</TableCell>

                    {/* Status Color */}
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        color: getStatusColor(item.status),
                      }}
                    >
                      {item.status}
                    </TableCell>

                    <TableCell>{item.lastDate}</TableCell>

                    <TableCell sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => generatePDF(item, "view")}
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => generatePDF(item, "download")}
                      >
                        Download
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{ textAlign: "center", mt: 5, color: "#777" }}>
            Support: tenders@tn.gov.in | 044-25276100
          </Typography>

        </Container>
      </Box>
    </GovtLayout>
  );
}
