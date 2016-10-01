/* globals  describe it */
import {requester} from 'requester'
import {userData} from 'user-data'

mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
    username: 'SOME_USERNAME',
    passHash: 'SOME_PASSHASH'
};
describe('Login tests', function () {

    beforeEach(function() {
        sinon.stub(requester, 'post')
            .returns(new Promise((resolve, reject) => {
                resolve({
                    result: {
                        username: user.username,
                        authKey: AUTH_KEY
                    }
                });
            }));
        localStorage.clear();
    });

    afterEach(function() {
        requester.post.restore();
        localStorage.clear();
    });

    it('expect post to be called once', function(done) {
        userData.login(user)
            .then(() => {
                expect(requester.post.calledOnce).to.be.true;
            })
            .then(done, done);
    });
});


mocha.run();