

describe("All Tests", function () {
    let chai
    let assert

    before(async function(){
        chai = await import('chai')
        assert = chai.assert
    })

    describe('Hello Test', function (){
        it('should return hello', () => {
            assert.equal("Hello1", "Hello")
        });
    })
})



