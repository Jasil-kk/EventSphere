import React from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export const PublishNotification = () => {
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
            Publish Notification
          </Typography>
          <TextField
            sx={{ marginTop: "1rem" }}
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            fullWidth
            color="secondary"
          />
          <TextField
            sx={{ marginTop: "1rem" }}
            id="outlined-multiline-static"
            label="Multiline"
            fullWidth
            multiline
            rows={4}
            defaultValue="A nice day is a nice day. Lao Tseu"
          />

          <Button
            sx={{ marginTop: "2rem" }}
            variant="contained"
            color="secondary"
          >
            Publish
          </Button>
        </Paper>
      </Stack>
    </AdminLayout>
  );
};
