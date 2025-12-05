import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

export default function DownloadCertificate() {
  const { appId } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/applications/${appId}`)
      .then(res => setApplication(res.data))
      .catch(err => console.log(err));
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("🛡 Government of Tamil Nadu", 20, 20);
    pdf.line(20, 25, 190, 25);

    pdf.setFontSize(12);
    pdf.text(`Certificate: ${application.certificateType}`, 20, 50);
    pdf.text(`Applicant Name: ${application.fullName}`, 20, 65);
    pdf.text(`Application ID: ${application.id}`, 20, 80);
    pdf.text(`Approved Date: ${new Date().toLocaleDateString()}`, 20, 95);

    pdf.save(`${application.certificateType}.pdf`);
  };

  if (!application) return <CircularProgress sx={{ m:4 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Download Certificate</Typography>

      {application.status === "Approved" ? (
        <Button sx={{ mt: 3 }} variant="contained" onClick={downloadPDF}>
          📄 Download PDF
        </Button>
      ) : (
        <Typography sx={{ mt: 2, color: "red" }}>
          ❌ Certificate Not Approved Yet.
        </Typography>
      )}
    </Box>
  );
}
