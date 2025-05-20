const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Enable CORS for frontend origin
app.use(cors({
  origin: "https://socketfrontend-production-69da.up.railway.app",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://socketfrontend-production-69da.up.railway.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("📨 Message received:", data);
    io.emit("receive_message", data); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
