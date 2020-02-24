import React from 'react';

// import './SongsList.css'


export const SongsList = (props) => {
  const { songs } = props;

  return (
    <ol className="song-list">
      {songs
        .map(song =>
          <li key={song.id}>
            <span className="song-name">{song.song}</span>
            <span className="song-artist">{song.artist}</span>
          </li>
        )}
    </ol>
  )
}
