import tracksList from "../../assets/tracksList.js";
import style from "./MainPage.module.scss";
import Track from "../../components/Track/Track";
import { Input } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { TrackType } from "../../types/Track.js";

const runSearch = (query: string): TrackType[] => {
  if (!query) return tracksList;
  const lowerCaseQuery = query.toLowerCase();
  return tracksList.filter((track: TrackType) => {
    return (
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artists.toLowerCase().includes(lowerCaseQuery)
    );
  });
};

const MainPage = () => {
  //

  const [tracks, setTracks] = useState<TrackType[]>(tracksList);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  };
  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Поиск треков"
        onChange={handleChange}
      />
      <div className={style.list}>
        {tracks.length !== 0 ? (
          tracks.map((track) => <Track key={track.id} {...track} />)
        ) : (
          <p className={style.noSearch}>no tracks by your filters</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
