import { Socket } from "socket.io";
import express from "express"
const app = express();
import cors from "cors"
import { createServer } from "http";
const server = createServer(app);
const portNumber = 3500;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "https://chat-app-typescript-sooty.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("User Connected", socket.id);

  socket.on("enterRoom", (data) => {
    socket.join(data);
  });
  socket.on("sendMsg", (data) => {
    console.log("Room", data);
    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(portNumber, (error?: Error ) => {
  error
    ? console.log("Error on server start")
    : console.log(`Server is running on port ${portNumber}`);
});
