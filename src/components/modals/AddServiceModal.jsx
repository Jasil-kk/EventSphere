import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetApi } from "../../store/adminSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddServiceModal = ({ data,setData,open, handleClose, handleCreateService }) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.admin.categories);

  useEffect(() => {
    dispatch(categoryGetApi());
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Add Service"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "32ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter Service Name"
            variant="outlined"
            color="secondary"
            value={data.service_name}
            onChange={(e) => setData({ ...data, service_name: e.target.value })}
          />
          <FormControl fullWidth color="secondary">
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Event Organisers"
              value={data.sub_catagory}
              onChange={(e) =>
                setData({ ...data, sub_catagory: e.target.value })
              }
            >
              {categories?.map((category) => (
                <MenuItem key={category?.id} value={category?.id}>
                  {category?.sub_catagory_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateService} variant="contained" color="secondary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
