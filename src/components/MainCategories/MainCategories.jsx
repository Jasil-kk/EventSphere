import React from "react";
import classes from "./MainCategories.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {useNavigate} from "react-router-dom"

export const MainCategories = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.mainCategories}>
      <h2 className={classes.heding}>Main Categories</h2>
      <div className={classes.cateogries_container}>
        <Card sx={{ maxWidth: 250 }} onClick={()=>navigate("/companylist")}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="160"
              image="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Lizard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
