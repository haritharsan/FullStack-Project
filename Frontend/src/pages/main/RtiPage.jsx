import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";
import GovtLayout from "../../components/GovtLayout";

export default function RtiPage() {

const rtiTable = [
  {
    sno: "1",
    item: "Particulars of its organisation, functions and duties",
    details: `(i) Name and address of the Organization\n(ii) Head of the Organisation\n(iii) Functions and duties`,
    info: `Tamil Nadu e-Governance Agency, No.807, 2nd & 7th Floor, Chennai – 02.\nAdditional Chief Secretary to Government.\nTNeGA was established in 2007 to provide digital services.`
  },
  {
    sno: "2",
    item: "Powers and duties of officers",
    details: `CEO, Directors, System Engineers`,
    info: `Decision making, administration, technical implementation, digital service operations.`
  },
  {
    sno: "3",
    item: "Decision-making process",
    details: `Identify key decision points`,
    info: `Decisions based on Government / Board approvals.`
  },
  {
    sno: "4",
    item: "Norms for discharge of functions",
    details: `--`,
    info: `--`
  },
  {
    sno: "5",
    item: "Rules and Manuals",
    details: `--`,
    info: `Registered under Societies Act`
  },
  {
    sno: "6",
    item: "Types of documents held",
    details: `Policy Notes`,
    info: `Government IT & Digital Services Documentation`
  },
  {
    sno: "7",
    item: "Citizens consultation arrangements",
    details: `--`,
    info: `--`
  },
  {
    sno: "8",
    item: "Committees and advisory bodies",
    details: `--`,
    info: `Meetings chaired by Secretary and CEO.`
  },
  {
    sno: "9",
    item: "Directory of officers",
    details: `Officer List`,
    info: `Contact: 044-4016 4900 | Email: tnega@tn.gov.in`
  },
  {
    sno: "10",
    item: "Monthly remuneration",
    details: `Salary norms`,
    info: `Salaries follow Tamil Nadu Government norms`
  },
  {
    sno: "11",
    item: "Budget allocation report",
    details: `--`,
    info: `Annual budget approved by Finance Department`
  },
  {
    sno: "12",
    item: "Execution of subsidy programs",
    details: `--`,
    info: `--`
  },
  {
    sno: "13",
    item: "Beneficiary list of schemes",
    details: `--`,
    info: `Updated based on scheme execution`
  },
  {
    sno: "14",
    item: "Information available electronically",
    details: `Website, Public Portals`,
    info: `Data available on Tamil Nadu e-Governance portal`
  },
  {
    sno: "15",
    item: "Facilities for public information access",
    details: `RTI Help Desk`,
    info: `Helpline: 1800-425-6000`
  },
  {
    sno: "16",
    item: "Details of Public Information Officers",
    details: `PIO Information`,
    info: `Tamil Nadu e-Governance Agency`
  },
  {
    sno: "17",
    item: "Other information prescribed",
    details: `--`,
    info: `Updated annually`
  },
  {
    sno: "18",
    item: "e-Service applications handled",
    details: `CSC, eSevai`,
    info: `More than 300+ online services available`
  },
  {
    sno: "19",
    item: "Modes of service delivery",
    details: `Online, Mobile App, Service Centers`,
    info: `Service access available statewide`
  },
  {
    sno: "20",
    item: "Record retention policy",
    details: `Document retention guidelines`,
    info: `Based on Government archival rules`
  },
  {
    sno: "21",
    item: "Grievance redressal mechanism",
    details: `Helpline & Feedback`,
    info: `Public grievance handled through portal`
  },
  {
    sno: "22",
    item: "Service timelines",
    details: `Turnaround duration`,
    info: `Based on Tamil Nadu Guarantee of Services Act`
  },
  {
    sno: "23",
    item: "Internal audit details",
    details: `Annual review`,
    info: `Audited by Government Accounts Wing`
  },
  {
    sno: "24",
    item: "Public procurement process",
    details: `Tender publishing`,
    info: `e-Tenders published in Procurement Portal`
  },
  {
    sno: "25",
    item: "Notification & circular archives",
    details: `Department circulars`,
    info: `Accessible to public online`
  },
  {
    sno: "26",
    item: "Training & capacity building",
    details: `Workshops & modules`,
    info: `Staff trained under e-Governance capacity programs`
  },
  {
    sno: "27",
    item: "Digital accessibility standards",
    details: `WCAG & GIGW compliance`,
    info: `All government websites follow accessibility rules`
  },
  {
    sno: "28",
    item: "Cybersecurity framework",
    details: `Security guidelines`,
    info: `Data governance aligned with CERT-IN standards`
  },
  {
    sno: "29",
    item: "Public usage statistics",
    details: `Portal performance updates`,
    info: `Usage analytics updated monthly`
  },
  {
    sno: "30",
    item: "Future roadmap",
    details: `Vision & expansion plan`,
    info: `AI-based governance, blockchain document verification & digital inclusion`
  }
];


  // 📄 Download PDF Function
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(15);
    doc.text("RTI ACT 2005 – Section 4(1)(b)", 105, 15, { align: "center" });

    doc.autoTable({
      head: [["S.No", "Item", "Details", "Information"]],
      body: rtiTable.map(r => [r.sno, r.item, r.details, r.info]),
      startY: 25,
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 45 },
        2: { cellWidth: 50 },
        3: { cellWidth: 80 }
      }
    });

    doc.save("RTI_Information.pdf");
  };

  return (
    <GovtLayout>
      <Box sx={{ background: "#f5f8ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 3, color: "#003c88" }}
          >
            RIGHT TO INFORMATION ACT, 2005 (RTI)
          </Typography>

          {/* Contact Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderLeft: "6px solid #7ccc28", borderRadius: "10px" }}>
                <Typography fontWeight={700} sx={{ color: "#003c88" }}>Appellate Authority</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                  <b>Tmt. K. Priya – Joint Director (Tech)</b><br />
                  Tamil Nadu e-Governance Agency<br />
                  Chennai – 600 002<br />
                  📞 044-4016 4900<br />
                  ✉ tnega@tn.gov.in
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderLeft: "6px solid #7ccc28", borderRadius: "10px" }}>
                <Typography fontWeight={700} sx={{ color: "#003c88" }}>Public Information Officer (PIO)</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                  <b>Mr. Shanmuganandam – Deputy Director</b><br />
                  Tamil Nadu e-Governance Agency<br />
                  Chennai – 600 002<br />
                  📞 044-4016 4900<br />
                  ✉ tnega@tn.gov.in
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Table */}
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #d6e3ff"
            }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ background: "#e9f1ff" }}>
                  <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>S.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Details of Disclosure</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Information</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rtiTable.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:nth-of-type(odd)": { background: "#f9fbff" } }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>{row.sno}</TableCell>
                    <TableCell>{row.item}</TableCell>
                    <TableCell style={{ whiteSpace: "pre-line" }}>{row.details}</TableCell>
                    <TableCell style={{ whiteSpace: "pre-line" }}>{row.info}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Footer */}
          <Typography sx={{ textAlign: "center", mt: 4, fontSize: 13, color: "#777" }}>
            Last Updated: {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </GovtLayout>
  );
}
