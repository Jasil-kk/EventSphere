import React, { useEffect, useState } from "react";
import { TeamLayout } from "../../layouts/TeamLayout";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AddPicturesModal } from "../../components/modals/AddPicturesModal";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  teamPictureDeleteApi,
  teamPicturesGetApi,
  teamPicturesPostApi,
} from "../../store/teamSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AllPictures = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [delteModal, setDeleteModal] = useState(false);
  const [pictureId, setPictureId] = useState("");
  const dispatch = useDispatch();

  const allPictures = useSelector((state) => state.team.allPictures);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClicklClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteModal = (pictureId) => {
    setDeleteModal(true);
    setPictureId(pictureId);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleCAddPictures = async () => {
    if (!selectedImage) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please select an Image",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("more_photos", selectedImage);

      const response = await dispatch(teamPicturesPostApi(formData));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Pictures Added successfully!",
        });
        dispatch(teamPicturesGetApi());
        handleClicklClose();
        setSelectedImage(null);
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Adding Picture failed",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Adding Picture failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    dispatch(teamPicturesGetApi());
  }, []);

  // Delete Picture Function
  const handleDeletePicture = async () => {
    try {
      const response = await dispatch(teamPictureDeleteApi(pictureId));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Picture Deleted successfully!",
        });
        dispatch(teamPicturesGetApi());
        handleCloseDeleteModal();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Deleting Picture failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Deleting Picture failed. Please try again.",
      });
    }
  };

  return (
    <TeamLayout>
      <Paper
        sx={{
          margin: "1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        elevation={0}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" component="h6" mb="0.5rem">
            All Pictures
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            onClick={handleClickOpen}
          >
            Add Pictures
          </Button>
        </Stack>
        {allPictures && allPictures.length > 0 ? (
          <ImageList
            sx={{ width: 900, height: 500, marginTop: 3 }}
            cols={5}
            rowHeight={164}
          >
            {allPictures?.map((picture) => (
              <ImageListItem key={picture?.id}>
                <img
                  srcSet={`${picture?.more_photos}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${picture?.more_photos}?w=164&h=164&fit=crop&auto=format`}
                  alt={`${picture?.more_photos} item`}
                  loading="lazy"
                />
                <IconButton
                  aria-label="delete"
                  size="medium"
                  color="error"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => handleOpenDeleteModal(picture?.id)}
                >
                  <DeleteIcon fontSize="inherit" color="error" />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Stack
            width={"100%"}
            height={"calc(100vh - 12rem)"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="body1" component="div" color={"GrayText"}>
              No Pictures added. Click 'Add Pictures' Button to add Pictures.
            </Typography>
          </Stack>
        )}
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.text}
        </Alert>
      </Snackbar>
      <AddPicturesModal
        open={open}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleCAddPictures={handleCAddPictures}
        handleClose={handleClicklClose}
      />
      <DeleteModal
        open={delteModal}
        handleAccept={handleDeletePicture}
        handleClose={handleCloseDeleteModal}
        text="Are you sure you want to delete this Picture?"
      />
    </TeamLayout>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
