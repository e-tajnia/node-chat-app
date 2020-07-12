var socket = io();
socket.on('connect',function(){
    console.log("client connect!")

})
socket.on('disconnect',function(){
    console.log('client disconnect!')
})
socket.on('newMessage',function(message){
    console.log("new message run " ,message)
    
    var li = jQuery('<li></li>')
    li.text(`${message.from} : ${message.text}`)
    jQuery('#messages').append(li)

})
jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'user',
        text: jQuery('[name=message]').val()
    })
})
