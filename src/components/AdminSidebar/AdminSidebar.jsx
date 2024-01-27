import React from "react";
import classes from "./AdminSidebar.module.css";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import CampaignIcon from "@mui/icons-material/Campaign";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate,useLocation } from "react-router-dom";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={classes.adminSidebar}>
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
        <ListItemButton selected={isActive("/allusers")} onClick={() => navigate("/allusers")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton selected={isActive("/allteams")} onClick={() => navigate("/allteams")}>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Event Teams" />
        </ListItemButton>
        <ListItemButton selected={isActive("/addcategory")} onClick={() => navigate("/addcategory")}>
          <ListItemIcon>
            <LibraryAddIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        <ListItemButton selected={isActive("/publishnotification")} onClick={() => navigate("/publishnotification")}>
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="Publish Notification" />
        </ListItemButton>
      </List>
    </div>
  );
};
