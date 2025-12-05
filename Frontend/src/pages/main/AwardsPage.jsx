import GovtLayout from "../../components/GovtLayout";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button
} from "@mui/material";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AwardsPage() {

  // ---------------------------------------
  // ⭐ Generate Application Form PDF
  // ---------------------------------------
  const downloadApplicationForm = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const logo = new Image();
    logo.src = "/tnlogo.png"; // Correct path (public folder)

    logo.onload = () => {
      // Watermark
      doc.addImage(logo, "PNG", 45, 80, 120, 120, "", "FAST", 0.08);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.text("CM Award for Excellence in e-Governance", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.text("APPLICATION FORM", 105, 30, { align: "center" });
      doc.line(10, 35, 200, 35);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);

      const formContent = [
        "Applicant Details:",
        "",
        "1. Team Name: ________________________________________________",
        "2. Institution Name: ___________________________________________",
        "3. Team Members (4–6): ________________________________________",
        "4. Email ID: __________________________________________________",
        "5. Project Title: ______________________________________________",
        "6. Selected Category: __________________________________________",
        "",
        "-------------------------------------------------------------",
        "College Verification:",
        "Principal Signature & Official College Seal Required",
      ];

      let y = 55;
      formContent.forEach(line => {
        doc.text(line, 10, y);
        y += 8;
      });

      // Footer
      doc.setFontSize(9);
      doc.text(
        "Tamil Nadu e-Governance Agency (TNeGA) | www.tn.gov.in",
        105,
        290,
        { align: "center" }
      );

      doc.save("CM_Award_Application_Form.pdf");
    };
  };


  // ---------------------------------------
  // ⭐ Generate PDF Guidelines File
  // ---------------------------------------
  const downloadGuidelinesPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const logo = new Image();
    logo.src = "/tnlogo.png";

    logo.onload = () => {
      doc.addImage(logo, "PNG", 45, 80, 120, 120, "", "FAST", 0.08);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.text("CM Award for Excellence in e-Governance", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.text("Guidelines & Terms", 105, 30, { align: "center" });
      doc.line(10, 35, 200, 35);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);

      const text = `
1. Eligibility:
- Students must be 18+ years old.
- Teams should contain 4 to 6 members.
- One nomination per category per college.

2. Project Requirements:
- Working prototype is required for evaluation.
- Must solve a governance or citizen service problem.

3. Prize and Recognition:
- ₹2,00,000 cash award.
- Trophy and participation certificate.
- Felicitation by Tamil Nadu Government.

4. Focus Areas:
- Healthcare, Education, Agriculture, AI, IoT,
- Cybersecurity, Public Safety, e-Governance,
- Smart City Solutions, Disaster Management.

5. Evaluation:
- Innovation & Creativity (30%)
- Usefulness to Government or Citizens (25%)
- Scalability & Prototype Quality (20%)
- Technical Architecture (15%)
- Documentation & Presentation (10%)

6. Submission Process:
- Step 1: Registration
- Step 2: Abstract Submission
- Step 3: Prototype Demonstration
- Step 4: Jury Evaluation
- Step 5: Award Ceremony
`;

      const wrapped = doc.splitTextToSize(text, 185);
      doc.text(wrapped, 10, 50);

      doc.setFontSize(9);
      doc.text(
        "Tamil Nadu e-Governance Agency (TNeGA) | Helpline: 1800-425-6000",
        105,
        290,
        { align: "center" }
      );

      doc.save("CM_Award_Guidelines.pdf");
    };
  };

  return (
    <GovtLayout>
      <Box sx={{ background: "#f3f7ff", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              textAlign: "center",
              mb: 3
            }}
          >
            🏆 CM Award for Excellence in e-Governance
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4, borderRadius: 3, background: "white", border: "1px solid #ddecff" }}>

                {/* Header */}
                <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 2 }}>
                  🎓 About the Award
                </Typography>

                <Typography sx={{ fontSize: 15, lineHeight: 1.7, mb: 3 }}>
                  The Chief Minister’s Award for Excellence in e-Governance recognizes young innovators
                  who create impactful technology solutions to improve governance, transparency,
                  service delivery and citizen experience.
                  <br /><br />
                  This competition encourages college students to participate in Tamil Nadu’s
                  Digital Transformation journey aligned with <strong>Vision Tamil Nadu
                    2030 – Digital Governance Framework</strong>.
                </Typography>

                {/* Who Can Apply */}
                <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
                  👥 Who Can Apply?
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  • Students from Polytechnic, Engineering, Arts & Science, or University courses
                  • Team Size: <strong>4 – 6 Members</strong>
                  • Age Limit: <strong>18+ years</strong>
                  • Only <strong>ONE team per category</strong> per institution
                  • Projects must be approved by the institution’s Principal
                </Typography>

                {/* Award Categories */}
                <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
                  🧠 Competition Categories
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Students must submit a project under one of the following themes:
                </Typography>

                <ul style={{ marginBottom: "20px", lineHeight: "1.7" }}>
                  <li>AI for Governance (Artificial Intelligence / ML Solutions)</li>
                  <li>Mobile Application Development for Citizen Services</li>
                  <li>Smart Analytics & Data Platforms</li>
                  <li>Cybersecurity & Digital Public Safety Solutions</li>
                  <li>Smart Agriculture / IoT / Drones for Government</li>
                  <li>E-Governance Innovations for Public Service Delivery</li>
                </ul>

                {/* Benefits */}
                <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
                  🏅 Benefits of Winning
                </Typography>

                <ul style={{ marginBottom: "25px", lineHeight: "1.7" }}>
                  <li>₹ <strong>2,00,000 Cash Prize</strong> per category</li>
                  <li>Trophy & Government-issued Certificate</li>
                  <li>Opportunity to showcase to Government & Industry leaders</li>
                  <li>Possibility for prototype adoption by Government Departments</li>
                  <li>Internship / Mentorship support under TNeGA Innovation Cell</li>
                </ul>

                {/* Timeline */}
                <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
                  📅 Competition Timeline (Tentative)
                </Typography>

                <ul style={{ marginBottom: "25px", lineHeight: "1.7" }}>
                  <li>Registration Opens: <strong>01 July 2025</strong></li>
                  <li>Submission Deadline: <strong>30 August 2025</strong></li>
                  <li>Prototype Review: <strong>15 September 2025</strong></li>
                  <li>Final Presentation: <strong>October 2025</strong></li>
                  <li>Award Ceremony: <strong>November 2025</strong></li>
                </ul>

                {/* Buttons */}
                <Button
                  variant="contained"
                  startIcon={<CloudDownloadIcon />}
                  sx={{ mr: 2, background: "#0056b3", "&:hover": { background: "#003f7f" } }}
                  onClick={downloadApplicationForm}
                >
                  📄 Download Application Form
                </Button>

                <Button
                  variant="outlined"
                  onClick={downloadGuidelinesPDF}
                  sx={{
                    borderColor: "#0056b3",
                    color: "#0056b3",
                    "&:hover": { borderColor: "#003f7f", color: "#003f7f" }
                  }}
                >
                  📘 Download Guidelines
                </Button>

                {/* Contact */}
                <Typography sx={{ mt: 4, fontWeight: 700 }}>
                  📞 Support Helpline
                </Typography>

                <Typography>
                  Tamil Nadu e-Governance Agency (TNeGA) <br />
                  Email: awards@tnega.tn.gov.in <br />
                  Toll-Free: 1800-425-6000
                </Typography>

              </Paper>

            </Grid>
          </Grid>
        </Container>
      </Box>
    </GovtLayout>
  );
}
