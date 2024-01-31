import React, { useEffect, useState } from "react";
import classes from "./SingleViewCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { ConnectUsModal } from "../modals/ConnectUsModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviewApi,
  getTeamSingleViewApi,
  postConncetUsApi,
  postReviewApi,
} from "../../store/userSlice";
import { Authentication } from "../modals/Authentication/Authentication";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SingleViewCard = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [isRegistered, setIsRegistered] = useState(true);
  const [teamRegistred, setTeamRegistered] = useState(true);
  const [open, setOpen] = useState(false);
  const [avarageRating, setAvarageRating] = useState(0);
  const [connectUs, setConnectUs] = useState(false);
  const [data, setData] = useState({
    rating: 0,
    review: "",
  });
  const [input, setInput] = useState({
    email: "",
    subject: "",
    message: "A nice day is a nice day. Lao Tseu",
  });

  const params = useParams();
  const dispatch = useDispatch();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsRegistered(true);
    setTeamRegistered(true);
  };

  const categoryId = params?.categoryId;
  const teamId = params?.teamId;
  const accountId = params?.accountId;

  const singleView = useSelector((state) => state.user.teamSingleView);
  const reviews = useSelector((state) => state.user.reviews);

  useEffect(() => {
    setAvarageRating(singleView?.avg_ratings);
  }, [singleView]);

  const handleConnectUsOpen = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      handleOpen();
      return;
    }

    setConnectUs(true);
  };

  const handleConnectUsClose = () => {
    setConnectUs(false);
    setInput({
      message: "A nice day is a nice day. Lao Tseu",
      subject: "",
      email: "",
    });
  };

  useEffect(() => {
    dispatch(getTeamSingleViewApi({ categoryId, teamId }));
    dispatch(getReviewApi(accountId));
  }, []);

  const handleRatingChange = (event, newValue) => {
    setData({ ...data, rating: newValue });
  };

  // Post Review Function
  const handlePostReview = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      handleOpen();
      return;
    }
    if (data.rating <= 0 || !data.review) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill both the rating and review input.",
      });
      return;
    }

    if (!data.review || data.rating === 0) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please add both your star rating and review.",
      });
      return;
    }

    try {
      const response = await dispatch(postReviewApi({ teamId, input: data }));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Review Added successfully!",
        });
        dispatch(getReviewApi(accountId));
        dispatch(getTeamSingleViewApi({ categoryId, teamId }));
        setData({
          review: "",
          rating: 0,
        });
      } else {
        console.error("something went wrong");
        setAlert({
          open: true,
          type: "error",
          text: "Adding Review failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Adding Review failed!. Please try again.",
      });
    }
  };

  // Post ConnectUs Function
  const handlePostConnctUs = async () => {
    if (!input.email || !input.message || !input.subject) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await dispatch(
        postConncetUsApi({ teamId: teamId, input: input })
      );
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Message Sended successfully!",
        });
        handleConnectUsClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Sending Message failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Sending Message failed. Please try again.",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const locale = "en-GB";
    return date.toLocaleString(locale, options);
  };

  return (
    <>
      <div className={classes.singleViewCard_main}>
        <Card sx={{ maxWidth: "75%" }} className={classes.card} elevation={3}>
          <div
            style={{
              width: "50%",
              height: "240px",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <img
              src={singleView?.team_profilepic}
              alt={singleView?.account_view?.team_name}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className={classes.rating}>
            <Rating
              name="half-rating-read"
              value={avarageRating}
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
            onClick={handleConnectUsOpen}
          >
            Connect Us
          </Button>
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              textTransform={"capitalize"}
            >
              {singleView?.account_view?.team_name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                work time:
              </Typography>
              <Typography variant="subtitle2" color="InfoText">
                {singleView?.account_view?.work_time}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                place:
              </Typography>
              <Typography variant="subtitle2" color="InfoText">
                {singleView?.account_view?.place}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                email:
              </Typography>
              <Typography variant="subtitle2" color="InfoText">
                {singleView?.account_view?.email}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" mt="1rem">
              overview:
            </Typography>
            <Typography variant="body2" color="CaptionText">
              {singleView?.account_view?.over_view}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt="1rem">
              address:
            </Typography>
            <Typography variant="body2" color="CaptionText">
              {singleView?.account_view?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt="1rem">
              service offered:
            </Typography>
            <Typography variant="body2" color="CaptionText">
              {singleView?.service_name}
            </Typography>
            {singleView?.profile && singleView?.profile.length > 0 && (
              <>
                <Typography variant="body2" color="text.secondary" mt="1rem">
                  photos:
                </Typography>

                <ImageList
                  sx={{ width: 500, height: 450, marginTop: 1 }}
                  cols={3}
                  rowHeight={164}
                >
                  {singleView?.profile?.map((picture) => (
                    <ImageListItem key={picture?.id}>
                      <img
                        srcSet={`${picture?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${picture?.url}?w=164&h=164&fit=crop&auto=format`}
                        alt={picture?.url}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            )}
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
              value={data.review}
              onChange={(e) => setData({ ...data, review: e.target.value })}
            />
            <Rating
              name="half-rating-read"
              value={data.rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePostReview}
            >
              Post
            </Button>
          </div>
          <div className={classes.review_list}>
            {reviews
              ?.slice()
              .reverse()
              .map((review) => (
                <div key={review?.id} className={classes.review}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccountCircleIcon color="secondary" fontSize="large" />
                      <Stack spacing={0}>
                        <Typography
                          variant="h6.Heading"
                          color="InfoText"
                          textTransform={"capitalize"}
                        >
                          {review?.customer_view}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(review?.created_at)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Rating
                      name="half-rating-read"
                      defaultValue={parseFloat(review?.rating)}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                  <Typography variant="body2" color="InfoText" mt="1rem">
                    {review?.review}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
        <ConnectUsModal
          open={connectUs}
          input={input}
          setInput={setInput}
          handlePostConnctUs={handlePostConnctUs}
          handleClose={handleConnectUsClose}
        />
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
