import React from 'react';

import { AddSongModal } from './AddSongModal';
import { SongsList } from './SongsList';

import './SongRequestList.css'


export const SongRequestList = (props) => {
  const { songs, addSong } = props;
  const songsPlayed = songs.filter(song => song.isPlayed);
  const songsToBePlayed = songs.filter(song => !song.isPlayed);

  const [showModal, setShowModal] = React.useState(false);

  const handleAddClose = (formData) => {
    console.log("handle closing", formData);
    setShowModal(false);

    if (!formData || !formData.song) return;

    addSong(formData);
  };

  const handleAddOpen = () => {
    setShowModal(true);
  };

  return (
    <>

      <AddSongModal show={showModal} handleClose={handleAddClose} />

      <button type="button" className="add-song" onClick={handleAddOpen}>Request a Song</button>
      
      <h2>Songs To Be Played</h2>
      <SongsList songs={songsToBePlayed} />

      <h2>Songs Already Played</h2>
      <SongsList songs={songsPlayed} />
    </>
  )
}
