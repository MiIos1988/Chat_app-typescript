import React, { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, room, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("1222222", messageList);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    inputRef.current.focus();
  }, []
  )

  const sendMessage = () => {
    if (currentMessage) {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("sendMsg", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className=" w-full sm:w-[500px] p-[10px] sm:p-[20px]">
      <div className="bg-black rounded-t-lg">
        <p className="text-xl font-bold text-white p-3">Live Chat</p>
      </div>
      <ScrollToBottom className="flex flex-col  h-[80vh] sm:h-[65vh] bg-white/50 overflow-y-auto ">
        {messageList.map((msg, i) => {
          return (
            <div
              key={i}
              className={`${
                msg.author === username ? "bg-blue-500 ml-auto" : "bg-green-500"
              } text-white text-xl p-2 m-2 rounded-lg text-left w-[50%] whitespace-normal break-words`}
            >
              <p>{msg.message}</p>
              <div className="flex justify-between text-xs italic">
                <p>{msg.author}</p>
                <p>{msg.time}</p>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="flex items-center ">
        <input
          ref={inputRef}
          className="p-2 text-xl w-full"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="border-2 p-2 bg-white" onClick={sendMessage}>
          <BsFillSendFill className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Chat;