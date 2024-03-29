import React from "react";
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

export const EnquiryModal = ({
  open,
  input,
  setInput,
  handlePostEnquiry,
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
      <DialogTitle>{"Enquiry"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            color="secondary"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            color="secondary"
            value={input.phone}
            onChange={(e) => {
              const phoneNo = e.target.value;
              if (/^\d{0,10}$/.test(phoneNo)) {
                setInput({ ...input, phone: phoneNo });
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handlePostEnquiry}
          variant="contained"
          color="secondary"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
