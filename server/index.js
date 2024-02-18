const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

const PORT = 3000;


const app = express();


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["*"], 
    credentials: true,
},
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["*"], 
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connect", (socket) => {
  console.log("a user connected and the id is, ", socket.id);

//   socket.emit("welcome", "welcome to server.")
//   socket.broadcast.emit("welcome", `${socket.id} joined the server...`);

  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("receive-message", {status : "message paisi!" , data});
    socket.broadcast.to(data.room).emit("receive-message", {status : "message paisi!" , data : data.message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

//   socket.on("join-room", (roomName)=>{
//     socket.join(roomName);
//     console.log(`user joined room ${roomName}`);
//   })

// console.log(socket)

});








server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
