import React, { useState, useEffect } from "react";
import Chat from "./Chat/Chat.jsx";
import "./App.css";

function App() {
  const [docs, setDocs] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onopen = () => {
      console.log("Connected to ws");

      ws.onmessage = msg => {
        setDocs(JSON.parse(msg.data));
        console.log("got ws data", msg);
      };
    };

    fetch("data")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.err) {
          setErr(JSON.stringify(data.msg));
        } else {
          setDocs(data);
        }
      });
  }, []);

  const renderDocs = () => docs.map(d => <div key={d.name}>{d.name}</div>);
  return (
    <div className="App">
      <h1>Reaactive</h1>
      <div> {err} </div>
      {renderDocs()}
      <Chat></Chat>
    </div>
  );
}

export default App;
