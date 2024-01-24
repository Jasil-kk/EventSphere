import React, { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
export const AddCategory = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  return (
    <AdminLayout>
      <Stack
        sx={{ width: "100%", height: "calc(100vh - 7rem)", padding: "2rem" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
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
            Add Category
          </Typography>
          <TextField
            sx={{ marginTop: "1rem" }}
            id="outlined-basic"
            label="Enter Cateogry Name..!"
            variant="outlined"
            fullWidth
            color="secondary"
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
            <Stack justifyContent="center" alignItems="center" position="relative">
              <IconButton
              sx={{position:"absolute",top:"0",right:"0"}}
                aria-label="delete"
                size="large"
                onClick={() => setSelectedImage(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ marginTop: "1rem", maxWidth: "50%" }}
              />
            </Stack>
          )}
          <Button
            sx={{ marginTop: "2rem" }}
            variant="contained"
            color="secondary"
          >
            Add
          </Button>
        </Paper>
      </Stack>
    </AdminLayout>
  );
};
