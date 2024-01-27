import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddNotificationModal = ({
  open,
  handleClose,
  handleAddNotification,
  data,
  setData,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          padding: "2rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Publish Notification
        </Typography>
        <TextField
          sx={{ marginTop: "1rem" }}
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          fullWidth
          color="secondary"
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.target.value })}
        />
        <TextField
          sx={{ marginTop: "1rem" }}
          id="outlined-multiline-static"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={data.notification}
          onChange={(e) => setData({ ...data, notification: e.target.value })}
        />

        <Button
          sx={{ marginTop: "2rem" }}
          variant="contained"
          color="secondary"
          onClick={handleAddNotification}
        >
          Publish
        </Button>
      </Paper>
    </Dialog>
  );
};
