import { createMediaRecorder } from "../../config/audioConfig";

export class RecorderClass {
  constructor(stream, onRecordingComplete) {
    this.stream = stream;
    this.onRecordingComplete = onRecordingComplete;
    this.mediaRecorder = createMediaRecorder(stream);
    this.chunk = [];

    // Event: called when data is available during recording
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        console.log("ondataavailable", e.data);
        this.chunk.push(e.data);
      }
    };


    // Event: called when recording is stopped
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunk, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      this.onRecordingComplete(url);
      this.chunk = []; // clear chunks
    };
  }


  // method: start recording
  start() {
    if (
      this.mediaRecorder.state !== "recording" &&
      this.mediaRecorder.state !== "paused"
    ) {
      this.mediaRecorder.start();
      console.log(this.mediaRecorder.state);
    }
  }
  // method: end recording
  stop() {
    if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop();
      console.log(this.mediaRecorder.state);
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