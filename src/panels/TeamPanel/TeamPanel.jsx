import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import nature from "../../assets/nature.jpg";
import { TeamLayout } from "../../layouts/TeamLayout";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  allServicesApi,
  getEnquiriesApi,
  getInboxsApi,
  getNotificationsApi,
} from "../../store/teamSlice";

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

export const TeamPanel = () => {
  const dispatch = useDispatch();

  const allservices = useSelector((state) => state.team.allServices);
  const allEnquiries = useSelector((state) => state.team.enquiries);
  const allNotifications = useSelector((state) => state.team.notifications);
  const allInboxes = useSelector((state) => state.team.inboxes);

  const servicesCount = allservices.length;
  const enquiriesCount = allEnquiries.length;
  const notificationsCount = allNotifications.length;
  const inboxesCount = allInboxes.length;

  useEffect(() => {
    dispatch(allServicesApi());
    dispatch(getEnquiriesApi());
    dispatch(getNotificationsApi());
    dispatch(getInboxsApi());
  }, []);

  return (
    <TeamLayout>
      <Stack direction="row" spacing={2} alignItems="flex-start" padding="2rem">
        <Card sx={{ width: 440, borderRadius: "20px", position: "relative" }}>
          <CardMedia component="img" height="100" image={nature} alt="Admin" />
          <CardContent>
            <Typography
              sx={{
                position: "absolute",
                top: "10px",
                left: "1rem",
                color: "#fff",
              }}
              gutterBottom
              variant="h6"
              component="div"
            >
              Welcome Back...!
            </Typography>
            <Avatar
              alt="Team"
              src="https://images.pexels.com/photos/18898559/pexels-photo-18898559/free-photo-of-haunted-forest.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              sx={{
                width: 60,
                height: 60,
                position: "absolute",
                top: "70px",
                left: "1rem",
                border: "2px solid #fff",
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              mt={2}
            >
              <Typography gutterBottom variant="h5" component="div">
                jj events
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ textTransform: "capitalize" }}
              >
                Upload more pics
                <VisuallyHiddenInput type="file" />
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Stack spacing={1}>
          <Card sx={{ width: 345, borderRadius: "20px" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography gutterBottom variant="body1" component="div">
                    Number of Services
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {servicesCount}
                  </Typography>
                </Stack>
                <IconButton
                  size="large"
                  sx={{
                    background: "purple",
                    ":hover": { background: "purple" },
                  }}
                >
                  <HandshakeIcon fontSize="inherit" sx={{ color: "#fff" }} />
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
                    Notifications
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {notificationsCount}
                  </Typography>
                </Stack>
                <IconButton
                  size="large"
                  sx={{
                    background: "purple",
                    ":hover": { background: "purple" },
                  }}
                >
                  <NotificationsIcon
                    fontSize="inherit"
                    sx={{ color: "#fff" }}
                  />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Stack spacing={1}>
          <Card sx={{ width: 345, borderRadius: "20px" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography gutterBottom variant="body1" component="div">
                    Number of Enquiry
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {enquiriesCount}
                  </Typography>
                </Stack>
                <IconButton
                  size="large"
                  sx={{
                    background: "purple",
                    ":hover": { background: "purple" },
                  }}
                >
                  <SupportAgentIcon fontSize="inherit" sx={{ color: "#fff" }} />
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
                    Inbox
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {inboxesCount}
                  </Typography>
                </Stack>
                <IconButton
                  size="large"
                  sx={{
                    background: "purple",
                    ":hover": { background: "purple" },
                  }}
                >
                  <EmailIcon fontSize="inherit" sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </TeamLayout>
  );
};
