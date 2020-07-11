var socket = io();
socket.on('connect',function(){
    console.log("client connect!")

    socket.emit('createMessage',{
        from: 'eli',
        text: "hello eli ...."
    })

    // socket.emit('createEmail',{
    //     to : "a.k@yahoo.com",
    //     text : "سلام عزیزم خوبم تو خوبی؟",
    //     createAt : 987654321
    // })
})
socket.on('disconnect',function(){
    console.log('client disconnect!')
})
socket.on('newEmail',function(email) {
    console.log('newEmail',email)
})
socket.on('newMessage',function(message){
    console.log("new message run " ,message)
})