import {
  Drawer, Toolbar, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, Typography, Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FolderIcon from "@mui/icons-material/Folder";
import DataObjectIcon from "@mui/icons-material/DataObject";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {

  const navigate = useNavigate();
  const drawerWidth = 240;

  const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { divider: true },

    { label: "Add Career", icon: <WorkIcon />, path: "/admin/dashboard/career" },
    { label: "Add Gallery", icon: <ImageIcon />, path: "/admin/dashboard/gallery" },
    { label: "Add News", icon: <NewspaperIcon />, path: "/admin/dashboard/news" },
    { label: "Add Project", icon: <FolderIcon />, path: "/admin/dashboard/project" },

    { divider: true },

    { label: "Manage Tenders", icon: <DescriptionIcon />, path: "/admin/dashboard/tenders" },
    { label: "Add Certificate & Schemes", icon: <DataObjectIcon />, path: "/admin/dashboard/data" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          background: "#ff6f00",              // 🔥 ORANGE MAIN BG
          color: "white",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          animation: "fadeIn 0.8s ease-out",
        },
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "@keyframes slideIn": {
          "0%": { opacity: 0, transform: "translateX(-15px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      }}
    >
      {/* TOP MENU */}
      <Box>
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              animation: "slideIn 0.6s ease-out",
            }}
          >
            Admin Panel
          </Typography>
        </Toolbar>

        <List>
          {menu.map((item, index) =>
            item.divider ? (
              <Divider
                key={index}
                sx={{
                  my: 1,
                  borderColor: "rgba(255,255,255,0.5)",  // 🔸 Lighter Orange-ish divider
                  animation: "slideIn 0.6s ease-out",
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            ) : (
              <ListItem
                disablePadding
                key={item.label}
                sx={{
                  animation: "slideIn 0.5s ease-out",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.18)",   // 🔥 ORANGE HOVER
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      transition: "0.3s",
                      "&:hover": {
                        color: "#ffcc80",     // 🔥 Light orange on hover
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>

      {/* LOGOUT BUTTON BOTTOM */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => navigate("/")}
          sx={{
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",    // Orange tinted
            transition: ".3s",
            "&:hover": {
              background: "rgba(255,255,255,0.25)", // More visible hover
              transform: "scale(1.05)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
