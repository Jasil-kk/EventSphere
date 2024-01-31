import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularApi } from "../../store/userSlice";

export const Popular = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const populars = useSelector((state) => state.user.populars);

  useEffect(() => {
    dispatch(getPopularApi());
  }, []);

  const scrolltotop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.popular_main}>
      <h2 className={classes.heding}>Popular</h2>
      <div className={classes.card_container}>
        {populars?.map((popular) => (
          <Card
            key={popular?.id}
            sx={{ maxWidth: 240, minWidth: 240, height: 370 }}
            onClick={() => {
              navigate(
                `/singleview/${popular?.sub_catagory}/${popular?.id}/${popular?.account}`
              );
              scrolltotop();
            }}
          >
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
              <CardHeader
                sx={{ textTransform: "capitalize" }}
                title={popular?.account_view?.team_name}
              />
              <CardMedia
                component="img"
                height="130"
                image={popular?.team_profilepic}
                alt={popular?.account_view?.team_name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {popular?.account_view?.over_view.length > 80
                    ? `${popular?.account_view?.over_view.substring(0, 80)}...`
                    : popular?.account_view?.over_view}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Rating
                  name="half-rating-read"
                  defaultValue={popular?.avg_ratings}
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
