import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import { Box, Grid } from "@mui/material";
export default function RootLayout() {
  return (
    <Grid
      component={"div"}
      height={"100vh"}
      bgcolor={"grey"}
    >
      <Nav home={"home"} about={"about"} />

      <Box display="flex">
        <Outlet />
      </Box>
    </Grid>
  );
}
