const path = require('path');
const express = require('express')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'../public')
const {generateMessage,generateLocationMessage}=require('./utils/message')
var {isRealString}= require('./utils/validation')
var {Users}=require('./utils/user')

const socketIo = require('socket.io')
const http = require('http')
var users = new Users();

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
        users.removeUser(socket.id)
        users.addUsers(socket.id,param.name,param.room)
        io.to(param.room).emit('updateUserList',users.getUserList(param.room))
        socket.emit('newMessage',generateMessage('Admin', 'wellcom to the chat'))
        socket.broadcast.to(param.room).emit('newMessage',generateMessage('Admin',`${param.name} joined`,))
        
        callback()
        
    })
    socket.on('createMessage',(message,callback)=>{
        var user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text))
        }

        callback();
    })

    socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id)
        if (user) {
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude , coords.longitude))
        }
    })

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has leave`))
        }
    })
})

app.use(express.static(publicPath))

server.listen(port,()=>{
    console.log(`server work on port ${port}`)
})

