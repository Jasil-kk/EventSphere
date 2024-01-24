import React, { useState } from "react";
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

export const Enquiries = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  Name
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
              <TableRow>
                <TableCell align="left">1</TableCell>
                <TableCell align="left">Muhammed Jasil</TableCell>
                <TableCell align="left">8978677878</TableCell>
                <TableCell align="left">12/01/2023</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    color="error"
                    onClick={handleClickOpen}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        text="Are you sure you want to delete this Enquiry?"
      />
    </TeamLayout>
  );
};
