import React, { useState } from "react";
import classes from "./SingleViewCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { ConnectUsModal } from "../modals/ConnectUsModal";

export const SingleViewCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.singleViewCard_main}>
      <Card sx={{ maxWidth: "75%" }} className={classes.card}>
        <CardMedia
          sx={{ height: 240, width: "50%", borderRadius: "5px" }}
          image="https://images.pexels.com/photos/19859154/pexels-photo-19859154/free-photo-of-two-deer-eating-in-the-woods-near-a-tree.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          title="company name"
        />
        <div className={classes.rating}>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            size="large"
          />
        </div>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            backgroundColor: "#353333",
            ":hover": { backgroundColor: "#4c4a4a" },
          }}
          onClick={handleClickOpen}
        >
          Connect Us
        </Button>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Company Name
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              work time:
            </Typography>
            <Typography variant="subtitle2" color="InfoText">
              9am to 10pm
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              place:
            </Typography>
            <Typography variant="subtitle2" color="InfoText">
              Kozhikkode
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              email:
            </Typography>
            <Typography variant="subtitle2" color="InfoText">
              company@gmail.com
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt="1rem">
            overview:
          </Typography>
          <Typography variant="body2" color="CaptionText">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography variant="body2" color="text.secondary" mt="1rem">
            address:
          </Typography>
          <Typography variant="body2" color="CaptionText">
            valappuzha junction, karathode po, aranur, 675667
          </Typography>
          <Typography variant="body2" color="text.secondary" mt="1rem">
            service offered:
          </Typography>
          <Typography variant="body2" color="CaptionText">
            Stage event
          </Typography>
          <Typography variant="body2" color="text.secondary" mt="1rem">
            photos:
          </Typography>
        </CardContent>
      </Card>

      <div className={classes.review_container}>
        <Typography gutterBottom variant="h6" component="div">
          Review
        </Typography>
        <div className={classes.review_form}>
          <TextField
            sx={{ width: "400px" }}
            id="standard-basic"
            label="Write review...!"
            variant="standard"
            color="secondary"
          />
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            size="large"
          />
          <Button variant="contained" color="secondary">
            Post
          </Button>
        </div>
        <div className={classes.review_list}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={classes.review}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountCircleIcon color="secondary" fontSize="large" />
                  <Stack spacing={0}>
                    <Typography variant="h6.Heading" color="InfoText">
                      Jasil
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monday, December 2023
                    </Typography>
                  </Stack>
                </Stack>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Typography variant="body2" color="InfoText" mt="1rem">
                They are awsome
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <ConnectUsModal open={open} handleClose={handleClose} />
    </div>
  );
};
