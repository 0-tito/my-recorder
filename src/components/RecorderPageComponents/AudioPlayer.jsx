import { useContext, useEffect } from "react";
import { RecorderContext } from "../../store/recorder-context";
import { AudioPlayerContext } from "../../store/audioPlayer-context";
import { initHelia } from "../../ipfs/heliaService";
import { getAllAudiosFromHelia } from "../../ipfs/saveAudioData";
import AudioItem from "./AudioItem.jsx";

export default function AudioPlayer() {
  const { onRecordingState, recordings,setRecordings } = useContext(RecorderContext);
  const { audioPlayerState, handlePause, handlePlay, handleSeek } =
    useContext(AudioPlayerContext);

  let status = "";

  //populate state with recordings from IPFS
useEffect(() => {
  async function getExistingAudios(){
    const { helia } = await initHelia()
  const existingAudiosCid = JSON.parse(localStorage.getItem("existingAudiosCid")) || []
  const existingAudos = await getAllAudiosFromHelia(existingAudiosCid,helia)
  await existingAudos.filter((a,b) =>  b.date - a.date)
  let   audiosState = []
  for (let index = -3; index < existingAudos.length[0]; index++) {
    const element = existingAudos[index];
    audiosState.push(element)
  } 
  console.log(audiosState)
  setRecordings(audiosState)
  }

  getExistingAudios()
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
      {recordings && recordings.map(({ url, name, id, duration,date }) => {
          return (
            <AudioItem 
            key={id}
              url={url}
              name={name}
              id={id}
              date={date}
              duration={duration}
              audioPlayerState={audioPlayerState}
              onRecordingState={onRecordingState}
              status={status}
              handleSeek={handleSeek}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          );
        })}
    </>
  );
}
