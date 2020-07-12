const expect = require('expect')

var {generateMessage} = require('./message')

describe("Generate Message",()=>{
    it("should generate correct message",()=>{
        var from = 'eli'
        var text = 'hello man'
        var message = generateMessage(from,text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toEqual(expect.objectContaining({from,text}))
    })
})