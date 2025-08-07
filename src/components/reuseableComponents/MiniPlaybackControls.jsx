import { Box, Slider, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { RecorderContext } from "../../store/recorder-context";
import { AudioPlayerContext } from "../../store/audioPlayer-context";
import PlayBackButton from "./PlayBackButton";

export default function MiniPlaybackControls() {
  const { onRecordingState, recordings } = useContext(RecorderContext);
  const {
    audioPlayerState,
    handlePause,
    handlePlay,
    handleSeek,
    handleNext,
    handlePrev,
  } = useContext(AudioPlayerContext);

  const id = audioPlayerState.currentId;
  const audio = recordings.find((audio) => audio.id === id);

  const isLastAudio = (id) => {
    if (!audio || recordings.length === 0) return false;
    const index = recordings.findIndex((audio) => audio.id === id);
    return index === recordings.length - 1;
  };

  const isFirstAudio = (id) => {
    if (!audio || recordings.length === 0) return false;
    const index = recordings.findIndex((audio) => audio.id === id);
    return index === 0;
  };

  const isPlaying = audioPlayerState.isPlaying !== null;

  // Control fade in/out effect
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setVisible(true);
    } else {
      // delay unmount after fade out
      setTimeout(() => setVisible(false), 300);
    }
  }, [isPlaying]);

  return (
    <>
      {recordings.length > 0 && visible  && (
        <Box
          width="22%"
          height="14%"
          p={2}
          m={2}
          boxShadow={6}
          borderRadius={3}
          bgcolor="background.paper" 
          sx={{
            position: "fixed",
            bottom: "13%",
            right: "4%",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            opacity: isPlaying ? 1 : 0,
            transform: isPlaying ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Slider
            sx={{ width: `100%`, mb: 1 }}
            max={audio?.duration || 0}
            value={audioPlayerState.currentTime}
            step={0.1}
            onChange={(e) => handleSeek(e, audio.id)}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            gap={1}
          >
            <PlayBackButton
              handleClick={handlePrev}
              isDisabled={isFirstAudio(id)}
            >
              Prev
            </PlayBackButton>

            {audioPlayerState.isPlaying ? (
              <PlayBackButton handleClick={() => handlePause(audio.id)}>
                Pause
              </PlayBackButton>
            ) : (
              <PlayBackButton
                handleClick={(e) => handlePlay(audio.id, audio.url)}
              >
                Play
              </PlayBackButton>
            )}

            <PlayBackButton
              handleClick={handleNext}
              isDisabled={isLastAudio(id)}
            >
              Next
            </PlayBackButton>
          </Box>
        </Box>
      )}
    </>
  );
}
