import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { TeamLayout } from "../../layouts/TeamLayout";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  deleteNotificationApi,
  getNotificationsApi,
} from "../../store/teamSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const Notifications = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const dispatch = useDispatch();

  const allNotifications = useSelector((state) => state.team.notifications);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleClickOpen = (notificationId) => {
    setOpen(true);
    setNotificationId(notificationId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotificationsApi());
  }, []);

  const handleDeleteNotification = async () => {
    try {
      const response = await dispatch(deleteNotificationApi(notificationId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Notification Deleted successfully!",
        });
        dispatch(getNotificationsApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Deleting Notification failed!",
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    const locale = 'en-GB';
    return date.toLocaleString(locale, options);
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
        <Typography variant="h6" component="h6" mb="0.5rem">
          Notifications
        </Typography>
        {allNotifications && allNotifications.length > 0 ? (
          <TableContainer
            sx={{
              marginTop: "0.5rem",
              maxHeight: "calc(100vh - 10rem)",
              border: "1px solid purple",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 30,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    No.
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 250,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 350,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Message
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 200,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      minWidth: 200,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allNotifications?.map((notification, index) => (
                  <TableRow key={notification?.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{notification?.subject}</TableCell>
                    <TableCell align="left">
                      {notification?.notification}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(notification?.date)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="error"
                        onClick={() => handleClickOpen(notification?.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Stack
            width={"100%"}
            height={"calc(100vh - 12rem)"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="body1" component="div" color={"GrayText"}>
              notifications is empty
            </Typography>
          </Stack>
        )}
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
      </Paper>
      <DeleteModal
        open={open}
        handleAccept={handleDeleteNotification}
        handleClose={handleClose}
        text="Are you sure you want to delete this Message?"
      />
    </TeamLayout>
  );
};
