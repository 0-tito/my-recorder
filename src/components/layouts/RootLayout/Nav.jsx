import { List, Grid } from "@mui/material";
import Logo from "./Logo.jsx";
import NavList from "./NavList.jsx";
export default function Nav() {
  return (
    <Grid
      container
      component={"nav"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      height={"25%"}
      marginBottom={"15px"}
    >
      <Grid item >
        <Logo />
      </Grid>
      <Grid item>
        <NavList home={"home"} about={"about"} />
      </Grid>
    </Grid>
  );
}
