import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InboxIcon from "@mui/icons-material/Inbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [value, setValue] = React.useState("recents");
  const [invisible, setInvisible] = React.useState(true);
  let navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
      }}
      elevation={6}
    >
      <BottomNavigation
        sx={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{ color: "rgba(0, 0, 0, 0.77)" }}
          label="Home"
          icon={<HomeIcon />}
          onClick={() => {
            navigate("/");
          }}
        />
        {/* <Badge
          color="secondary"
          overlap="circular"
          variant="dot"
          invisible={invisible}
        > */}
        <BottomNavigationAction
          sx={{ color: "rgba(0, 0, 0, 0.77)" }}
          label="Inbox"
          icon={<InboxIcon />}
          onClick={() => {
            navigate("/matches");
          }}
        />

        <BottomNavigationAction
          sx={{ color: "rgba(0, 0, 0, 0.77)" }}
          label="Account"
          icon={<AccountCircleIcon />}
          onClick={() => {
            navigate("/settings");
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
