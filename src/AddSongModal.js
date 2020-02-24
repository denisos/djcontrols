import React from 'react';

import './AddSongModal.css';

export const AddSongModal = ({ handleClose, show }) => {
  const [song, setSong] = React.useState("");
  const [artist, setArtist] = React.useState("");

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const blankFields = () => {
    setSong("");
    setArtist("");
  }

  const handleDismiss = () => {
    handleClose();
    blankFields();
  }
  
  const handleAddClose = () => {
    handleClose({song, artist});
    blankFields();
  }

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleSongChange = (event) => {
    setSong(event.target.value);
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Add a Song to Playlist</h2>

        <button className="modal-dismiss" onClick={handleDismiss}>X</button>

        <div>
          <label htmlFor="songName">Song</label>
          <input type="text" id="songName" name="song_name" value={song}
            onChange={handleSongChange}
          />
        </div>
        <div>
          <label htmlFor="mail">Artist</label>
          <input type="email" id="mail" name="song_artist" value={artist}
            onChange={handleArtistChange}
          />
        </div>

        <button onClick={handleAddClose}>Request this Song</button>
      </section>
    </div>
  );
};