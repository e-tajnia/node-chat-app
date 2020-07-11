const path = require('path');
const express = require('express')
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'../public')

const socketIo = require('socket.io')
const http = require('http')

var app = express()
app.use(express.static(publicPath))

var server = http.createServer(app)
var io = socketIo(server)
io.on('connection',(socket)=>{
    console.log('server connection!')

    socket.on('createMessage',(message)=>{
        console.log("create message is : ",message)

        io.emit('newMessage',{
            from: 'Admin',
            text: "wellcom to the chat",
            createAt: new Date().getTime()
        })

        socket.broadcast.emit('newMessage',{
            from: 'Admin',
            text: 'new user joined',
            createAt: new Date().getTime()
        })
    })

    // socket.emit('newEmail',{
    //     from : "e.t@yahoo.com",
    //     text : "سلام عزیزم خوبی؟",
    //     createAt : 123456789
    // })

    // socket.on('createEmail',(email)=>{
    //     console.log('createEmail ',email)
    // })

    socket.on('disconnect',()=>{
        console.log("server disconnect!")
    })
})

server.listen(port,()=>{
    console.log(`server work on port ${port}`)
})

