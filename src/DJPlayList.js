import React from 'react';

import './DJPlayList.css'


export const DJPlayList = (props) => {
  const { songs, markSongAsPlayed } = props;


  const handleMarkSongAsPlayed = (songId) => {
    markSongAsPlayed(songId);
  };

  return (
    <>
      <h2>DJ PlayList</h2>

      <ol className="song-list">
        {songs
          .filter(song => !song.isPlayed)
          .map(song =>
          <li key={song.id}>
            <span className="song-name">{song.song}</span>
            <span className="song-artist">{song.artist}</span>

            <button
              type="button" 
              className="mark-played" 
              onClick={() => handleMarkSongAsPlayed(song.id)}>Mark as Played</button>
          </li>
        )}
      </ol>
    </>
  )
}