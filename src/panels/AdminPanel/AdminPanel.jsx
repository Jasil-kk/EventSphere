import React, { useEffect } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Stack from "@mui/material/Stack";
import PeopleIcon from "@mui/icons-material/People";
import IconButton from "@mui/material/IconButton";
import GroupsIcon from "@mui/icons-material/Groups";
import nature from "../../assets/nature.jpg";
import { useDispatch, useSelector } from "react-redux";
import { allTeamsApi, allUsersApi } from "../../store/adminSlice";

export const AdminPanel = () => {
  const dispatch = useDispatch();

  const allTeams = useSelector((state) => state.admin.allTeams);
  const usersCount = useSelector((state) => state.admin.usersCount);
  const teamCount = allTeams?.length;

  useEffect(() => {
    dispatch(allUsersApi());
    dispatch(allTeamsApi());
  }, []);
  return (
    <AdminLayout>
      <Stack direction="row" spacing={2} alignItems="flex-start" padding="2rem">
        <Card sx={{ width: 345, borderRadius: "20px" }}>
          <CardMedia component="img" height="140" image={nature} alt="Admin" />
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <SentimentSatisfiedAltIcon fontSize="large" />
              <Typography gutterBottom variant="h5" component="div">
                Welcome Admin
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: 345, borderRadius: "20px" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography gutterBottom variant="body1" component="div">
                  Number of Users
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {usersCount}
                </Typography>
              </Stack>
              <IconButton
                size="large"
                sx={{
                  background: "purple",
                  ":hover": { background: "purple" },
                }}
              >
                <PeopleIcon fontSize="inherit" sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: 345, borderRadius: "20px" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography gutterBottom variant="body1" component="div">
                  Number of Teams
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {teamCount}
                </Typography>
              </Stack>
              <IconButton
                size="large"
                sx={{
                  background: "purple",
                  ":hover": { background: "purple" },
                }}
              >
                <GroupsIcon fontSize="inherit" sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </AdminLayout>
  );
};
