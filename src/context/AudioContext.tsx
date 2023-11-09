import { ReactNode, createContext } from "react";
import { TrackType } from "../types/Track";
import { useState } from "react";
import tracksList from "../assets/tracksList";

const audio = new Audio();
audio.src = tracksList[0].src;
audio.currentTime = 0;

export interface IAudioContext {
  currentTrack: TrackType;
  isPlaying: boolean;
  handleToggleAudio: (track: TrackType) => void;
  audio: HTMLAudioElement;
}
export const AudioContext = createContext<IAudioContext>({
  currentTrack: tracksList[0],
  isPlaying: false,
  handleToggleAudio: () => {},
  audio,
});

const AudioProvider = ({ children }: { children: ReactNode }) => {
  //
  const [currentTrack, setCurrentTrack] = useState<TrackType>(tracksList[0]);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const handleToggleAudio = (track: TrackType) => {
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      setPlaying(true);
      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();
    } else {
      if (isPlaying) audio.pause();
      else audio.play();
      setPlaying((pre) => !pre);
    }
  };

  const value = {
    currentTrack,
    isPlaying,
    handleToggleAudio,
    audio,
  };
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
