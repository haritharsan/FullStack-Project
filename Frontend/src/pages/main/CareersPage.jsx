import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import GovtLayout from "../../components/GovtLayout";
import axios from "axios";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/careers")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log("Error loading jobs:", err));
  }, []);

  return (
    <GovtLayout>
      <Box sx={{ background: "#f4f7fc", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="xl">
          
          {/* Header */}
          <Box sx={{ borderLeft: "6px solid #0c4cac", pl: 2, mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#0c4cac", textTransform: "uppercase" }}
            >
              <BusinessCenterIcon sx={{ mr: 1, fontSize: 34 }} />
              Career Opportunities
            </Typography>
          </Box>

          <Grid container spacing={4}>
            
            {/* LEFT COLUMN */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 2,
                  background: "white",
                  border: "1px solid #dde6f5",
                }}
              >
                {/* Section Title */}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: 3, textAlign: "center", color: "#0c4cac" }}
                >
                  Employee Selection Procedure
                </Typography>

                {/* Selection Procedure */}
                <Typography sx={{ fontSize: 15, lineHeight: 1.8 }}>
                  <b>1. Screening of Job Applications:</b><br />
                  Based on educational qualification and skills.<br /><br />

                  <b>2. HR Round:</b><br />
                  Discussion on job role, responsibilities & verification.<br /><br />

                  <b>3. Technical Interview:</b><br />
                  Conducted by subject experts.<br /><br />

                  <b>4. Final Panel Interview:</b><br />
                  Includes senior officials and domain experts.
                </Typography>

                <Divider sx={{ my: 4 }} />

                {/* JOB LISTINGS */}
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  Available Job Positions:
                </Typography>

                {jobs.length === 0 && (
                  <Typography sx={{ color: "gray", fontStyle: "italic" }}>
                    No openings available currently.
                  </Typography>
                )}

                {jobs.map((job) => (
                  <Paper
                    key={job.id}
                    sx={{
                      p: 3,
                      mb: 4,
                      borderRadius: 2,
                      border: "1px solid #e0e8f3",
                      background: "#fafcfe",
                    }}
                  >
                    {/* Job Title */}
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 18, color: "#0c4cac" }}
                    >
                      Job Title: {job.title}
                    </Typography>

                    {/* Quick Info */}
                    <Box sx={{ mt: 1, ml: 1, fontSize: 14, color: "#333" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 18, color: "#d9534f", mr: 1 }} />
                        {job.location}
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: "#5bc0de", mr: 1 }} />
                        Experience: {job.experience}
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventIcon sx={{ fontSize: 18, color: "#0275d8", mr: 1 }} />
                        Closing Date: {job.closingDate}
                      </Box>
                    </Box>

                    {/* Summary */}
                    <Typography sx={{ mt: 2, fontWeight: 600 }}>
                      Job Summary:
                    </Typography>
                    <Typography sx={{ fontSize: 14, lineHeight: 1.7, ml: 1 }}>
                      {job.summary}
                    </Typography>

                    {/* Responsibilities */}
                    <Typography sx={{ mt: 2, fontWeight: 600 }}>
                      Key Responsibilities:
                    </Typography>
                    <List dense sx={{ ml: 1 }}>
                      {(job.responsibilities?.split("\n") || []).map((item, i) => (
                        <ListItem key={i} sx={{ py: 0 }}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>

                    {/* Skills */}
                    <Typography sx={{ mt: 2, fontWeight: 600 }}>
                      Qualifications & Skills:
                    </Typography>
                    <Typography sx={{ fontSize: 14, ml: 1, lineHeight: 1.7 }}>
                      {job.skills}
                    </Typography>
                  </Paper>
                ))}
              </Paper>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2, border: "1px solid #ffd633" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, mb: 2, color: "#000" }}
                >
                  What’s New
                </Typography>

                {[ 
                  "Inauguration of Nunnarang21: TN AI & Data Analytics Conclave",
                  "MoU with Chennai Mathematical Institute",
                  "Launch of Tamil Nadu Data Centre Policy 2024",
                ].map((news, i) => (
                  <Box key={i} sx={{ mb: 2, pb: 1, borderBottom: "1px solid #eee" }}>
                    <Typography sx={{ fontWeight: 600 }}>{news}</Typography>
                    <Typography sx={{ fontSize: 13, color: "#666" }}>📅 10-Dec-2024</Typography>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Box>
    </GovtLayout>
  );
}
