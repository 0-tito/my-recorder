import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from "../components/rootPageComponents/Nav.jsx";
import NavList from "../components/rootPageComponents/NavList.jsx";
import { Box, Grid, Button } from "@mui/material";
export default function RootLayout() {
  return (
    <Grid
      component="div"
      height="100vh"
      padding={"15px"}
      sx={{
           background:"linear-gradient(to bottom,lightgrey,white,darkgrey)"
      }} 
    >

  <Nav>
     <NavList>
      <NavLink to={"/"}>
       <Button variant="contained" color="primary" size="medium">about </Button></NavLink>
      <NavLink to={"/home"}>
      <Button variant="contained" color="primary" size="medium">home </Button></NavLink>
   </NavList>
   </Nav>

      <Box>
        <Outlet />
      </Box>
    </Grid>
  );
}
 