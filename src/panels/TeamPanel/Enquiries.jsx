import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { TeamLayout } from "../../layouts/TeamLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnquiryApi, getEnquiriesApi } from "../../store/teamSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const Enquiries = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const dispatch = useDispatch();

  const allEnquiries = useSelector((state) => state.team.enquiries);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };
  const handleClickOpen = (enquiryId) => {
    setOpen(true);
    setEnquiryId(enquiryId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEnquiriesApi());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Delete Enquiry Function
  const handleDeleteEnquiry = async () => {
    try {
      const response = await dispatch(deleteEnquiryApi(enquiryId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Enquiry Deleted successfully!",
        });
        dispatch(getEnquiriesApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Deleting Enquiry failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Deleting Enquiry failed. Please try again.",
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
      >
        <Typography variant="h6" component="h6" mb="0.5rem">
          Enquiries
        </Typography>

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
                  Enquiry
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    minWidth: 250,
                    backgroundColor: "rgb(223, 222, 222)",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    minWidth: 100,
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
              {allEnquiries?.map((enquiry, index) => (
                <TableRow key={enquiry?.id}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{enquiry?.name} </TableCell>
                  <TableCell align="left">{enquiry?.phone}</TableCell>
                  <TableCell align="left">
                    {" "}
                    {formatDate(enquiry?.created_at)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      size="medium"
                      color="error"
                      onClick={() => handleClickOpen(enquiry?.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        handleAccept={handleDeleteEnquiry}
        handleClose={handleClose}
        text="Are you sure you want to delete this Enquiry?"
      />
    </TeamLayout>
  );
};
