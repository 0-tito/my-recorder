export const  audioConstraints = {
audio:true,
}

export const createMediaRecorder = (stream) => {
  return new MediaRecorder(stream)
}
