import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { changeMode } from "../../store/slices/tasksSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.tasks);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeMode = () => {
    dispatch(changeMode());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }} color="inherit">
        <Toolbar>
          <img
            src="/src/assets/jiraLogo.png"
            style={{ width: "30px", marginRight: "20px" }}
          />
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Kanban board clone
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <IconButton onClick={handleThemeMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Typography variant="h6">
              {user.name} ({user.role})
            </Typography>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: "240px",
          [`& .MuiDrawer-paper`]: {
            width: "240px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <SideBar />
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          mt: "65px",
          p: 3,
          minHeight: "90vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
