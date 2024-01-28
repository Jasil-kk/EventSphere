import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConnectUsModal = ({
  open,
  input,
  setInput,
  handlePostConnctUs,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Connect Us"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="secondary"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            color="secondary"
            value={input.subject}
            onChange={(e) => setInput({ ...input, subject: e.target.value })}
          />
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            value={input.message}
            onChange={(e) => setInput({ ...input, message: e.target.value })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handlePostConnctUs}
          variant="contained"
          color="secondary"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
