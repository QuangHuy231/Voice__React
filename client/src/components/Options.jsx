import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../Context";

const Options = ({ children }) => {
  const { name, setName, me, callAccepted, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <div>
        <h3>Account Info</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Your ID: {me}</p>
      </div>

      <div>
        <h3>Make A Call</h3>
        <input
          type="text"
          placeholder="ID to Call"
          value={idToCall}
          onChange={(e) => {
            setIdToCall(e.target.value);
          }}
        />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>Hang up</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>Call</button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Options;
