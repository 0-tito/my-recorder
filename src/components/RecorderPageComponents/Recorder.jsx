import { useEffect, useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
//custom hooks
import useAudioStream from "../Hooks/useAudioStream.js";
// contexts
import { RecorderContext } from "../../store/recorder-context.jsx";
import { AudioPlayerContext } from "../../store/audioPlayer-context.jsx";
import { RecorderClass } from "./recorderClass.js";
import OnRecordingCompleteModal from "./OnRecordingCompleteModal.jsx";
import StopButton from "./StopButton.jsx";
import PauseButton from "./PauseButton.jsx";
import ResumeButton from "./ResumeButton.jsx";
import StartButton from "./StartButton.jsx";

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

  const { audioPlayerState } = useContext(AudioPlayerContext)

  let { isReady, mediaStream } = useAudioStream();

  // When recording is finished, add the audio blob
  const handleRecordingComplete = (blob, duration) => {
    setOpen(true);
    setPendingRecording({ blob, duration});
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
          <StartButton audioPlayerState={audioPlayerState} handleStartRecording={handleStartRecording}
            onRecordingState={onRecordingState} />
        )}
        {/* Show Stop/Pause/Resume components only while recording  */}
        {!onRecordingState.inActive && (
          <>
            {" "}
            {!onRecordingState.paused && (
              <StopButton handleStopRecording={handleStopRecording} />
            )}
            <PauseButton handlePauseRecording={handlePauseRecording} />
            <ResumeButton handleResumeRecording={handleResumeRecording} />
          </>
        )}
      </Box>
    </>
  );
}
