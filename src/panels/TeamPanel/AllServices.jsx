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
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { TeamLayout } from "../../layouts/TeamLayout";
import { AddServiceModal } from "../../components/modals/AddServiceModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addServicesApi,
  allServicesApi,
  deleteServicesApi,
  editServicesApi,
} from "../../store/teamSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AllServices = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [addService, setAddService] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [data, setData] = useState({ service_name: "", sub_catagory: "" });
  const [editData, setEditData] = useState({
    service_name: "",
    sub_catagory: "",
  });
  const [editModal, setEditModal] = useState(false);

  const dispatch = useDispatch();

  const allServices = useSelector((state) => state.team.allServices);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const handleAddService = () => {
    setAddService(true);
  };

  const handleAddServiceClose = () => {
    setAddService(false);
    setData({ service_name: "", sub_catagory: "" });
  };

  const handleClickOpen = (serviceId) => {
    setOpen(true);
    setServiceId(serviceId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEditModal = ({ serviceId, serviceName, category }) => {
    setEditModal(true);
    setServiceId(serviceId);
    setEditData({ service_name: serviceName, sub_catagory: category });
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  // Add Service Function
  const handleCreateService = async () => {
    if (!data.service_name || !data.sub_catagory) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await dispatch(addServicesApi(data));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Service Added successfully!",
        });
        dispatch(allServicesApi());
        handleAddServiceClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "You can only create one service in one catagory!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Adding Service failed. Please try again.",
      });
    }
  };

  // All User Get
  useEffect(() => {
    dispatch(allServicesApi());
  }, []);

  // Delete Service Function
  const handleDeleteService = async () => {
    try {
      const response = await dispatch(deleteServicesApi(serviceId));
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Service Deleted successfully!",
        });
        dispatch(allServicesApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Deleting Service failed!",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Deleting Service failed. Please try again.",
      });
    }
  };

  // Edit Service Function
  const handleEditService = async () => {
    if (!editData.service_name || !editData.sub_catagory) {
      setAlert({
        open: true,
        type: "warning",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      const response = await dispatch(
        editServicesApi({ serviceId: serviceId, input: editData })
      );
      if (response.payload) {
        setAlert({
          open: true,
          type: "success",
          text: "Service Updated successfully!",
        });
        dispatch(allServicesApi());
        handleCloseEditModal();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Updating Service failed",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Updating Service failed. Please try again.",
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
            All Services
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            onClick={handleAddService}
          >
            Add Service
          </Button>
        </Stack>
        {allServices && allServices.length > 0 ? (
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
                    Service Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: 250,
                      backgroundColor: "rgb(223, 222, 222)",
                    }}
                  >
                    Category
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
                {allServices?.map((service, index) => (
                  <TableRow key={service?.id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{service?.service_name}</TableCell>
                    <TableCell align="left">
                      {service?.sub_catagory_name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="info"
                        onClick={() =>
                          handleOpenEditModal({
                            serviceId: service?.id,
                            serviceName: service?.service_name,
                            category: service?.sub_catagory,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="error"
                        onClick={() => handleClickOpen(service?.id)}
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
              No Services added. Click 'Add Service' Button to add Services.
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
      <AddServiceModal
        data={data}
        setData={setData}
        open={addService}
        handleCreateService={handleCreateService}
        handleClose={handleAddServiceClose}
      />
      <DeleteModal
        open={open}
        handleAccept={handleDeleteService}
        handleClose={handleClose}
        text="Are you sure you want to delete this Service?"
      />
      <AddServiceModal
        disabled={true}
        data={editData}
        setData={setEditData}
        open={editModal}
        handleCreateService={handleEditService}
        handleClose={handleCloseEditModal}
      />
    </TeamLayout>
  );
};
