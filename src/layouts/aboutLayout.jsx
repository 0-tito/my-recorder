import { Box } from "@mui/material";
import About from "../components/aboutPageComponents/about";
import  MiniPlaybackControls from "../components/reuseableComponents/MiniPlaybackControls.jsx";
export default function AboutLayout(){
  return  <Box  width={"50%"} margin={"auto"}   height={"100vh"} >
        <About />

    < MiniPlaybackControls />
    </Box>
}