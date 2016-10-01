/* globals  describe, it, beforeEach, afterEach */
import {requester} from 'requester'
import {userData} from 'user-data'
import {kinveyConst} from 'kinvey-constants'
import {threadData} from 'thread-data'

mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
    username: 'SOME_USERNAME',
    password: 'SOME_PASSHASH'
};

describe('UserData tests', function () {
    describe('Register tests', function () {
        beforeEach(function () {
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

        afterEach(function () {
            requester.post.restore();
            localStorage.clear();
        });

        it('Expect post() to be called once', function(done) {
            userData.register(user)
                .then(() => {
                    expect(requester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('Expect UserData.register() to make correct POST call', function(done) {
            let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/`;
            userData.register(user)
                .then(() => {
                    const actual = requester.post
                        .firstCall
                        .args[0];
                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });

        it('Expect userData.register() to call post with two parameters', function (done) {
            userData.register(user)
                .then(()=> {
                    expect(requester.post.firstCall.args.length).to.equal(2);
                })
                .then(done,done)
        });

        it('Expect UserData.register() to call post with valid url', function (done) {
            userData.register(user)
                .then(()=>{
                    expect(requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_ry0hRoka/`)
                })
                .then(done,done)
        });

        it('Expect UserData.register() to post correct user data', function(done) {
            userData.register(user)
                .then(() => {
                    const actual = requester.post
                        .firstCall
                        .args[1];
                    const prop = Object.keys(actual).sort();
                    expect(prop[0]).to.equal('data');
                    expect(prop[1]).to.equal('headers');
                })
                .then(done, done);
        });
    });

    describe('Login tests', function () {

        beforeEach(function () {
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

        afterEach(function () {
            requester.post.restore();
            localStorage.clear();
        });

        it('Expect post() to be called once', function (done) {
            userData.login(user)
                .then(() => {
                    expect(requester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('Expect UserData.login() to make correct POST call', function (done) {
            let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;
            userData.login(user)
                .then(() => {
                    const actual = requester.post
                        .firstCall
                        .args[0];
                    expect(actual).to.equal(url);
                })
                .then(done, done);
        });

        it('Expect UserData.login() to call post with two parameters', function (done) {
            userData.login(user)
                .then(()=> {
                    expect(requester.post.firstCall.args.length).to.equal(2);
                })
                .then(done,done)
        });

        it('Expect UserData.login() to call post with valid url', function (done) {
            userData.login(user)
                .then(()=>{
                    expect(requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_ry0hRoka/login`)
                })
                .then(done,done)
        });

        it('Expect UserData.login() to put correct user data', function (done) {
            userData.login(user)
                .then(() => {
                    const actual = requester.post
                        .firstCall
                        .args[1];
                    const prop = Object.keys(actual).sort();
                    expect(prop[0]).to.equal('data');
                    expect(prop[1]).to.equal('headers');
                })
                .then(done, done);
        });


    });

    describe('Logout tests', function () {
        beforeEach(function () {
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
        afterEach(function () {
            requester.post.restore();
            localStorage.clear();
        });

        it('Expect localStorage to have no username after logout', function (done) {
            userData.login()
                .then(() => {
                    return userData.logout();
                })
                .then(() => {
                    expect(localStorage.getItem('username')).to.be.null;
                })
                .then(done, done);
        });

        it('Expect localStorage to have no authKey after logout', function (done) {
            userData.login()
                .then(() => {
                    return userData.logout();
                })
                .then(() => {
                    expect(localStorage.getItem('authKey')).to.be.null;
                })
                .then(done, done);
        });
    });
});

describe('ThreadData tests', function () {
    describe('GetThread tests', function () {
        beforeEach(function () {
            sinon.stub(requester, 'get')
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

        afterEach(function () {
            requester.get.restore();
            localStorage.clear();
        });

        it('Expect getThread() to be called with correct url', function () {
            threadData.getThread()
                .then(()=> {
                    const actual = requester.get.firstCall
                        .args[1];

                    console.log(actual);
                })

        })
    });
});


mocha.run();