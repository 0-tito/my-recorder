import { Box, Button } from "@mui/material"; // materia ul
//components
import Recorder from "../components/RecorderPageComponents/Recorder.jsx";
import AudioPlayer from "../components/RecorderPageComponents/AudioPlayer.jsx";


export default function RecorderLayout() {
  return (
    <Box
      component={"section"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
       height={"auto"}
    >
      <Recorder />
      <AudioPlayer  />
    </Box>
  );
}
