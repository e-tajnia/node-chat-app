const path = require('path');
const express = require('express')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'../public')
const {generateMessage,generateLocationMessage}=require('./utils/message')
var {isRealString}= require('./utils/validation')

const socketIo = require('socket.io')
const http = require('http')

var app = express()

var server = http.createServer(app)
var io = socketIo(server)

io.on('connection',(socket)=>{
    console.log('New User connection!')

    socket.on('join',(param,callback)=>{

        if (!isRealString(param.name) || !isRealString(param.room)) {
            callback('name and room is required')
        }
        socket.join(param.room)
        socket.emit('newMessage',generateMessage('Admin', 'wellcom to the chat'))
        socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} joined`,))
        
        callback()
        
    })
    socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from, message.text))
        callback();
    })

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude , coords.longitude))
    })

    socket.on('disconnect',()=>{
        console.log("user disconnect!")
    })
})

app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server work on port ${port}`)
})

