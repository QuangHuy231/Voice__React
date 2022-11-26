import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options";

const App = () => {
  return (
    <div>
      <h1>Phone a friend</h1>

      <AudioPlayer />
      <Notifications />
      <Options />
    </div>
  );
};

export default App;
