const path = require('path');
const express = require('express')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'../public')
const {generateMessage,generateLocationMessage}=require('./utils/message')

const socketIo = require('socket.io')
const http = require('http')

var app = express()
app.use(express.static(publicPath))

var server = http.createServer(app)
var io = socketIo(server)
io.on('connection',(socket)=>{
    console.log('New User connection!')
    
    socket.emit('newMessage',generateMessage('Admin', 'wellcom to the chat'))

    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined',))

    socket.on('createMessage',(message,callback)=>{
        console.log("create message  ",message)
        
        io.emit('newMessage',generateMessage(message.from, message.text))
        callback();
    })

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude , coords.longitude))
    })

    socket.on('disconnect',()=>{
        console.log("server disconnect!")
    })
})

server.listen(port,()=>{
    console.log(`server work on port ${port}`)
})

