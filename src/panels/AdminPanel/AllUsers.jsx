import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AdminLayout } from "../../layouts/AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { allUsersApi, userDeleteApi } from "../../store/adminSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AllUsers = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.admin.allUsers);
  const totalUsers = useSelector((state) => state.admin.usersCount);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleClickOpen = (userId) => {
    setUserId(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(allUsersApi());
  }, []);

  const handleUserDelete = async () => {
    try {
      const response = await dispatch(userDeleteApi(userId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Deleted User successfully!",
        });
        dispatch(allUsersApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "User Deletion failed!",
        });
        handleClose();
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "User Deletion failed. Please try again.",
      });
      handleClose();
    }
  };
  return (
    <AdminLayout>
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
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"0.25rem"}
        >
          <Typography variant="h6" component="h6">
            All Users
          </Typography>
          <Chip
            label={`total users: ${totalUsers}`}
            variant="filled"
            color="secondary"
          />
        </Stack>
        {allUsers && allUsers.length > 0 ? (
          <TableContainer
            sx={{
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
                    Full Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 250,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 250,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 200,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      minWidth: 100,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers?.map((user, index) => (
                  <TableRow key={user?.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {user?.full_name}
                    </TableCell>
                    <TableCell align="left">{user?.username}</TableCell>
                    <TableCell align="left">{user?.email}</TableCell>
                    <TableCell align="left">{user?.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="error"
                        onClick={() => handleClickOpen(user?.id)}
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
              users is empty
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
        handleClose={handleClose}
        handleAccept={handleUserDelete}
        text="Are you sure you want to delete this User?"
      />
    </AdminLayout>
  );
};
