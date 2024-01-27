import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const TeamSingleView = ({ singleTeam, toggleDrawer, open }) => {

  const list = () => (
    <Box sx={{ width: 550 }} role="presentation">
      <List sx={{ padding: "1rem 1.5rem" }}>
        <Avatar
          alt="Team"
          src={singleTeam?.profile}
          sx={{ width: 60, height: 60 }}
        />
        <Typography
          variant="h5"
          gutterBottom
          mt={2}
          textTransform={"capitalize"}
        >
          {singleTeam?.team_name}
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="indigo">
          {singleTeam?.work_time}
        </Typography>
        <Typography variant="body2" mt={2} color="brown">
          Overview:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {singleTeam?.over_view}
        </Typography>
        {/* <Typography variant="body2" mt={2} color="brown">
          Service:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography> */}
      </List>
      <Divider />
      <List sx={{ padding: "1rem 1.5rem", background: "#eceaea" }}>
        <Stack direction={"row"} spacing={1}>
          <Typography variant="body1" gutterBottom color="grey">
            username:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            {singleTeam?.username}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            email:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            {singleTeam?.email}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            phone:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            {singleTeam?.phone}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            place:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            {singleTeam?.place}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            address:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            {singleTeam?.address}
          </Typography>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        {list(open)}
      </Drawer>
    </div>
  );
};
