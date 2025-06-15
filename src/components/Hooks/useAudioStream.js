import { useRef,useState,useEffect } from "react";
import { audioConstraints } from "../../config/audioConfig";

export default function() {
    let [mediaStream,setMediaStream] = useState()
    let [isReady,setIsReady] = useState()
    
      useEffect(() => {
        // set audio stream
        async function getAudioStream(){
          try {
            let stream = await navigator.mediaDevices.getUserMedia(audioConstraints);
           setMediaStream(stream)
            setIsReady(true)
          } catch (err) {
            console.log("could not access device audio");
          }
        }
        getAudioStream();
      }, []);

   return {
   mediaStream,
   isReady,
   }
}