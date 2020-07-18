var socket = io();

function scrollFunction() {
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight')

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect',function(){
    console.log("client connect!")

    var params = jQuery.deparam(window.location.search)

    socket.emit('join',params,function(err){
        if (err) {
            alert(err)
            window.location.href='/'
        } else {
            console.log('ok')
        }
    })
})
socket.on('disconnect',function(){
    console.log('client disconnect!')
})

socket.on('newMessage',function(message){
    var formmatedTime = moment(message.createdAt).format(`hh : mm a`)
    var template = jQuery('#message-template').html()
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formmatedTime
    })
    jQuery('#messages').append(html)
    scrollFunction()
})

socket.on('newLocationMessage',function(locmessage){
    
    var formmatedTime = moment(locmessage.createdAt).format(`hh : mm a`)
    var loctemplate = jQuery('#location-message-template').html()
    var lochtml = Mustache.render(loctemplate,{
        url : locmessage.url,
        from : locmessage.from,
        createdAt : formmatedTime
    })
    jQuery('#messages').append(lochtml)
    scrollFunction()
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
        locationButton.removeAttr('disable').text('send Location')
        alert('Unable to fetch location')
    })
})

socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>')
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    });
    jQuery('#users').html(ol)
})