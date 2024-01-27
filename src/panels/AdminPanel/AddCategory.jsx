import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryAddApi,
  categoryDeleteApi,
  categoryGetApi,
} from "../../store/adminSlice";
import { DeleteModal } from "../../components/modals/DeleteModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AddCategoryModal } from "../../components/modals/AddCategoryModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
export const AddCategory = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.admin.categories);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleAddCategoryModal = () => {
    setAddCategoryModal(true);
  };

  const handleAddCategoryModalClose = () => {
    setAddCategoryModal(false);
    setCategoryName("");
    setSelectedImage(null);
  };

  const handleClickOpen = (categoryId) => {
    setCategoryId(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Category Adding Function
  const handleCreateCategory = async () => {
    const data = {
      categoryName: categoryName,
      selectedImage: selectedImage,
    };

    if (!data.categoryName || !data.selectedImage) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("sub_catagory_name", data.categoryName);
    if (data.selectedImage) {
      formData.append("image", data.selectedImage);
    }
    try {
      const response = await dispatch(categoryAddApi(formData));
      if (response.payload && response.payload.data) {
        setAlert({
          open: true,
          type: "success",
          text: "Category Added successfully!",
        });
        dispatch(categoryGetApi());
        handleAddCategoryModalClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Category Adding failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Category Adding failed. Please try again.",
      });
    }
  };

  // Category Getting
  useEffect(() => {
    dispatch(categoryGetApi());
  }, []);

  // Category Deletion Function
  const handleCategoryDelete = async () => {
    try {
      const response = await dispatch(categoryDeleteApi(categoryId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Deleted Category successfully!",
        });
        dispatch(categoryGetApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Category Deletion failed!",
        });
        handleClose();
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Category Deletion failed. Please try again.",
      });
      handleClose();
    }
  };

  return (
    <AdminLayout>
      <Stack
        width={"100%"}
        minHeight={"calc(100vh - 5rem)"}
        overflow={"auto"}
        padding={"1rem"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Stack
          direction={"row"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: "auto" }}
            onClick={handleAddCategoryModal}
          >
            Add Category
          </Button>
        </Stack>
        <Stack
          mt={1}
          direction={"row"}
          width={"100%"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          maxHeight={"calc(100vh - 10rem)"}
          flexWrap={"wrap"}
          gap={"0.5rem"}
          overflow={"auto"}
        >
          {allCategories?.map((category) => (
            <Card
              key={category?.id}
              sx={{
                width: "14rem",
                height: "13rem",
                position: "relative",
                border: "2px solid #efeaea",
              }}
            >
              <IconButton
                aria-label="delete"
                size="medium"
                color="error"
                sx={{ position: "absolute", top: "0", right: "0" }}
                onClick={() => {
                  handleClickOpen(category?.id);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              <CardMedia
                component="img"
                height="130"
                image={category?.image}
                alt="Category"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {category?.sub_catagory_name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
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
      </Stack>
      <AddCategoryModal
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        open={addCategoryModal}
        handleCreateCategory={handleCreateCategory}
        handleClose={handleAddCategoryModalClose}
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleAccept={handleCategoryDelete}
        text="Are you sure you want to delete this Category?"
      />
    </AdminLayout>
  );
};
