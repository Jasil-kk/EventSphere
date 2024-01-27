import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationAddApi,
  notificationDeleteApi,
  notificationGetApi,
} from "../../store/adminSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { AddNotificationModal } from "../../components/modals/AddNotificationModal";

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
export const PublishNotification = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [data, setData] = useState({
    subject: "",
    notification: "A nice day is a nice day. Lao Tseu",
  });
  const [addNotificationModal, setAddNotificationModal] = useState(false);
  const dispatch = useDispatch();

  const allNotifications = useSelector((state) => state.admin.notifications);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleAddNotficationModal = () => {
    setAddNotificationModal(true);
  };

  const handleAddNotficationModalClose = () => {
    setAddNotificationModal(false);
    setData({
      subject: "",
      notification: "A nice day is a nice day. Lao Tseu",
    });
  };

  const handleClickOpen = (notificationId) => {
    setNotificationId(notificationId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Add Notification Function
  const handleAddNotification = async () => {
    if (!data.subject || !data.notification) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await dispatch(notificationAddApi(data));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Notifcation Added successfully!",
        });
        dispatch(notificationGetApi());
        handleAddNotficationModalClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Adding Notifcation failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Adding Notification failed. Please try again.",
      });
    }
  };

  // All Notification Get
  useEffect(() => {
    dispatch(notificationGetApi());
  }, []);

  // Delete Notification Function
  const handleDeleteNotification = async () => {
    try {
      const response = await dispatch(notificationDeleteApi(notificationId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Notifcation Deleted successfully!",
        });
        dispatch(notificationGetApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Deleting Notifcation failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Deleting Notification failed. Please try again.",
      });
    }
  };

  return (
    <AdminLayout>
      <Stack
        sx={{ width: "100%", height: "calc(100vh - 5rem)", padding: "1.5rem" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddNotficationModal}
          >
            Add Notification
          </Button>
        </Stack>
        <Stack
          mt={1}
          direction={"column"}
          width={"100%"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          overflow={"auto"}
        >
          {allNotifications?.map((notification) => (
            <Accordion
              key={notification?.id}
              sx={{ background: "#f6f3f3", width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                {notification?.subject}
              </AccordionSummary>
              <AccordionDetails>{notification?.notification}</AccordionDetails>
              <AccordionActions>
                <IconButton
                  aria-label="delete"
                  size="medium"
                  color="error"
                  onClick={() => {
                    handleClickOpen(notification?.id);
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </AccordionActions>
            </Accordion>
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
      <AddNotificationModal
        data={data}
        setData={setData}
        open={addNotificationModal}
        handleAddNotification={handleAddNotification}
        handleClose={handleAddNotficationModalClose}
      />
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleAccept={handleDeleteNotification}
        text="Are you sure you want to delete this Notification?"
      />
    </AdminLayout>
  );
};
