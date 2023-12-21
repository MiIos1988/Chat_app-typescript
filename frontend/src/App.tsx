import * as io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import img1 from "./img/peakpx.jpg";

const socket = io.connect("https://chat-app-g62u.onrender.com");
console.log(socket)

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div
      className="App h-screen flex justify-center items-center  "
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!showChat ? (
        <div className="flex flex-col  w-full sm:w-[350px] p-[10px] sm:p-[20px] ">
          <input
            className="p-2 mb-5 rounded-md  "
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="p-2 mb-5 rounded-md"
            type="text"
            placeholder="Room Id..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="p-2 rounded-md bg-[#075e55] shadow-2xl text-white text-xl border-lime-500 border-[1px]"
            onClick={() => {
              if (username && room) {
                socket.emit("enterRoom", room);
                setShowChat(true);
              }
            }}
          >
            Go to Chat
          </button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default App;
