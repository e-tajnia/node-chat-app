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
    var messagename =  jQuery('[name=message]')
    socket.emit('createMessage',{
        from: 'user',
        text: messagename.val()
    },function(){
        messagename.val('')
    })
})
var locationButton = jQuery('#sendLocation');
locationButton.on('click',function () {
    if (!navigator.geolocation) {
        return alert('GeoLocation not support')
    }
    locationButton.attr('disable','disable').text('sending Location ...')
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disable').text('send Location')
        socket.emit('createLocationMessage',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },function(){
        return alert('Unable to fetch location')
    })
})
socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My Current Location </a>')
    li.text(`${message.from} : `)
    a.attr('href',message.url)
    li.append(a)
    jQuery('#messages').append(li)
})