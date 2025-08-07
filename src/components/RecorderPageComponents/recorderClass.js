import { createMediaRecorder } from "../../config/audioConfig";

export class RecorderClass {
  constructor(stream, onRecordingComplete) {
    this.stream = stream;
    this.onRecordingComplete = onRecordingComplete;
    this.mediaRecorder = createMediaRecorder(stream);
    this.chunks = [];
    this.Start = 0

    // Event: called when data is available during recording
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0){
        this.chunks.push(e.data);
      }
    };


    // Event: called when recording is stopped
    this.mediaRecorder.onstop = () => {
      const now = Date.now() 
      const duration = this.Start ? Math.floor((now - this.Start) / 1000) : 0; // in seconds
      const blob = new Blob(this.chunks, { type: "audio/webm" });
      this.onRecordingComplete(blob, duration);
      this.chunks = []; // clear 
    };
  }


  // method: start recording
  start() {
    if (
      this.mediaRecorder.state !== "recording" &&
      this.mediaRecorder.state !== "paused"
    ) {
      this.mediaRecorder.start();
      this.Start = Date.now()
    }
  }
  // method: end recording
  stop() {
    if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop();
    }
  }
  pause(){
    if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
      console.log("recording paused");
    }
  }
  resume() {
    if (this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
      console.log("recording resumed");
    }
  }
}