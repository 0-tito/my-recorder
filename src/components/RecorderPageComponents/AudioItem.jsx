import { Button, Box, Typography, Slider } from "@mui/material";
import formatDuration from "../../config/formatTime";
import { formatTimestamp } from "../../config/formatTime";

export default function AudioItem({ url, name, id, duration, date, audioPlayerState, onRecordingState, status, handleSeek, handlePause, handlePlay }) {
    return (
        <Box key={id} width={"100%"} height={"100%"}>
            <Typography variant="h6" color="textSecondary">
                {name}
            </Typography>
            <Typography>{formatTimestamp(date)}</Typography>
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
                        ? `${formatDuration(
                            audioPlayerState.currentId === id
                                ? audioPlayerState.currentTime
                                : 0
                        )}/${formatDuration(duration)}`
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
}