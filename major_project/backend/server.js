const express = require("express");
const app = express()
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();

/*const httpServer = require('http').createServer(app);*/

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

const io = require("socket.io")(server, {
  cors: {
    origin: "https://mern-stack-college-ride-pool.vercel.app/", //specific origin you want to give access to,
  },
});

//http instead of app to listen
server.listen(process.env.PORT, () => {
  console.log("Connected to database and listening to port 8000");
});

//const Server = socket(server);
const db = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

mongoose
  .connect(db)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));

io.on("connection", (socket) => {
  console.log("Socket connected " + socket.id);
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id + " connected");
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    //console.log(room + " joined");
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      console.log("Hey got a message " + newMessageReceived);
      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("Socket disconnected");
    socket.leave(userData._id);
  });
});
