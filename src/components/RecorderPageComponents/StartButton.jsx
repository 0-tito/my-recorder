import RecControlButton from "../reuseableComponents/RecControlButton.jsx";
export default function StartButton({ audioPlayerState, handleStartRecording, onRecordingState }) {
    return <RecControlButton
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
}