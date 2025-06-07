import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import { Box, Grid } from "@mui/material";
export default function RootLayout() {
  return (
    <Grid
      component="div"
      height="100vh"
      sx={{
        
         background:"linear-gradient(to bottom,lightgrey,white,darkgrey)"
      }}
    >
      <Nav home={"home"} about={"about"} />

      <Box >
        <Outlet />
      </Box>
    </Grid>
  );
}
