import React, { useEffect, useRef, useState } from "react";
import classes from "./Hero.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import heroPic from "../../assets/hero.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { useDispatch, useSelector } from "react-redux";
import { SearchApi } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const [data, setData] = useState({ location: "", input: "" });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listRef = useRef(null);

  const searchResult = useSelector((state) => state.user.searchResult);

  const districts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  const handleSearch = () => {
    dispatch(SearchApi({ district: data?.location, input: data?.input }));
    setOpen(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const scrolltotop = () => {
    window.scrollTo(0, 0);
  };

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.hero_main}>
      <div className={classes.first_section}>
        <h1 className={classes.main_text}>
          Bringing Your Ideas to Life with Expert <br /> Event Planning...!
        </h1>
        <div className={classes.search_container}>
          <FormControl
            sx={{ minWidth: "10rem", borderRadius: "10px" }}
            color="secondary"
          >
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              sx={{ borderRadius: "10px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.location}
              label="District"
              onChange={(e) => setData({ ...data, location: e.target.value })}
            >
              {districts?.map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputBase
            sx={{ ml: 2, flex: 5 }}
            placeholder="Search the service..."
            inputProps={{ "aria-label": "search google maps" }}
            value={data.input}
            onChange={(e) => setData({ ...data, input: e.target.value })}
            onKeyDown={handleKeyPress}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            color="secondary"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </div>
        {open && (
          <div ref={listRef}>
            {searchResult && searchResult.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 640,
                  maxHeight: 300,
                  bgcolor: "background.paper",
                  borderRadius: 5,
                  overflow: "auto",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                {searchResult?.map((result, index) => (
                  <React.Fragment key={result?.id}>
                    <ListItemButton
                      onClick={() => {
                        navigate(
                          `/singleview/${result?.sub_catagory}/${result?.id}/${result?.account}`
                        );
                        scrolltotop();
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={result?.account_view?.team_name}
                            src={result?.team_profilepic}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={result?.account_view?.team_name}
                          secondary={
                            result?.account_view?.over_view.length > 70
                              ? `${result?.account_view?.over_view.substring(
                                  0,
                                  70
                                )}...`
                              : result?.account_view?.over_view
                          }
                        />
                      </ListItem>
                    </ListItemButton>
                    {index !== searchResult.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Stack width={640} mt={1}>
                <Typography variant="body1" color="gray" align="center">
                  No results found
                </Typography>
              </Stack>
            )}{" "}
          </div>
        )}
      </div>
      <div className={classes.image_section}>
        <img src={heroPic} alt="Hero" />
      </div>
    </div>
  );
};
