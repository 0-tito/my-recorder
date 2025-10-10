import RecControlButton from "../reuseableComponents/RecControlButton.jsx";

export default function PauseButton({ handlePauseRecording}) {
    return <RecControlButton
        content={"pause"}
        variant="contained"
        handleClick={() => { handlePauseRecording() } }
    />
}