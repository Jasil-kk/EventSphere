import React, { useEffect } from "react";
import classes from "./MainCategories.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetApi } from "../../store/adminSlice";

export const MainCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.admin.categories);

  useEffect(() => {
    dispatch(categoryGetApi());
  }, []);

    const scrolltotop = ()=> {
    window.scrollTo(0,0)
  }

  return (
    <div className={classes.mainCategories}>
      <h2 className={classes.heding}>Main Categories</h2>
      <div className={classes.cateogries_container}>
        {categories?.map((category) => (
          <Card
            key={category?.id}
            sx={{ width: "50%" }}
            onClick={() => {navigate(`/companylist/${category?.id}`); scrolltotop()}}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="160"
                image={category?.image}
                alt={category?.sub_catagory_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                {category?.sub_catagory_name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};
