import React from "react";
import classes from "./TeamSidebar.module.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import BurstModeIcon from '@mui/icons-material/BurstMode';
import { useNavigate, useLocation } from "react-router-dom";

export const TeamSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={classes.teamSidebar}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          paddingTop: "2rem",
        }}
        component="nav"
      >
        <ListItemButton selected={isActive("/")} onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          selected={isActive("/allservices")}
          onClick={() => navigate("/allservices")}
        >
          <ListItemIcon>
            <HandshakeIcon />
          </ListItemIcon>
          <ListItemText primary="All Services" />
        </ListItemButton>
        <ListItemButton
          selected={isActive("/allpictures")}
          onClick={() => navigate("/allpictures")}
        >
          <ListItemIcon>
            <BurstModeIcon />
          </ListItemIcon>
          <ListItemText primary="All Pictures" />
        </ListItemButton>
        <ListItemButton
          selected={isActive("/enquiries")}
          onClick={() => navigate("/enquiries")}
        >
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText primary="Enquiries" />
        </ListItemButton>
        <ListItemButton
          selected={isActive("/notifications")}
          onClick={() => navigate("/notifications")}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
        <ListItemButton
          selected={isActive("/inbox")}
          onClick={() => navigate("/inbox")}
        >
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>
    </div>
  );
};
