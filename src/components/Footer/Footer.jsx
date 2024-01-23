import React from "react";
import classes from "./Footer.module.css";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import whatsapp from "../../assets/whatsapp.svg";
import youtube from "../../assets/youtube.svg";

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <h2 className={classes.logo}>EventSphere</h2>
        <p className={classes.para}>
          Lorem ipsum dolor sit amet consectetur aporis, explicabo iure
          voluptates vel, recusandae.
        </p>
      </div>
      <ul className={classes.items_container}>
        <li>About Us</li>
        <li>Events</li>
        <li>Blogs</li>
      </ul>
      <div className={classes.social_media}>
        <img src={whatsapp} alt="Whatsapp" title="Whatsapp" />
        <img src={instagram} alt="Instagram" title="Instagram" />
        <img src={facebook} alt="Facebook" title="Facebook" />
        <img src={youtube} alt="Youtube" title="Youtube" />
      </div>
    </footer>
  );
};
