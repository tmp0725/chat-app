const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = 4000;

io.on("connection", (socket) => {
  console.log("Successful connection.");

  socket.on("disconnect", () => {
    console.log("Failed to connection.");
  });

  socket.on("open-Chat-Data", (openChatData) => {
    console.log(openChatData);
    socket.emit("return-Open-Chat-Data", openChatData);
  });

  socket.on("join-private-room", (roomNumber) => {
    console.log(roomNumber);
    socket.join(roomNumber);
  });

  socket.on("send-private-message", (privateMessageSender) => {
    console.log(privateMessageSender);
    socket
      .to(privateMessageSender.roomNumber)
      .emit("return-send-private-message", privateMessageSender);
  });
});

server.listen(PORT, () => console.log(`start server at ${PORT} 🚀`));
