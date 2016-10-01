/* globals  describe it */
mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
    username: 'SOME_USERNAME',
    passHash: 'SOME_PASSHASH'
};
describe('Login tests', function () {

    it('asdas', function () {
        expect(2).to.eql(2);
    })

});


mocha.run();