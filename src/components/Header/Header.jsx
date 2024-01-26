import React, { useState } from "react";
import classes from "./Header.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Authentication } from "../modals/Authentication/Authentication";
import { useDispatch } from "react-redux";
import { logoutApi } from "../../store/authSlice";
import {useNavigate} from "react-router-dom";


export const Header = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [teamRegistred, setTeamRegistered] = useState(true);
  const [open, setOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsRegistered(true);
    setTeamRegistered(true);
  };

  const handleLogout = () => {
    dispatch(logoutApi(navigate));
  };

  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.logo}>EventSphere</h2>
        {role !== "admin" && role !== "event_management" && (
          <nav>
            <ul className={classes.nav_item_container}>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>About</li>
              </Link>
              <Link to="/">
                <li>Contact Us</li>
              </Link>
            </ul>
          </nav>
        )}
        {token ? (
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Login
          </Button>
        )}
      </header>
      <Authentication
        open={open}
        handleClose={handleClose}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        teamRegistred={teamRegistred}
        setTeamRegistered={setTeamRegistered}
      />
    </>
  );
};
