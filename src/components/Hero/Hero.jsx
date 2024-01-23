import React, { useState } from "react";
import classes from "./Hero.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import heroPic from "../../assets/hero.png"

export const Hero = () => {
  const [location, setLocation] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <div className={classes.hero_main}>
      <div className={classes.first_section}>
        <h1 className={classes.main_text}>
          Bringing Your Ideas to Life with Expert <br /> Event Planning...!
        </h1>
        <div className={classes.search_container}>
          <FormControl sx={{ minWidth: "10rem",borderRadius:"10px" }} color="secondary">
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
            sx={{borderRadius:"10px"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={handleChange}
            >
              <MenuItem value={10}>Malappuram</MenuItem>
              <MenuItem value={20}>Kozhikkode</MenuItem>
              <MenuItem value={30}>Kochi</MenuItem>
            </Select>
          </FormControl>
          <InputBase
            sx={{ ml: 2, flex: 5 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" color="secondary">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.image_section}>
        <img src={heroPic} alt="Hero" />
      </div>
    </div>
  );
};
