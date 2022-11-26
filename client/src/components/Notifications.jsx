import React from "react";
import { useContext } from "react";
import { SocketContext } from "../Context";

const Notifications = () => {
  const { call, callAccepted, answerCall, callDeny } =
    useContext(SocketContext);
  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling:</h1>
          <button onClick={answerCall}>Answer</button>
          <button onClick={callDeny}>Deny</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
