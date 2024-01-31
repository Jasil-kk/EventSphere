import React, { useEffect, useState } from "react";
import classes from "./CategoryList.module.css";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { EnquiryModal } from "../modals/EnquiryModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeamListApi } from "../../store/userSlice";
import { Authentication } from "../modals/Authentication/Authentication";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { postEnquiryApi } from "../../store/userSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const CategoryList = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [isRegistered, setIsRegistered] = useState(true);
  const [teamRegistred, setTeamRegistered] = useState(true);
  const [open, setOpen] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const [input, setInput] = useState({ name: "", phone: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const categoryId = params?.categoyId;
  const teamList = useSelector((state) => state.user.teamList);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsRegistered(true);
    setTeamRegistered(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleOpenEnquiry = (enquiryId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      handleOpen();
      return;
    }

    setEnquiry(true);
    setEnquiryId(enquiryId);
  };

  const handleEnquiryClose = () => {
    setEnquiry(false);
    setInput({
      name: "",
      phone: "",
    });
  };

  const categoryName = teamList?.[0]?.sub_catagory_name;

  useEffect(() => {
    dispatch(getTeamListApi(categoryId));
  }, []);

  // Post Enquiry Function
  const handlePostEnquiry = async () => {
    if (!input.phone || !input.name) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await dispatch(
        postEnquiryApi({ enquiryId: enquiryId, input: input })
      );
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Enquiry Sended successfully!",
        });
        handleEnquiryClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Sending Enquiry failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Sending Enquiry failed. Please try again.",
      });
    }
  };

  const scrolltotop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={classes.categoryList}>
        <h2 className={classes.heading}>{categoryName}</h2>
        {teamList && teamList.length > 0 ? (
          <div className={classes.card_container}>
            {teamList?.map((team) => (
              <div key={team?.id} className={classes.card_wrapper}>
                <div
                  id="card"
                  className={classes.card}
                  onClick={() => {
                    navigate(
                      `/singleview/${team?.sub_catagory}/${team?.id}/${team?.account}`
                    );
                    scrolltotop();
                  }}
                >
                  <img
                    src={team?.team_profilepic}
                    alt={team?.account_view?.team_name}
                    className={classes.card_pic}
                  />
                  <div>
                    <h4 className={classes.company_name}>
                      {team?.account_view?.team_name}
                    </h4>
                    <h5 className={classes.company_location}>
                      {team?.account_view?.place}
                    </h5>
                    <p className={classes.address}>
                      {team?.account_view?.address}
                    </p>
                    <p className={classes.work_time}>
                      {team?.account_view?.work_time}
                    </p>
                  </div>
                  <div className={classes.card_end}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={team?.avg_ratings}
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
                  onClick={() => handleOpenEnquiry(team?.id)}
                >
                  Enquiry
                </Button>
              </div>
            ))}
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={alert.open}
              autoHideDuration={3000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity={alert.type}
                sx={{ width: "100%" }}
              >
                {alert.text}
              </Alert>
            </Snackbar>
          </div>
        ) : (
          <div className={classes.empty_container}>No team found</div>
        )}
        <EnquiryModal
          open={enquiry}
          input={input}
          setInput={setInput}
          handlePostEnquiry={handlePostEnquiry}
          handleClose={handleEnquiryClose}
        />
      </div>
      <Authentication
        open={open}
        handleClose={handleClose}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        teamRegistred={teamRegistred}
        setTeamRegistered={setTeamRegistered}
      />
    </>
  );
};
