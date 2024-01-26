import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const LoginPage = ({ handleLogin,setIsRegistered }) => {
  const [data,setData] = useState({
    username:"",password:""
  })

  const handleSubmit = () => {
    handleLogin(data)
  }
  return (
    <>
      <Typography variant="h5" gutterBottom color="InfoText" mb={4}>
        Login
      </Typography>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        color="secondary"
        fullWidth
        autoComplete="off"
        value={data.username}
        onChange={(e)=>setData({...data,username:e.target.value})}
      />
      <TextField
        sx={{ marginTop: "1.5rem" }}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        color="secondary"
        autoComplete="off"
        fullWidth
        value={data.password}
        onChange={(e)=>setData({...data,password:e.target.value})}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ marginTop: "2rem" }}
        fullWidth
        onClick={handleSubmit}
      >
        Login
      </Button>
      <div style={{ width: "100%", textAlign: "left" }}>
        <Typography
          variant="body2"
          gutterBottom
          color="blue"
          mt={2}
          sx={{ cursor: "pointer" }}
          onClick={() => setIsRegistered(false)}
        >
          +Create new account
        </Typography>
      </div>
    </>
  );
};
