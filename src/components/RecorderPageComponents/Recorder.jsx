import { useEffect, useContext, useState } from "react";

import { Box, Typography } from "@mui/material";

// reuseable components
import RecControlButton from "../reuseableComponents/RecControlButton.jsx";
//custom hooks
import useAudioStream from "../Hooks/useAudioStream.js";
// contexts
import { RecorderContext } from "../../store/recorder-context.jsx";
import { AudioPlayerContext } from "../../store/audioPlayer-context.jsx";

import { RecorderClass } from "./recorderClass.js";
import OnRecordingCompleteModal from "./OnRecordingCompleteModal.jsx";

export default function Recorder() {
  let [open, setOpen] = useState(false);
  let [pendingRecording, setPendingRecording] = useState({});

  const {
    onRecordingState,
    recorderRef,
    handleStartRecording,
    handleStopRecording,
    handlePauseRecording,
    handleResumeRecording,
  } = useContext(RecorderContext);

  const {audioPlayerState} = useContext(AudioPlayerContext)

  let { isReady, mediaStream } = useAudioStream();

  // When recording is finished, add the audio URL
  const handleRecordingComplete = ( blob, duration) => {
    setOpen(true);
    setPendingRecording({ blob, duration });
  };

  // initializing the stream
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
      <OnRecordingCompleteModal
        setOpen={setOpen}
        open={open}
         blob={pendingRecording.blob}
        duration={pendingRecording.duration}
      />
      <Typography variant="h4">{infoText}</Typography>
      <Box display={"flex"} gap={"20px"}>
        {/* Show Start component only when NOT recording */}
        {!onRecordingState.recording && (
          <RecControlButton
            content={"start"}
            variant="contained"
            disabled={audioPlayerState.isPlaying}
            sx={{
              transition: "all 0.3s ease",
              opacity: onRecordingState.recording ? 0.5 : 1,
              pointerEvents: onRecordingState.recording ? "none" : "auto",
            }}
            handleClick={(e) => {
               audioPlayerState.isPlaying ? e.preventDefault() : handleStartRecording()
            }
            }
          />
        )}
        {/* Show Stop/Pause/Resume components only while recording  */}
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
