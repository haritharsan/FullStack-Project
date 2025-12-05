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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";
import GovtLayout from "../../components/GovtLayout";

export default function DownloadsPage() {

  // 🔹 FILE LIST WITH URL
  const files = [
    { name: "e-Security", size: "2.4 MB", type: "PDF", date: "15 Jan 2025", url: "/downloads/eSecurity.pdf" },
    { name: "Districts, Taluks & Revenue Villages", size: "890 KB", type: "XLS", date: "04 Jan 2025", url: "/downloads/data.xls" },
    { name: "Municipalities&Corporation", size: "1.1 MB", type: "XLS", date: "21 Dec 2024", url: "/downloads/Municipalities&Corporations.xls" },
    { name: "eSecurity", size: "3.5 MB", type: "PDF", date: "02 Dec 2024", url: "/downloads/eSecurity.pdf" },
    { name: "MASTER_LIST_OF_BLOCKS", size: "2.9 MB", type: "XLS", date: "01 Dec 2024", url: "/downloads/MASTER_LIST_OF_BLOCKS.xls" },
    { name: "Master_List_of_Municipalities_and_Corporation", size: "2.9 MB", type: "XLS", date: "01 Dec 2024", url: "/downloads/Master_List_of_Municipalities_and_Corporation.xls" },
    { name: "Master_List_of_Village_Panchayats", size: "2.9 MB", type: "XLS", date: "01 Dec 2024", url: "/downloads/Master_List_of_Village_Panchayats.xlsx" },
    { name: "Master_List_of_Town_Panchayats", size: "2.9 MB", type: "XLS", date: "01 Dec 2024", url: "/downloads/Master_List_of_Town_Panchayats.xlsx" },
    { name: "Ruralpolicy", size: "3.5 MB", type: "PDF", date: "02 Dec 2024", url: "/downloads/Ruralpolicy.pdf" },
  ];

  // 🔹 DOWNLOAD FUNCTION
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  return (
    <GovtLayout>
      <Box sx={{ background: "#f5f8ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">

          {/* 🔹 Title */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 700, color: "#0c4cac", mb: 3 }}
          >
            ⬇ Downloads
          </Typography>

          {/* 🔹 Small Description */}
          <Typography sx={{ textAlign: "center", mb: 4, color: "#444" }}>
            Download official forms, manuals, circulars, reports and government documents.
          </Typography>

         

          

          {/* 🔹 Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#e7f0ff" }}>
                  <TableCell sx={{ fontWeight: 700 }}>📄 File Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Size</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Uploaded</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Download</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {files.map((file, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <DescriptionIcon sx={{ color: "#0057c2", mr: 1 }} />
                      {file.name}
                    </TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.date}</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#0066cc",
                          "&:hover": { background: "#004799" },
                          textTransform: "none",
                        }}
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => handleDownload(file)}
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          {/* 🔹 Footer Note */}
          <Typography sx={{ textAlign: "center", mt: 5, fontSize: 13, color: "#777" }}>
            Support: 📧 tnesevaihelpdesk@tn.gov.in | ☎ 1800-425-6000
          </Typography>
        </Container>
      </Box>
    </GovtLayout>
  );
}
