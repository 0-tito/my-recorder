import { Box } from "@mui/material"
import Recorder from "../components/RecorderPageComponents/Recorder.jsx"
import { useContext } from "react";
import { RecorderContext } from "../store/recorder-context.jsx";
export default function RecorderLayout() {
  const { urls } = useContext(RecorderContext)
      return (
        <Box
          component={"section"}
          display={"flex"} 
          flexDirection={"column"}
          gap={"1rem"}
        >  
       <Recorder />
       { urls && urls.map((recUrl) => {
        return (
          <Box>
            <audio controls src={recUrl} />
          </Box>
        );
      }) }
        </Box> )
    }