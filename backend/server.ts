import { Socket } from "socket.io";
const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const portNumber = 3500;

app.use(cors());
const io = require("socket.io")(server, {
  cors: {
    origin: "https://chat-app-beta-roan.vercel.app",
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

server.listen(portNumber, (error: Error | null) => {
  error
    ? console.log("Error on server start")
    : console.log(`Server is running on port ${portNumber}`);
});
