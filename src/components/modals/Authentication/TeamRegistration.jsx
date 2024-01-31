import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const TeamRegistration = ({
  setIsRegistered,
  setTeamRegistered,
  handleTeamRegister,
}) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    full_name: "",
    team_name: "",
    over_view: "",
    address: "",
    place: "",
    phone: "",
    password: "",
    password2: "",
    pin_code: "",
    district: "",
    start_time: "",
    end_time: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setData((prevData) => ({ ...prevData, password: newPassword }));

    // Check if the passwords match only if confirmPasswordTouched is true
    if (confirmPasswordTouched) {
      setPasswordMatch(newPassword === data.password2);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setData((prevData) => ({ ...prevData, password2: confirmPassword }));

    // Check if the passwords match
    setPasswordMatch(data.password === confirmPassword);
    setConfirmPasswordTouched(true);
  };

  const handleSubmit = () => {
    handleTeamRegister(data);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom color="InfoText" mb={3}>
        Team Registration
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <TextField
          id="outlined-basic"
          label="Team Name"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.team_name}
          onChange={(e) => setData({ ...data, team_name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </Stack>
      <Stack direction={"row"} spacing={2} mt={2}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          type="email"
          autoComplete="off"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.phone}
          onChange={(e) => {
            const phoneNo = e.target.value;
            if (/^\d{0,10}$/.test(phoneNo)) {
              setData({ ...data, phone: phoneNo });
            }
          }}
        />
      </Stack>
      <Stack direction={"row"} spacing={2} mt={2}>
        <TextField
          id="outlined-basic"
          label="District"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.district}
          onChange={(e) => setData({ ...data, district: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Place"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.place}
          onChange={(e) => setData({ ...data, place: e.target.value })}
        />
      </Stack>
      <Stack direction={"row"} spacing={1} mt={2}>
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          multiline
          rows={3}
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Pincode"
          variant="outlined"
          color="secondary"
          sx={{ minWidth: "6rem" }}
          size="small"
          autoComplete="off"
          value={data.pin_code}
          onChange={(e) => {
            const pincode = e.target.value;
            if (/^\d{0,6}$/.test(pincode)) {
              setData({ ...data, pin_code: pincode });
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Overview"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          multiline
          rows={3}
          value={data.over_view}
          onChange={(e) => setData({ ...data, over_view: e.target.value })}
        />
      </Stack>
      <Typography variant="body2" gutterBottom color="GrayText">
        Work Time
      </Typography>
      <Stack direction={"row"} spacing={2} maxWidth={"18rem"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start"
            value={data.start_time}
            onChange={(newValue) => setData({ ...data, start_time: newValue })}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End"
            value={data.end_time}
            onChange={(newValue) => setData({ ...data, end_time: newValue })}
          />
        </LocalizationProvider>
      </Stack>
      <Stack direction={"row"} spacing={2} mt={2}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          color="secondary"
          fullWidth
          size="small"
          autoComplete="off"
          value={data.password2}
          onChange={handleConfirmPasswordChange}
          error={!passwordMatch && confirmPasswordTouched}
          helperText={
            !passwordMatch && confirmPasswordTouched && "Passwords do not match"
          }
        />
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        sx={{
          width: "70%",
          marginTop: "1.5rem",
          textTransform: "capitalize",
        }}
        onClick={handleSubmit}
      >
        Create account
      </Button>
      <Typography
        variant="body2"
        gutterBottom
        color="blue"
        mt={2}
        width={"100%"}
        textAlign={"left"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          setIsRegistered(true);
          setTeamRegistered(true);
        }}
      >
        Already registered?
      </Typography>
    </>
  );
};
