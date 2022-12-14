import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [deny, setDeny] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        myVideo.current.autoplay = false;

        // window.localStream = currentStream; // A
        // window.localAudio.srcObject = currentStream; // B
        // window.localAudio.autoplay = true; // C
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    setDeny(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      userVideo.current.autoplay = true;

      //   window.remoteAudio.srcObject = currentStream;
      //   window.remoteAudio.autoplay = true;
      //   window.peerStream = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    socket.on("userLeave", () => {
      window.location.reload();
    });
  };
  const callDeny = () => {
    socket.emit("Deny");
    setCall({});
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      userVideo.current.autoplay = true;
      //   window.remoteAudio.srcObject = currentStream; // C
      //   window.remoteAudio.autoplay = true; // D
      //   window.peerStream = currentStream; //
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setDeny(true);

      peer.signal(signal);
    });
    socket.on("userDeny", () => {
      setDeny(false);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("leaveCall");

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        callDeny,
        deny,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
