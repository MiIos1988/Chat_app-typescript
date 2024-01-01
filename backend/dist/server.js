"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const server = (0, http_1.createServer)(app);
const portNumber = 3500;
app.use((0, cors_1.default)());
const io = require("socket.io")(server, {
    cors: {
        origin: "https://chat-app-beta-roan.vercel.app",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
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
server.listen(portNumber, (error) => {
    error
        ? console.log("Error on server start")
        : console.log(`Server is running on port ${portNumber}`);
});
