import { useState, useMemo } from "react";
import GovtLayout from "../../components/GovtLayout";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

// Tamil Nadu Data
import { tamilNaduData } from "../tamilNaduData";

// Sample Real CSC Data
const cscLocations = [
  { id: 1, name: "CSC - Anna Nagar", district: "Chennai", taluk: "Aminjikarai", lat: 13.0843, lng: 80.2101 },
  { id: 2, name: "CSC - RS Puram", district: "Coimbatore", taluk: "Coimbatore North", lat: 11.0168, lng: 76.9558 },
  { id: 3, name: "CSC - KK Nagar", district: "Madurai", taluk: "Madurai South", lat: 9.939093, lng: 78.121719 },
];

export default function CscPage() {

  const [district, setDistrict] = useState("All");
  const [taluk, setTaluk] = useState("All");
  const [selectedCSC, setSelectedCSC] = useState(null);

  const availableTaluks = tamilNaduData[district] || [];

  // Auto Dummy CSC Generator
  const filteredCentres = useMemo(() => {
    let result = cscLocations.filter(center =>
      (district === "All" || center.district === district) &&
      (taluk === "All" || center.taluk === taluk)
    );

    if (district !== "All" && result.length === 0) {
      result = availableTaluks.map((t, i) => ({
        id: `dummy-${i}`,
        name: `CSC Center Coming Soon`,
        district,
        taluk: t,
        dummy: true
      }));
    }

    return result;
  }, [district, taluk, availableTaluks]);


  // GPS nearest finder
  const [nearestCenter, setNearestCenter] = useState(null);

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        let nearest = null;
        let minDist = Infinity;

        cscLocations.forEach(center => {
          const dist = getDistance(user.lat, user.lng, center.lat, center.lng);
          if (dist < minDist) {
            minDist = dist;
            nearest = { ...center, distance: dist.toFixed(2) };
          }
        });

        setNearestCenter(nearest);
        setSelectedCSC(nearest);

      },
      () => alert("Please enable location permission.")
    );
  };


  return (
    <GovtLayout>
      <Box sx={{ background: "#eef4ff", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="xl">

          <Typography sx={{ fontSize: 14, mb: 2 }}>
            <span style={{ color: "#0066cc", cursor: "pointer" }}>Home</span> › <strong>CSC Centers</strong>
          </Typography>

          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 800, color: "#024f2e", mb: 3 }}>
            Tamil Nadu CSC Directory
          </Typography>


          {/* Filter Panel */}
          <Paper sx={{ p: 4, borderRadius: "18px", border: "1px solid #d6e4ff", mb: 4 }}>
            <Typography sx={{ fontWeight: 700, mb: 2, color: "#003c88", fontSize: 18 }}>
              <SearchIcon sx={{ mr: 1 }} /> Search CSC by District / Taluk
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <select
                  value={district}
                  onChange={(e) => { setDistrict(e.target.value); setTaluk("All"); setSelectedCSC(null); }}
                  style={{ width: "100%", padding: 14, fontSize: 16, borderRadius: 8 }}
                >
                  <option value="All">All Districts</option>
                  {Object.keys(tamilNaduData).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </Grid>

              <Grid item xs={12} md={6}>
                <select
                  value={taluk}
                  onChange={(e) => setTaluk(e.target.value)}
                  disabled={district === "All"}
                  style={{ width: "100%", padding: 14, fontSize: 16, borderRadius: 8 }}
                >
                  <option value="All">All Taluks</option>
                  {availableTaluks.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </Grid>
            </Grid>

            <Button variant="contained" sx={{ mt: 3, background: "#0066cc" }} onClick={detectLocation}>
              <LocationSearchingIcon sx={{ mr: 1 }} /> Detect My Location
            </Button>

            {nearestCenter && (
              <Paper sx={{ mt: 3, p: 3, borderLeft: "4px solid #187bcd", background: "#eaf4ff" }}>
                <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                Nearest CSC: <strong>{nearestCenter.name}</strong> ({nearestCenter.distance} km away)
              </Paper>
            )}
          </Paper>



          {/* Results */}
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            {filteredCentres.length} center(s) found
          </Typography>

          {filteredCentres.map(center => (
            <Paper
              key={center.id}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                borderLeft: center.dummy ? "4px solid orange" : "4px solid #0066cc",
                background: selectedCSC?.id === center.id ? "#dceeff" : "white",
                cursor: center.dummy ? "not-allowed" : "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.01)" }
              }}
              onClick={() => !center.dummy && setSelectedCSC(center)}
            >

              <Typography fontWeight={700} sx={{ fontSize: 18 }}>
                {center.name}
              </Typography>

              <Typography sx={{ fontSize: 14, mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} />
                {center.taluk}, {center.district}
              </Typography>

            

              {!center.dummy && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2, background: "#0a66c2", fontWeight: 600 }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`,
                      "_blank"
                    )
                  }
                >
                  <NavigationIcon sx={{ mr: 1 }} /> Navigate
                </Button>
              )}
            </Paper>
          ))}

        </Container>
      </Box>
    </GovtLayout>
  );
}
