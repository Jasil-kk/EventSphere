import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const TeamSingleView = ({ toggleDrawer, open }) => {
  const list = () => (
    <Box sx={{ width: 550 }} role="presentation">
      <List sx={{ padding: "1rem 1.5rem" }}>
        <Avatar
          alt="Team"
          src="https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg?auto=compress&cs=tinysrgb&w=600"
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="h5" gutterBottom mt={2}>
          Team name
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="indigo">
          9am to 10pm
        </Typography>
        <Typography variant="body2" mt={2} color="brown">
          Overview:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2" mt={2} color="brown">
          Service:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
      </List>
      <Divider />
      <List sx={{ padding: "1rem 1.5rem", background: "#eceaea" }}>
        <Stack direction={"row"} spacing={1}>
          <Typography variant="body1" gutterBottom color="grey">
            username:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            teamname
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            email:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            teamname@gmail.com
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            phone:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            7876788989
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            place:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            kozhikkode
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} mt={1}>
          <Typography variant="body1" gutterBottom color="grey">
            address:
          </Typography>
          <Typography variant="body1" gutterBottom color="blueviolet">
            koduvalliyil, anathode po, 565678
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
