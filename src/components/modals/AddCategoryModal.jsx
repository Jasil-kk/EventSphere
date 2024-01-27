import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AddCategoryModal = ({
  categoryName,
  setCategoryName,
  selectedImage,
  setSelectedImage,
  open,
  handleClose,
  handleCreateCategory,
}) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

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
          width: 350,
          padding: "1rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>
        <TextField
          sx={{ marginTop: "0.15rem" }}
          id="outlined-basic"
          label="Enter Cateogry Name..!"
          variant="outlined"
          fullWidth
          color="secondary"
          autoComplete="off"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {!selectedImage && (
          <Button
            sx={{
              marginTop: "1.5rem",
              background: "#4a4949",
              ":hover": { background: "#636262" },
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </Button>
        )}
        {selectedImage && (
          <Stack
            justifyContent="center"
            alignItems="center"
            position="relative"
            mt={1}
            width={"10rem"}
            height={"10rem"}
          >
            <IconButton
              sx={{ position: "absolute", top: "0", right: "0" }}
              aria-label="delete"
              size="large"
              onClick={() => setSelectedImage(null)}
              color="error"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "100%", height: "100%" }}
            />
          </Stack>
        )}
        <Button
          sx={{ marginTop: "1rem" }}
          variant="contained"
          color="secondary"
          onClick={handleCreateCategory}
        >
          Add
        </Button>
      </Paper>
    </Dialog>
  );
};
