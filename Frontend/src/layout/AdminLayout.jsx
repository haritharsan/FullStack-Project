// src/layout/AdminLayout.jsx

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children, title = "Admin Dashboard" }) {

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          ml: `${drawerWidth}px`,
          background: "#eef5eb"
        }}
      >

        {/* Top Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{ background: "transparent", color: "#024c26", py: 1 }}
        >
          <Toolbar>
            <Typography variant="h4" fontWeight={700}>{title}</Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>

      </Box>

    </Box>
  );
}
