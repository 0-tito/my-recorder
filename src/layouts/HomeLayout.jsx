import { Box, Button } from "@mui/material";
import Home from "../components/homePageComponents/Home.jsx";
import { NavLink } from "react-router-dom";
export default function HomeLayout() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"5"}
      height={"150px"}
      justifyContent={"space-around"}
      paddingLeft={"20px"}
    >
      <Home>
        <Button
          component={NavLink}
          to="http://localhost:5173/recorder"
          variant="contained"
          color="primary"
          size="large"
        >
          Recorder
        </Button>
      </Home>

    </Box>
  );
}
