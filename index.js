const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://socketfrontend-production-69da.up.railway.app", // React app origin
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // Broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
