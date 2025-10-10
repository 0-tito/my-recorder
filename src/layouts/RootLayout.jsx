import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/rootPageComponents/Nav.jsx";
import NavList from "../components/rootPageComponents/NavList.jsx";
import {  Grid } from "@mui/material";
import { RecorderContext } from "../store/recorder-context.jsx";

export default function RootLayout({}) {
  const { onRecordingState } = useContext(RecorderContext);
  return (
    <Grid
      component="div"
      height="100%"
      padding={"4%"}
      sx={{
        background: "linear-gradient(to bottom,lightgrey,white,darkgrey)",
      }}
    >
      <Nav>
        <NavList  onRecordingState={onRecordingState}/>
      </Nav>

      <>
        <Outlet />
      </>
    </Grid>
  );
}
