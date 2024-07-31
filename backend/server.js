const express=require("express");
const {chats} =require("./data/data");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const color=require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");


dotenv.config();
connectDB();
const app=express();
app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.get("/",(req,res)=>{
    res.send("api is running successfully")
})
// app.get("/api/chat",(req,res)=>{
//     console.log(chats);
//     res.send(chats);
// })
// app.get("/api/chat/:id",(req,res)=>{
//     const singleChat=chats.find((c)=>c._id==req.params.id);
//     res.send(singleChat);
// })
const PORT=process.env.PORT || 5000;
const server=app.listen(PORT,console.log("Server started on port 5000".yellow.bold));


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});