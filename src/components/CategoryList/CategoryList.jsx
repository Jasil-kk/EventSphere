import React, { useState } from "react";
import classes from "./CategoryList.module.css";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { EnquiryModal } from "../modals/EnquiryModal";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.categoryList}>
      <h2 className={classes.heading}>Category Name</h2>
      <div className={classes.card_container}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={classes.card_wrapper}>
            <div
              id="card"
              className={classes.card}
              onClick={() => navigate("/singleview")}
            >
              <img
                src="https://images.pexels.com/photos/19838367/pexels-photo-19838367/free-photo-of-a-street-with-many-shops-and-buildings-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Company"
                className={classes.card_pic}
                onClick={() => navigate("/singleview")}
              />
              <div onClick={() => navigate("/singleview")}>
                <h4 className={classes.company_name}>company name</h4>
                <h5 className={classes.company_location}>kozhikkode</h5>
                <p className={classes.address}>vadakara, karathode ,674567</p>
                <p className={classes.work_time}>9am to 10pm</p>
              </div>
              <div className={classes.card_end}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </div>
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
              Enquiry
            </Button>
          </div>
        ))}
      </div>
      <EnquiryModal open={open} handleClose={handleClose} />
    </div>
  );
};
