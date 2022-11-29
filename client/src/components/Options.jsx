import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../Context";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Options = ({ children }) => {
  const { name, setName, me, callAccepted, callEnded, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <div className="info-Container">
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
        <CopyToClipboard text={me} className="btn-Copy">
          <button>Copy Your ID</button>
        </CopyToClipboard>
      </div>

      <div className="call-Container">
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
          ""
        ) : (
          <button className="btn-Call" onClick={() => callUser(idToCall)}>
            Call
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Options;
