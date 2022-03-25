const express = require ("express");
const mongoose = require("mongoose")
const {Msg} = require("./modles/message.js")
const app = express();
const http = require ("http")
const server =  http.createServer(app)
const io = require ("socket.io")(server)
const port = process.env.PORT||3000

mongoose.connect("mongodb://localhost/messageDB").then(()=>{
    console.log("connected to the database")
}).catch(err=>{
    console.log(err)
})

app.set("view engine","ejs")


app.get("/", (req,res)=>{
    res.render("home")
})

io.on("connection",(socket)=>{
    console.log("user connected  ",socket.id)

    socket.on("message",async(data)=>{
        const message = await new Msg({msg:data})
        console.log(data)
        message.save();
        socket.broadcast.emit("message" , data)
    })
})



server.listen(port,()=>{
    console.log(`Server started on port ${port}` )
})