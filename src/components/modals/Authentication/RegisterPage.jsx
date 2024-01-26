import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { TeamRegistration } from "./TeamRegistration";

export const RegisterPage = ({
  teamRegistred,
  setTeamRegistered,
  setIsRegistered,
  handleRgister,
  handleTeamRegister,
}) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    full_name: "",
    phone: "",
    password: "",
    password2: "",
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
    handleRgister(data);
  };

  return !teamRegistred ? (
    <TeamRegistration
      setTeamRegistered={setTeamRegistered}
      setIsRegistered={setIsRegistered}
      handleTeamRegister={handleTeamRegister}
    />
  ) : (
    <>
      <Typography variant="h6" gutterBottom color="InfoText" mb={2}>
        Create new account
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        color="secondary"
        fullWidth
        size="small"
        autoComplete="off"
        value={data.full_name}
        onChange={(e) => setData({ ...data, full_name: e.target.value })}
      />
      <TextField
        sx={{ marginTop: "1rem" }}
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
      <TextField
        sx={{ marginTop: "1rem" }}
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
        sx={{ marginTop: "1rem" }}
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        color="secondary"
        fullWidth
        type="number"
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
      <TextField
        sx={{ marginTop: "1rem" }}
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
        sx={{ marginTop: "1rem" }}
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
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        sx={{ marginTop: "1.5rem", textTransform: "capitalize" }}
        fullWidth
        onClick={handleSubmit}
      >
        Create account
      </Button>
      <Stack
        mt={2}
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="body2"
          gutterBottom
          color="blue"
          sx={{ cursor: "pointer" }}
          onClick={() => setIsRegistered(true)}
        >
          Already registered?
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          color="blue"
          sx={{ cursor: "pointer" }}
          onClick={() => setTeamRegistered(false)}
        >
          If you have a team?
        </Typography>
      </Stack>
    </>
  );
};
