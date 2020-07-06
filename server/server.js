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
})
io.on('disconnect',()=>{
    console.log("server disconnect!")
})

server.listen(port,()=>{
    console.log(`server work on port ${port}`)
})

