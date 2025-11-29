import {
  AppBar,
  Box,
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

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(logout());
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Mi App
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
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
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: "250px",
          [`& .MuiDrawer-paper`]: {
            width: "250px",
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
