import React from "react";
import { useContext } from "react";
import { SocketContext } from "../Context";
import music from "../music.mp3";

const Notifications = () => {
  const { call, callAccepted, answerCall, callDeny, deny } =
    useContext(SocketContext);
  return (
    <div className="notifications-Container">
      <span>Notifications</span>
      {!deny && <p>Don't Accept 😢😢</p>}
      {call.isReceivingCall && !callAccepted && (
        <div>
          <audio src={music} autoPlay loop></audio>
          <h1>{call.name} is calling:</h1>
          <div className="btn-Container">
            <button className="btn-Answer" onClick={answerCall}>
              Answer
            </button>
            <button className="btn-Deny" onClick={callDeny}>
              Deny
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
