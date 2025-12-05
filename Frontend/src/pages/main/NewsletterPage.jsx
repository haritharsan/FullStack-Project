import { useState, useMemo, useEffect } from "react";
import GovtLayout from "../../components/GovtLayout";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Button,
  Dialog,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ShareIcon from "@mui/icons-material/Share";

import axios from "axios";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedNews, setSelectedNews] = useState(null);
  const [reading, setReading] = useState(false);

  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("newsBookmarks") || "[]")
  );

  // ---------------- LOAD NEWS FROM BACKEND ----------------
  const loadNews = () => {
    axios
      .get("http://localhost:8080/api/news")
      .then((res) => setNews(res.data))
      .catch(() => alert("Failed loading news!"));
  };

  useEffect(() => {
    loadNews();
  }, []);

  const categories = ["All", ...new Set(news.map((n) => n.category))];

  // ---------------- FILTER LOGIC ----------------
  const filteredNews = useMemo(() => {
    return news.filter(
      (n) =>
        (filterCategory === "All" || n.category === filterCategory) &&
        n.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, filterCategory, news]);

  // ---------------- BOOKMARK LOGIC ----------------
  const toggleBookmark = (id) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((x) => x !== id)
      : [...bookmarks, id];

    setBookmarks(updated);
    localStorage.setItem("newsBookmarks", JSON.stringify(updated));
  };

  // ---------------- AUTO-VIEWS (Backend) ----------------
  const openNewsPopup = async (item) => {
    setSelectedNews(item);

    try {
      await axios.put(`http://localhost:8080/api/news/view/${item.id}`);
      loadNews(); // reload to reflect updated views
    } catch (error) {
      console.error("Views update failed");
    }
  };

  // ---------------- TEXT TO SPEECH ----------------
  const toggleSpeech = () => {
    if (!selectedNews) return;

    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
    } else {
      const speech = new SpeechSynthesisUtterance(selectedNews.content);
      window.speechSynthesis.speak(speech);
      setReading(true);
    }
  };

  // ---------------- COPY SHARE LINK ----------------
  const handleShare = () => {
    navigator.clipboard.writeText(selectedNews.title);
    alert("🔗 Link Copied!");
  };

  return (
    <GovtLayout>
      <Box sx={{ py: 5, background: "#f4f7ff", minHeight: "100vh" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#003c88", mb: 3 }}
          >
            Government News & Updates
          </Typography>

          {/* ---------------- FILTERS ---------------- */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* ---------------- NEWS GRID ---------------- */}
          <Grid container spacing={4}>
            {filteredNews.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper
                  sx={{
                    p: 3,
                    height: "270px",
                    width: 310,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    border: "1px solid #dce3f7",
                    cursor: "pointer",
                    transition: "0.25s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 6px 15px rgba(0,0,0,0.08)",
                    },
                  }}
                  onClick={() => openNewsPopup(item)}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "17px",
                      minHeight: "45px",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Chip label={item.category} size="small" />

                  <Typography sx={{ opacity: 0.6, fontSize: 13, mt: 1 }}>
                    📅 {new Date(item.date).toDateString()}
                  </Typography>

                  {/* Footer */}
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <VisibilityIcon fontSize="small" /> {item.views} views
                    </Typography>

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item.id);
                      }}
                    >
                      {bookmarks.includes(item.id) ? (
                        <BookmarkIcon color="primary" />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* ---------------- POPUP ---------------- */}
          <Dialog
            open={!!selectedNews}
            onClose={() => setSelectedNews(null)}
            maxWidth="md"
            fullWidth
          >
            {selectedNews && (
              <Paper sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight={700}>
                  {selectedNews.title}
                </Typography>

                <Chip label={selectedNews.category} sx={{ mt: 1 }} />

                <Typography sx={{ opacity: 0.7, mt: 1 }}>
                  📅 {new Date(selectedNews.date).toDateString()}
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <IconButton onClick={() => toggleBookmark(selectedNews.id)}>
                    {bookmarks.includes(selectedNews.id) ? (
                      <BookmarkIcon color="primary" />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>

                  <IconButton onClick={toggleSpeech}>
                    {reading ? (
                      <VolumeOffIcon color="error" />
                    ) : (
                      <VolumeUpIcon color="primary" />
                    )}
                  </IconButton>

                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Box>

                <Typography sx={{ mt: 3, lineHeight: 1.7, fontSize: 17 }}>
                  {selectedNews.content}
                </Typography>

                <Button
                  fullWidth
                  sx={{ mt: 3 }}
                  variant="contained"
                  onClick={() => setSelectedNews(null)}
                >
                  Close
                </Button>
              </Paper>
            )}
          </Dialog>
        </Container>
      </Box>
    </GovtLayout>
  );
}
