import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from "../components/rootPageComponents/Nav.jsx";
import NavList from "../components/rootPageComponents/NavList.jsx";
import { Box, Grid, Button } from "@mui/material";
import { RecorderContext } from "../store/recorder-context.jsx";

export default function RootLayout() {
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
        <NavList>
          <NavLink
            to={"/"}
            onClick={(e) => {
              if (onRecordingState.recording) {
                e.preventDefault();
              }
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              disabled={onRecordingState.recording}
              sx={{
                transition: "all 0.3s ease",
                opacity: onRecordingState.recording ? 0.5 : 1,
                pointerEvents: onRecordingState.recording ? "none" : "auto",
              }}
            >
              about
            </Button>
          </NavLink>
          <NavLink
            to={"/home"}
            onClick={(e) => {
              if (onRecordingState.recording) {
                e.preventDefault();
              }
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              disabled={onRecordingState.recording}
              onClick={(e) => {
                if (onRecordingState.recording) {
                  e.preventDefault();
                }
              }}
              sx={{
                transition: "all 0.3s ease",
                opacity: onRecordingState.recording ? 0.5 : 1,
                pointerEvents: onRecordingState.recording ? "none" : "auto",
              }}
            >
              home
            </Button>
          </NavLink>
        </NavList>
      </Nav>

      <>
        <Outlet />
      </>
    </Grid>
  );
}
