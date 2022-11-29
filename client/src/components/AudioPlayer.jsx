import React from "react";

import { useContext } from "react";
import { SocketContext } from "../Context";

const AudioPlayer = () => {
  const { callEnded, leaveCall, callAccepted, myVideo, userVideo } =
    useContext(SocketContext);

  return (
    <div>
      <audio controls ref={myVideo} id="myAudio" muted hidden></audio>
      {callAccepted && !callEnded && (
        <div className="audio-Container">
          <audio controls ref={userVideo} id="userAudio"></audio>
          <button className="btn-HangUp" onClick={leaveCall}>
            Hang up
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
