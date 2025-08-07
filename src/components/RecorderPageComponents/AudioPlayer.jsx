import { useContext, useEffect } from "react";
import { Button, Box, Typography, Slider } from "@mui/material";
import { RecorderContext } from "../../store/recorder-context";
import { AudioPlayerContext } from "../../store/audioPlayer-context";
import formatTime from "../../config/formatTime.js";
import base64ToBlob from "../../utilities/base64ToBlob.js";

export default function AudioPlayer() {
  const { onRecordingState, recordings,setRecordings } = useContext(RecorderContext);
  const { audioPlayerState, handlePause, handlePlay, handleSeek } =
    useContext(AudioPlayerContext);

  let status = "";

  //populate state with recordings from localstorage
useEffect(() => {
  const existingAudios = JSON.parse(localStorage.getItem(`recordings`)) || []
  // create new url for each audio blob stored in local storage
  let audioUrls = []
 const updated = existingAudios.map((el) => {
   const url = URL.createObjectURL(base64ToBlob(el.base64Url));
  audioUrls.push(url)
   return {...el,url}
  })
  setRecordings(updated)

  return () => {
     audioUrls.forEach((url) => {
      URL.revokeObjectURL(url)
     })
  }
},[])

  // status rendering logic
  if (audioPlayerState.isPlaying === null) {
    status = "";
  }
  if (audioPlayerState.isPlaying === true) {
    status = "playing...";
  }
  if (audioPlayerState.isPlaying === false) {
    status = "paused";
  }

  return (
    <>
      {recordings &&
        recordings.map(({ url, name, id, duration }) => {
          return (
            <Box key={id} width={"100%"}>
              <Typography variant="h6" color="textSecondary">
                {name}
              </Typography>
              <Typography>
                {audioPlayerState.currentId === id ? status : ""}
              </Typography>
              <Slider
                sx={{
                  width: `20%`,
                }}
                type="range"
                max={duration}
                value={
                  audioPlayerState.currentId === id
                    ? audioPlayerState.currentTime
                    : 0
                }
                step={0.1}
                onChange={(e) => handleSeek(e, id)}
              />

              <Box display={'flex'} gap={9}>
                {" "}
                <Typography alignSelf={'center'}>
                  {duration
                    ? `${formatTime(
                        audioPlayerState.currentId === id
                          ? audioPlayerState.currentTime
                          : 0
                      )}/${formatTime(duration)}`
                    : "loading"}
                </Typography>
                {audioPlayerState.isPlaying &&
                audioPlayerState.currentId === id ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handlePause(id);
                    }}
                  >
                    PAUSE
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled={onRecordingState.recording}
                    sx={{
                      transition: "all 0.3s ease",
                      opacity: onRecordingState.recording ? 0.5 : 1,
                      pointerEvents: onRecordingState.recording
                        ? "none"
                        : "auto",
                    }}
                    onClick={(e) => {
                      onRecordingState.recording
                        ? e.preventDefault()
                        : handlePlay(id, url);
                    }}
                  >
                    PLAY
                  </Button>
                )}{" "}
              </Box>
            </Box>
          );
        })}
    </>
  );
}
