const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

dotenv.config();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data)
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log(data.message);
    // socket.broadcast.emit("receive_message", data);

  });


});

server.listen(process.env.PORT, () => {
  console.log(`server is running at Port ${process.env.PORT} `);
});
