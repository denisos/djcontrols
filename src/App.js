import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import *  as firebase from 'firebase';

import { DJPlayList } from './DJPlayList';
import { SongRequestList } from './SongRequestList';

import './App.css';

const mockSongs = [
  {
    song: "Highest in the Room",
    artist: "Travis Scott",
    isPlayed: true,
    timePlayed: "8:30",
    id: 1
  },
  {
    song: "Circles",
    artist: "Post Malone",
    isPlayed: false,
    timePlayed: "",
    id: 2
  },
  {
    song: "Let it Be",
    artist: "Beatles",
    isPlayed: false,
    timePlayed: "",
    id: 3
  }
];

var firebaseConfig = {
  apiKey: "AIzaSyChYtrFXsFsQahwlGbHR0LI1T68ffjZPF8",
  authDomain: "djcontrols-f170b.firebaseapp.com",
  databaseURL: "https://djcontrols-f170b.firebaseio.com",
  projectId: "djcontrols-f170b",
  storageBucket: "djcontrols-f170b.appspot.com",
  messagingSenderId: "590170248448",
  appId: "1:590170248448:web:eb252485b480091a904fe5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// get instance of the firebase database
// https://firebase.google.com/docs/database/web/read-and-write
const databaseRef = firebase.database().ref();
export const songsRef = databaseRef.child("songs")


function App() {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    // firebase listener is triggered anytime data changes
    // "value" - Read and listen for changes to the entire contents of a path.
    songsRef.on("value", snapshot => {
      let latestSongs = [];
      console.log("the firebase ref", snapshot.val());

      // check if has data (false if none) and set in songs
      if (snapshot.exists()) {
        // convert firebase list from key: song to a more friendly list
        snapshot.forEach(childSnapshot => {
          let childKey = childSnapshot.key;  // the firebase generated key
          let song = childSnapshot.val();    // the song object
          console.log("firebase list: ", song, childKey)
          latestSongs.push({ ...song, id: childKey});
        });

        setSongs(latestSongs);
      }
    });
  }, [ ]);

  const addSong = (song) => {
    // adding with push means DB key is generated for you
    songsRef.push().set( { ...song, isPlayed: false });

    // setSongs(songs.concat([ song ]));
  }

  const markSongAsPlayed = (songId) => {
    if (!songId) return;

    setSongs(songs.map(song => {
      if (song.id === songId) {
        song.isPlayed = true;
      } 
      return song;
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route exact path="/" 
            render={(props) => <SongRequestList {...props} songs={songs} addSong={addSong} />}
          />
          <Route exact path="/djplaylist"
            render={(props) => <DJPlayList {...props} songs={songs} markSongAsPlayed={markSongAsPlayed} />}
          />
        </Router>
      </header>
    </div>
  );
}


export default App;
