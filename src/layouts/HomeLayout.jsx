import { Box, Button } from "@mui/material";
import Home from "../components/homePageComponents/Home.jsx";
import { NavLink } from "react-router-dom";
import  MiniPlaybackControls from "../components/reuseableComponents/MiniPlaybackControls.jsx";
export default function HomeLayout() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"2rem"}
      height={"100vh"}
      sx={{
        backgroundColor: 'transparent',
        position:"relative",
      }}
    >
      <Home>
        <Button
          component={NavLink}
          to="http://localhost:5173/recorder"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width:'30%',
          }}
        >
          Recorder
        </Button>
      </Home>
      
      < MiniPlaybackControls />
    </Box>
  );
}
