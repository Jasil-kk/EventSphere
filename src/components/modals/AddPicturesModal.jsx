import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

export const AddPicturesModal = ({
  open,
  selectedImage,
  setSelectedImage,
  handleCAddPictures,
  handleClose,
}) => {
  const handleUploadImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
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
          Add Pictures
        </Typography>
        {selectedImage ? (
          <div style={{ width: 150, height: 150, position: "relative" }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt={selectedImage.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              aria-label="delete"
              size="medium"
              color="error"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleRemoveImage}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ) : (
          <Button
            sx={{
              marginTop: "1.5rem",
              background: "#4a4949",
              ":hover": { background: "#636262" },
            }}
            component="label"
            variant="contained"
            startIcon={<BurstModeIcon />}
          >
            Select images
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadImageChange}
            />
          </Button>
        )}

        <Button
          sx={{ marginTop: "1rem" }}
          variant="contained"
          color="secondary"
          onClick={handleCAddPictures}
        >
          Add
        </Button>
      </Paper>
    </Dialog>
  );
};
