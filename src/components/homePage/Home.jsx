import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import GlassyMicIcon from "./GlassyMicIcon.jsx";
export default function () {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"5"}
      height={"150px"}
      justifyContent={"space-around"}
      paddingLeft={"20px"}
    >
      <Typography variant="h4">
        Merge your audio with ease and more...{" "}
      </Typography>
      <Box width={"content-fit"} height={"content-fit"}>
        <Button variant="contained" color="primary" size="large">
        <NavLink to={"recorder"}>  recorder  </NavLink>
        </Button>
      </Box>
    </Box>
  );
}
