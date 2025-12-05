import GovtLayout from "../../components/GovtLayout";
import { Box, Container, Typography, Paper, Divider, Button } from "@mui/material";
import jsPDF from "jspdf";

export default function AwardsGuidelinesPage() {

  const generateGuidelinesPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold");
    doc.text("CM Award - Official Guidelines", 15, 20);

    doc.setFont("Helvetica", "normal");
    const text = `
The CM Award for Excellence in e-Governance encourages innovation among students...

Eligibility:
- Must be above 18
- Team size: 4 to 6 members

Categories:
1. AI Development
2. Mobile App Development
3. Data Analytics Solutions

Prize:
- ₹2,00,000 cash
- Trophy & Certificate
    `;
    doc.text(doc.splitTextToSize(text, 180), 15, 40);
    doc.save("CM-Award-Guidelines.pdf");
  };

  return (
    <GovtLayout>
      <Container sx={{ py: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            📘 CM Award Guidelines
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ lineHeight: 1.6 }}>
            The CM Award for Excellence in e-Governance aims to promote digital innovation...
            <br/><br/>
            The detailed rules include eligibility, judging, submission format, prototype rules and evaluation.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3, background: "#0056b3" }}
            onClick={generateGuidelinesPDF}
          >
            📄 Download Guidelines PDF
          </Button>
        </Paper>
      </Container>
    </GovtLayout>
  );
}
