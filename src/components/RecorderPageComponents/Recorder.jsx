import { useEffect, useContext } from "react";

import { Box, Typography } from "@mui/material";

// reuseable components
import RecControlButton from "../reuseableComponents/RecControlButton.jsx";
//custom hooks
import useAudioStream from "../Hooks/useAudioStream.js";
import { RecorderContext } from "../../store/recorder-context.jsx";

import { RecorderClass } from "./class.js";

export default function Recorder({}) {
  const {
    urls,
    onRecordingState,
    recorderRef,
    setRecordings,
    handleStartRecording,
    handleStopRecording,
    handlePauseRecording,
    handleResumeRecording,
  } = useContext(RecorderContext);

  let { isReady, mediaStream } = useAudioStream();

  // When recording is finished, add the audio URL
  const handleRecordingComplete = (url) => {
    setRecordings((prev) => ({ urls: [...prev.urls, url] }));
  };

  useEffect(() => {
    if (isReady && mediaStream) {
      recorderRef.current = new RecorderClass(
        mediaStream,
        handleRecordingComplete
      );
    }
  }, [isReady, mediaStream]);

  let infoText = "click start to record";
  if (onRecordingState.recording) {
    infoText = " recording..";
  }
  if (onRecordingState.paused) {
    infoText = "recording paused";
  }

  return (
    <>
      <Typography variant="h4">{infoText}</Typography>
      <Box display={"flex"} gap={"20px"}>
        {/* Show Start only if NOT recording */}
        {!onRecordingState.recording && (
          <RecControlButton
            content={"start"}
            variant="contained"
            handleClick={handleStartRecording}
          />
        )}
        {/* Show Stop/Pause/Resume only while recording (and not inactive) */}
        {!onRecordingState.inActive && (
          <>
            {" "}
            {!onRecordingState.paused && (
              <RecControlButton
                content={"stop"}
                variant="contained"
                sx={{
                  focus: {
                    outline: "2px solid orange",
                    outlineoffset: "2px",
                    backgroundColor: "green",
                  },
                }}
                handleClick={handleStopRecording}
              />
            )}
            <RecControlButton
              content={"pause"}
              variant="contained"
              handleClick={handlePauseRecording}
            />
            <RecControlButton
              content={"resume"}
              variant="contained"
              handleClick={handleResumeRecording}
            />
          </>
        )}
      </Box>
    </>
  );
}
