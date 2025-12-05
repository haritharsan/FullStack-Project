import { useEffect, useState } from "react";
import axios from "axios";
import GovtLayout from "../../components/GovtLayout";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

export default function ProjectsPage() {

  // 🔥 Dynamic data from backend
  const [services, setServices] = useState([]);

  // 🔄 Load data from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/projects")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log("Failed to load project services", err);
      });
  }, []);

  return (
    <GovtLayout>
      <Box sx={{ background: "#f3f7ff", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">

          {/* Breadcrumb */}
          <Box sx={{ display: "flex", gap: 1, fontSize: 14, mb: 3 }}>
            <span style={{ cursor: "pointer", color: "#0055aa" }}>Home</span> › <strong>Projects</strong>
          </Box>

          <Grid container spacing={4}>

            {/* LEFT CONTENT */}
            <Grid item xs={12} md={8}>

              {/* SIMPLEGOV HEADER INFO */}
              <Paper sx={{ p: 4, mb: 4, borderRadius: 3, border: "1px solid #ddecff" }}>
                <img src="/simplegov.png" width="240" alt="SimpleGov" />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
                  SimpleGov Initiative
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography sx={{ lineHeight: 1.7 }}>
                  The Government of Tamil Nadu launched the <strong>SimpleGov initiative in November 2023</strong>  
                  to simplify administrative processes, reduce paperwork, and accelerate citizen service delivery 
                  using digital workflows, self-attestation and e-governance platforms.
                </Typography>

                <Typography sx={{ mt: 2, lineHeight: 1.7 }}>
                  This initiative replaces manual verification with digital trust-based systems including 
                  <strong> e-KYC, DigiLocker, Digital Signature Certificates, Self-Certification and Online Tracking.</strong>
                </Typography>

                <Chip
                  label="Government Digital Reform"
                  sx={{ mt: 3, background: "#004aad", color: "white", fontWeight: "bold" }}
                />
              </Paper>

              {/* DYNAMIC TABLE */}
              <Paper sx={{ p: 4, borderRadius: 3, border: "1px solid #cce0ff" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Simplified services launched under SimpleGov – Batch I
                </Typography>

                <Typography sx={{ my: 1, fontStyle: "italic", color: "#444" }}>
                  (Launched by Hon'ble Chief Minister on 29.05.2025)
                </Typography>

                <Divider sx={{ my: 2 }} />

                <TableContainer sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: "#0047b3" }}>
                        <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Sl. No</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Service Name</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Department</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {services.length > 0 ? (
                        services.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell><strong>{item.sno}</strong></TableCell>
                            <TableCell>{item.projectName}</TableCell>
                            <TableCell>{item.department}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} sx={{ textAlign: "center", py: 3 }}>
                            No Services Found (Add in Admin Panel)
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

            </Grid>

          </Grid>
        </Container>
      </Box>
    </GovtLayout>
  );
}
