import React from "react";
import classes from "./Header.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes.logo}>EventSphere</h2>
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
      <Button variant="contained" color="secondary">
        Login
      </Button>
    </header>
  );
};
