import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { AdminLayout } from "../../layouts/AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { TeamSingleView } from "../../components/modals/TeamSingleView";
import { useDispatch, useSelector } from "react-redux";
import {
  allTeamsApi,
  singleTeamApi,
  singleTeamDeleteApi,
} from "../../store/adminSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AllEventTeams = () => {
  const [alert, setAlert] = useState({ open: false, type: "info", text: "" });
  const [open, setOpen] = useState(false);
  const [singleView, setSingleView] = useState(false);
  const [teamId, setTeamId] = useState("");
  const dispatch = useDispatch();

  const allTeams = useSelector((state) => state.admin.allTeams);
  const totalTeam = allTeams?.length;
  const singleTeam = useSelector((state) => state.admin.singleTeam);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, type: "", text: "" });
  };

  const toggleDrawer = (open, teamId) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setTeamId(teamId);
    setSingleView(open);
  };

  const handleClickOpen = (teamId) => {
    setTeamId(teamId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // All Teams Api calling
  useEffect(() => {
    dispatch(allTeamsApi());
  }, []);

  // Single Team Api calling
  useEffect(() => {
    dispatch(singleTeamApi(teamId));
  }, [teamId]);

  const handleTeamDelete = async () => {
    try {
      const response = await dispatch(singleTeamDeleteApi(teamId));
      if (response.payload && response.payload.status === 204) {
        setAlert({
          open: true,
          type: "success",
          text: "Deleted Team successfully!",
        });
        dispatch(allTeamsApi());
        handleClose();
      } else {
        setAlert({
          open: true,
          type: "error",
          text: "Team Deletion failed!",
        });
        handleClose();
      }
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        text: "Team Deletion failed. Please try again.",
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
            All Event Teams
          </Typography>
          <Chip
            label={`total teams: ${totalTeam}`}
            variant="filled"
            color="secondary"
          />
        </Stack>
        {allTeams && allTeams.length > 0 ? (
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
                    Team Name
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
                {allTeams?.map((team, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {team?.team_name}
                    </TableCell>
                    <TableCell align="left">{team?.username}</TableCell>
                    <TableCell align="left">{team?.email}</TableCell>
                    <TableCell align="left">{team?.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="info"
                        onClick={toggleDrawer(true, team?.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        color="error"
                        onClick={() => {
                          handleClickOpen(team?.id);
                        }}
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
              teams is empty
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
      <TeamSingleView
        singleTeam={singleTeam}
        toggleDrawer={toggleDrawer}
        open={singleView}
      />
      <DeleteModal
        open={open}
        handleAccept={handleTeamDelete}
        handleClose={handleClose}
        text="Are you sure you want to delete this Event Team?"
      />
    </AdminLayout>
  );
};
