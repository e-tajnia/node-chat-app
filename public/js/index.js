var socket = io();
socket.on('connect',function(){
    console.log("client connect!")

    socket.emit('createEmail',{
        to : "a.k@yahoo.com",
        text : "سلام عزیزم خوبم تو خوبی؟",
        createAt : 987654321
    })
})
socket.on('disconnect',function(){
    console.log('client disconnect!')
})
socket.on('newEmail',function(email) {
    console.log('newEmail',email)
})