import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import { Box, Grid } from "@mui/material";
export default function RootLayout() {
  return (
    <Grid
      component="div"
      height="100vh"
      paddingRight={"17px"}
      paddingLeft={"17px"}
      sx={{
        
         background:"linear-gradient(to bottom,lightgrey,grey,darkgrey)"
      }}
    >
      <Nav home={"home"} about={"about"} />

      <Box >
        <Outlet />
      </Box>
    </Grid>
  );
}
