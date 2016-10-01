mocha.setup('bdd');

const {expect, assert} = chai;

describe('Tests', function () {

    it('expect 2 to be 2 ', function () {
        expect(2).to.eql(2);
    })

});


mocha.run();