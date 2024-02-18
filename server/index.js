const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["*"], 
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["*"], 
    credentials: true,
  },
});

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connect", (socket) => {
  console.log("a user connected and the id is, ", socket.id);


  socket.on("message", (data) => { // Listen for "message" event on individual sockets
    console.log(data);
    io.emit("receive-message", data); // Emit to all connected sockets
  });
});






server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
