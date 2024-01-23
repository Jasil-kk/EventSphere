import React, { useState } from "react";
import classes from "./Popular.module.css";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import {useNavigate} from "react-router-dom"

export const Popular = () => {
  const navigate= useNavigate();
  return (
    <div className={classes.popular_main}>
      <h2 className={classes.heding}>Popular</h2>
      <div className={classes.card_container}>
        {[...Array(14)].map((_, index) => (
          <Card key={index} sx={{ maxWidth: 240, minWidth: 240 }} onClick={()=>navigate("/singleview")}>
            <CardActionArea>
              <Chip
                label="Popular"
                color="secondary"
                sx={{
                  background: "darkorange",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                }}
                size="small"
              />
              <CardHeader title="Shrimp and Chorizo Paella" />
              <CardMedia
                component="img"
                height="130"
                image="https://images.pexels.com/photos/1036269/pexels-photo-1036269.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish ...
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};
