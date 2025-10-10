import RecControlButton from "../reuseableComponents/RecControlButton.jsx";

export default function StopButton({ handleStopRecording}) {
    return <RecControlButton
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
}