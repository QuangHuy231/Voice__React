import React from "react";
import { useContext } from "react";
import { SocketContext } from "../Context";

const AudioPlayer = () => {
  const { callEnded, callAccepted, myVideo, userVideo } =
    useContext(SocketContext);
  return (
    <div>
      <audio controls ref={myVideo} id="myAudio" muted hidden></audio>
      {callAccepted && !callEnded && (
        <audio controls ref={userVideo} id="userAudio" muted></audio>
      )}
    </div>
  );
};

export default AudioPlayer;
