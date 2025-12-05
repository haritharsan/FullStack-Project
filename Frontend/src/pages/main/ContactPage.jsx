import { Box, Container, Typography, Paper, Grid, Button } from "@mui/material";
import GovtLayout from "../../components/GovtLayout";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export default function ContactPage() {
  const phoneNumber = "18004256000"; // call number
  const whatsappNumber = "919380000000"; // international format only

  return (
    <GovtLayout>
      <Box
        sx={{
          background: "#eaf1ff",
          minHeight: "100vh",
          py: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          {/* Header */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              textAlign: "center",
              color: "#003c88",
              mb: 1,
            }}
          >
            Contact Us
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: 16,
              mb: 4,
              color: "#555",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            Reach out to Tamil Nadu e-Governance Agency for support and public service related queries.
          </Typography>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={10}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: "#ffffff",
                  border: "1px solid #d6e4ff",
                  textAlign: "center",
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.09)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#003c88",
                    mb: 2,
                  }}
                >
                  Official Contact Details
                </Typography>

                {/* Address */}
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  <LocationOnIcon sx={{ color: "#003c88" }} />
                  Tamil Nadu e-Governance Agency (TNeGA)
                </Typography>

                <Typography sx={{ mt: 1, fontSize: 15, lineHeight: 1.7 }}>
                  Directorate of e-Governance Building,<br />
                  Chennai, Tamil Nadu – 600009
                </Typography>

                {/* Contact Info */}
                <Typography sx={{ mt: 2, fontSize: 15, fontWeight: 600 }}>
                  <EmailIcon sx={{ verticalAlign: "middle", mr: 1, color: "#003c88" }} />
                  tnesevaihelpdesk@tn.gov.in
                </Typography>

                <Typography sx={{ mt: 1, fontSize: 15, fontWeight: 600 }}>
                  <CallIcon sx={{ verticalAlign: "middle", mr: 1, color: "#003c88" }} />
                  Toll Free: 1800-425-6000
                </Typography>

                <Typography sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                  <SupportAgentIcon sx={{ mr: 1, color: "#003c88" }} />
                  Support: Mon–Sat | 9 AM–6 PM
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    startIcon={<CallIcon />}
                    variant="contained"
                    sx={{
                      background: "#0057c2",
                      px: 4,
                      "&:hover": { background: "#003c88" },
                    }}
                    onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                  >
                    Call Now
                  </Button>

                  <Button
                    startIcon={<WhatsAppIcon />}
                    variant="outlined"
                    sx={{
                      borderColor: "#25D366",
                      color: "#25D366",
                      px: 4,
                      "&:hover": { background: "#eafff1" },
                    }}
                    onClick={() =>
                      window.open(`https://wa.me/${whatsappNumber}`, "_blank")
                    }
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Map */}
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#003c88", mb: 2 }}
            >
              Office Location
            </Typography>

            <iframe
              title="Office Map"
              width="100%"
              height="350"
              style={{
                borderRadius: 12,
                border: "2px solid #ccd7ee",
              }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Tamil%20Nadu%20egovernance&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </Box>

          {/* Footer */}
          <Typography
            sx={{
              textAlign: "center",
              mt: 4,
              fontSize: 14,
              color: "#777",
            }}
          >
            © {new Date().getFullYear()} Government of Tamil Nadu — TNeGA
          </Typography>
        </Container>
      </Box>
    </GovtLayout>
  );
}
