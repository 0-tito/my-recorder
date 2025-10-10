import { Box,ListItem,Button } from "@mui/material"
import { NavLink } from "react-router-dom";

export default function NavList({onRecordingState}){
    return    <Box display={"flex"} gap={"15px"}>
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
          </Box>
}