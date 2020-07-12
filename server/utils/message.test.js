const expect = require('expect')

var {generateMessage,generateLocationMessage} = require('./message')

describe("Generate Message",()=>{
    it("should generate correct message",()=>{
        var from = 'eli'
        var text = 'hello man'
        var message = generateMessage(from,text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toEqual(expect.objectContaining({from,text}))
    })
})

describe("Generate Location Message",()=>{
    it("should generate correct location",()=>{
        var from = 'eli'
        var latitude = 15
        var longitude = 39
        var url = 'https://www.google.com/maps?q=15,39'
        var locationMessage = generateLocationMessage(from,latitude,longitude)

        expect(typeof locationMessage.createdAt).toBe('number')
        expect(locationMessage).toEqual(expect.objectContaining({from,url}))
    })
})