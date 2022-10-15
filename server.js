// add express and socket


const express = require("express")
const path = require("path");
const { Socket } = require("socket.io");


const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

// add views and html 

app.use("/", (req,res) => {

    res.sendFile(__dirname + "/index.html");
}); 
// conect to server 
let messages = [];
io.on("connection",Socket =>  {
    console.log(`socket conectado`);

    Socket.emit('previousMessages', messages);
    Socket.on("sendMessage" , data => {
      messages.push(data);
      Socket.broadcast.emit("receivedMessage",data)
     
    })
});
// listen port 3000
server.listen("3000")
