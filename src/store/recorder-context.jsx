import { useState,useRef, useReducer } from "react";
import { createContext } from "react";

export const RecorderContext = createContext({
    recordings: [],
    onRecordingState:{},
    setRecordings: () => {},
    handleStartRecording: () => {},
    handlePauseRecording: () => {},
    handleResumeRecording: () => {},
    handleStopRecording: () => {},
})

function onRecordingReducer(state,action) {
   if(action.type === 'START_RECORDING' ){
        return {
          ...state,
          recording: true,
          inActive: false,
        };
    }
   

  if(action.type === 'STOP_RECORDING'){
        return {
          ...state,
          recording: false,
          inActive: true,
        };
  }

if(action.type === 'PAUSE_RECORDING'){
        return {
          ...state,
          paused: true,
        };
}

if(action.type === "RESUME_RECORDING"){
        return {
          ...state,
          paused: false,
        };
}
return state
}

export default function RecorderContextProvider({ children}) {
  const [onRecordingState,onRecordingDispatch] = useReducer(onRecordingReducer,{
    paused: false,
    recording: false,
    inActive: true,
  })


  let [recordings, setRecordings] = useState([]);

  let recorderRef = useRef(); 

 const handleStartRecording = () => {
      if (recorderRef.current)  recorderRef.current.start(); 
  onRecordingDispatch({
    type: 'START_RECORDING',
    payload:null,
  })
  };

  const handleStopRecording = () => {
      if (recorderRef.current)  recorderRef.current.stop(); 
     onRecordingDispatch({
    type: 'STOP_RECORDING',
    payload:null,
  })
  };

  const handlePauseRecording = () => {
      if (recorderRef.current)  recorderRef.current.pause(); 
         onRecordingDispatch({
    type: 'PAUSE_RECORDING',
    payload:null,
  })
  };

  const handleResumeRecording = () => {
      if (recorderRef.current)  recorderRef.current.resume(); 
           onRecordingDispatch({
    type: 'RESUME_RECORDING',
    payload:null,
  })
  };

 const ctxValue = {
    recordings,
    onRecordingState,
    recorderRef, 
    setRecordings,
    handleStartRecording,
    handlePauseRecording,
    handleResumeRecording,
    handleStopRecording,
 };

 return <RecorderContext.Provider  value={ctxValue}>
    {children}
 </RecorderContext.Provider>
} 