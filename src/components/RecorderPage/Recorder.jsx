import { useState, useEffect, useRef } from "react";

import { Box, Typography, Button } from "@mui/material";

import { createMediaRecorder } from "../../config/audioConfig";

//custom hooks
import useAudioStream from "../Hooks/useAudioStream";

export default function Recorder() {
  let { isReady, mediaStream } = useAudioStream();
  let [recorder, setRecorder] = useState();
  let [recordingsUrls, setRecordingsUrls] = useState([]);
  let chunksRef = useRef([]);

  useEffect(() => {
    if (isReady && mediaStream) {
      const newRecorder = createMediaRecorder(mediaStream);

      newRecorder.ondataavailable = (e) => {
       if(e.data && e.data.size > 0){
             console.log("on data avaliable", e.data);
        chunksRef.current.push(e.data);
       }
      };

      newRecorder.onstop = () => {
        let chunks = chunksRef.current;
        const recBlob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(recBlob);
        setRecordingsUrls((prevUrls) => [...prevUrls, url]);
        const audio = new Audio(url);
        audio.play();

        // clear chunk
         chunksRef.current = []
      };

      setRecorder(newRecorder);
    }
  }, [isReady, mediaStream]);

  useEffect(() => {
    if (recorder) {
      console.log(recorder);
    }
  }, [recorder]);

  function handleStartRecording(){
    if (!recorder) return;
    recorder.start();
    console.log(recorder.state);
  }

  function handleStopRecording() {
    if (!recorder) return;
    recorder.stop();
    console.log(recorder.state);
  }

  return (
    <Box
      component={"section"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
    >
      <Typography variant="h4">start recording...</Typography>
      <Box display={"flex"} gap={"20px"}>
        <Typography> </Typography>
        <Button variant="contained" onClick={handleStartRecording}>
          Start recording
        </Button>
        <Button variant="contained" onClick={handleStopRecording}>
          {" "}
          Stop recorder{" "}
        </Button>
      </Box>
      {recordingsUrls.map((recUrl) => {
        return (
          <Box>
            <audio controls src={recUrl} />
            <a href={recUrl} download>
              download
            </a>
          </Box>
        );
      })}
    </Box>
  );
}
