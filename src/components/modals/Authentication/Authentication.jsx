import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import nature from "../../../assets/nature.jpg";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { useDispatch } from "react-redux";
import {
  loginApi,
  registerApi,
  teamRegisterApi,
} from "../../../store/authSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  overflow: "hidden",
};

export const Authentication = ({
  open,
  handleClose,
  isRegistered,
  setIsRegistered,
  teamRegistred,
  setTeamRegistered,
}) => {
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  // Register Api Calling
  const handleRgister = async (data) => {
    if (
      !data.username ||
      !data.email ||
      !data.full_name ||
      !data.phone ||
      !data.password ||
      !data.password2
    ) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }
    try {
      const response = await dispatch(registerApi(data));
      if (response.payload && response.payload.response) {
        setAlert({
          open: true,
          type: "success",
          text: "Registration successful!",
        });
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "This account already exist!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Registration failed. Please try again.",
      });
    }
  };

  // Login Api Calling
  const handleLogin = async (data) => {
    if (!data.username || !data.password) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }
    try {
      const response = await dispatch(loginApi(data));
      if (response.payload && response.payload.response) {
        setAlert({
          open: true,
          type: "success",
          text: "Login successful!",
        });
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Username or Password incorrect!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Login failed. Please try again.",
      });
    }
  };

  // Team Registration Api Calling
  const handleTeamRegister = async (data) => {
    if (
      !data.username ||
      !data.email ||
      !data.team_name ||
      !data.start_time ||
      !data.end_time ||
      !data.over_view ||
      !data.address ||
      !data.place ||
      !data.phone ||
      !data.password ||
      !data.password2 ||
      !data.pin_code ||
      !data.district
    ) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }
    const startTime = new Date(data.start_time.$d);
    const endTime = new Date(data.end_time.$d);

    const formattedStartTime = formatTime(startTime);

    const formattedEndTime = formatTime(endTime);

    const input = {
      username: data.username,
      email: data.email,
      full_name: data.team_name,
      team_name: data.team_name,
      over_view: data.over_view,
      address: data.address,
      phone: data.phone,
      place: data.place,
      password: data.password,
      password2: data.password2,
      pin_code: data.pin_code,
      district: data.district,
      work_time: `${formattedStartTime} to ${formattedEndTime}`,
    };
    try {
      const response = await dispatch(teamRegisterApi(input));
      if (response.payload && response.payload.response) {
        setAlert({
          open: true,
          type: "success",
          text: "Login successful!",
        });
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Account already exist!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Registration failed. Please try again.",
      });
    }
  };

  const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes < 10
    const formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"}>
            <Paper
              elevation={0}
              sx={{
                width: teamRegistred ? "50%" : "50%",
                height: teamRegistred ? 500 : 600,
              }}
            >
              <img
                src={nature}
                alt="Nature"
                style={{ width: "100%", height: "100%" }}
              />
            </Paper>
            <Paper
              elevation={0}
              sx={{
                width: teamRegistred ? "50%" : "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: teamRegistred ? "0 3.5rem" : "0 1.5rem",
              }}
            >
              {isRegistered ? (
                <LoginPage
                  setIsRegistered={setIsRegistered}
                  handleLogin={handleLogin}
                />
              ) : (
                <RegisterPage
                  setIsRegistered={setIsRegistered}
                  teamRegistred={teamRegistred}
                  setTeamRegistered={setTeamRegistered}
                  handleRgister={handleRgister}
                  handleTeamRegister={handleTeamRegister}
                />
              )}
            </Paper>
          </Stack>
        </Box>
      </Modal>
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
  );
};
