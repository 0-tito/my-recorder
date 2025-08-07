import {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { RecorderContext } from "./recorder-context";
export const AudioPlayerContext = createContext({
  audioPlayerState: {},
  handlePlay: () => {},
  handlePause: () => {},
  handleSeek: () => {},
  handleNext: () => {},
  handlePrev: () => {},
});

export default function AudioPlayerContextProvider({ children }) {
  const { recordings } = useContext(RecorderContext);

  // COMPONENT STATE
  let [audioPlayerState, setAudioPlayerState] = useState({
    isPlaying: null,
    currentTime: 0,
    currentId: null,
  });

  let audioRef = useRef(new Audio());
 const handleNext = useCallback(
    function handleNext() {
      if (!audioRef.current && recordings.length < 1) return;
      let currentIndex = recordings.findIndex(
        (audio) => audio.id === audioPlayerState.currentId
      );
      let nextIndex = currentIndex + 1;

      if (nextIndex >= recordings.length) return;

      const nextAudio = recordings[nextIndex];
      audioRef.current.src = nextAudio.url;

      audioRef.current
        .play()
        .then(() => {
          setAudioPlayerState((prev) => {
            return {
              ...prev,
              isPlaying: true,
              currentTime: 0,
              currentId: nextAudio.id,
            };
          });
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
        });
    },
    [recordings, audioPlayerState.currentId]
  );

  useEffect(() => {
    let audio = audioRef.current;

    function handleEnd() {
      setAudioPlayerState((prev) => {
        return {
          ...prev,
          isPlaying: null,
          currentTime: 0,
        };
      });

    }

    function handleCurrentTimeUpdate() {
      const currentTime = audioRef.current?.currentTime;
      setAudioPlayerState((prev) => {
        return {
          ...prev,
          currentTime,
        };
      });
    }

    audio.addEventListener("timeupdate", handleCurrentTimeUpdate);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", handleCurrentTimeUpdate);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  // EVENT HANDLERS
  function handlePlay(id, url) {
    if (!audioRef.current) return;

    const isSameAudio = audioPlayerState.currentId === id;

    //resume play,after audio after was paused
    if (isSameAudio) {
      audioRef.current
        .play()
        .then(() => {
          setAudioPlayerState((prev) => ({
            ...prev,
            isPlaying: true,
          }));
        })
        .catch((err) => {
          console.error("Failed to resume audio", err);
        });
    }

    // If  different audio is played
    if (!isSameAudio) {
      // stop it first
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Then load new one
      audioRef.current.src = url;
      audioRef.current
        .play()
        .then(() => {
          setAudioPlayerState({
            isPlaying: true,
            currentTime: 0,
            currentId: id,
          });
        })
        .catch((err) => {
          console.error("Failed to play audio:", err);
        });
    }
  }

  function handlePause(id) {
    if (!audioRef.current) return;
    if (audioPlayerState.currentId === id) {
      audioRef.current.pause();
      setAudioPlayerState((prev) => {
        return {
          ...prev,
          isPlaying: false,
        };
      });
      console.log("paused");
    }
  }

  function handleSeek(e, id) {
    if (!audioRef.current) return;
    let isSameAudio = audioPlayerState.currentId === id
    if (isSameAudio) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setAudioPlayerState((prev) => {
        return {
          ...prev,
          currentTime: newTime,
        };
      });
    }
  }

 

  function handlePrev() {
    if (!audioRef.current && recordings.length < 1) return;
    let currentIndex = recordings.findIndex(
      (audio) => audio.id === audioPlayerState.currentId
    );
    let prevIndex = currentIndex - 1;

    if (prevIndex <= recordings[0]) return;

    const prevAudio = recordings[prevIndex];
    audioRef.current.src = prevAudio.url;
    audioRef.current
      .play()
      .then(() => {
        setAudioPlayerState((prev) => {
          return {
            ...prev,
            isPlaying: true,
            currentTime: 0,
            currentId: prevAudio.id,
          };
        });
      })
      .catch((err) => {
        console.error("Failed to play audio:", err);
      });
  }

  let ctxValue = {
    audioPlayerState,
    handlePlay,
    handlePause,
    handleSeek,
    handleNext,
    handlePrev,
  };

  return (
    <AudioPlayerContext.Provider value={ctxValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
