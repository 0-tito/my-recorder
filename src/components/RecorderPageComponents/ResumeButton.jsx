import RecControlButton from "../reuseableComponents/RecControlButton.jsx";
export default function ResumeButton({handleResumeRecording}) {
    return <RecControlButton
        content={"resume"}
        variant="contained"
        handleClick={handleResumeRecording}
    />
}