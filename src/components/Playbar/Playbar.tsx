import style from "./Playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../../context/AudioContext";

const TimeControls = () => {
  const { currentTrack, audio } = useContext(AudioContext);

  const { duration } = currentTrack!;

  const [currentTime, setCurrentTime] = useState<number>(0);
  const formattedCurrentTime = secondsToMMSS(currentTime);
  const sliderCurrentTime = Math.round((currentTime / duration) * 10_000);

  const handleChangeCurrentTime = (event: Event, value: number | number[]) => {
    let v: number;
    if (Array.isArray(value)) {
      v = value[0];
    } else v = value;

    const time = Math.round((v / 10_000) * duration);
    setCurrentTime(time);
    audio.currentTime = time;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>{formattedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={10_000}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  );
};

const Playbar = () => {
  const { handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContext);
  const { duration, title, artists, preview } = currentTrack;
  const formattedDuration = secondsToMMSS(duration);

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <TimeControls />
        <p>{formattedDuration}</p>
      </div>
    </div>
  );
};

export default Playbar;
