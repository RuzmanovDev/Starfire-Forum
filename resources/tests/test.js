/* globals  describe, it, beforeEach, afterEach */
import {requester} from 'requester'
import {userData} from 'user-data'
import {kinveyConst} from 'kinvey-constants'
import {threadData} from 'thread-data'
import {userController} from 'user-controller'
import {templateGenerator} from 'template-generator'

mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
    username: 'SOME_USERNAME',
    password: 'SOME_PASSHASH'
};
describe('UNIT TESTS', function () {
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

            it('Expect post() to be called once', function (done) {
                userData.register(user)
                    .then(() => {
                        expect(requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done);
            });

            it('Expect UserData.register() to make correct POST call', function (done) {
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
                    .then(done, done)
            });

            it('Expect UserData.register() to call post with valid url', function (done) {
                userData.register(user)
                    .then(()=> {
                        expect(requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_ry0hRoka/`)
                    })
                    .then(done, done)
            });

            it('Expect UserData.register() to post correct user data', function (done) {
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
                    .then(done, done)
            });

            it('Expect UserData.login() to call post with valid url', function (done) {
                userData.login(user)
                    .then(()=> {
                        expect(requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_ry0hRoka/login`)
                    })
                    .then(done, done)
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

            it('Expect ThreadData.getThread() to make exactly one get call', function (done) {
                threadData.getThread()
                    .then(() => {
                        expect(requester.get.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });


            it('Expect ThreadData.getThread() to call get with one parameter', function (done) {
                threadData.getThread()
                    .then(()=> {
                        expect(requester.get.firstCall.args.length).to.equal(2);
                    })
                    .then(done, done)
            });


            it('Expect ThreadData.getThread() to call get with valid url', function (done) {
                threadData.getThread(name)
                    .then(()=> {
                        expect(requester.get.firstCall.args[0]).to.equal(`https://baas.kinvey.com/appdata/kid_ry0hRoka/${name}`)
                    })
                    .then(done, done)
            });


            it('Expect ThreadData.getThread() to return object', function (done) {
                threadData.getThread()
                    .then((result)=> {
                        expect(result).to.be.a('object')
                    })
                    .then(done, done)
            });

        });

        describe('AddNewQuestion', function () {
            beforeEach(function () {
                sinon.stub(requester, 'post', (url, options) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                });
                sinon.stub(localStorage, 'getItem', (item) => {
                    return 'username'
                })
            });

            afterEach(function () {
                requester.post.restore();
                localStorage.getItem.restore();
            });
        });

        describe('GetQuestionById tests', function () {
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

            it('Expect ThreadData.getQuestionById() to make exactly one get call', function (done) {
                threadData.getQuestionById()
                    .then(() => {
                        expect(requester.get.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            it('Expect ThreadData.getQuestionById() to call get with two parameters', function (done) {
                threadData.getQuestionById()
                    .then(()=> {
                        expect(requester.get.firstCall.args.length).to.equal(2);
                    })
                    .then(done, done)
            });

            it('Expect ThreadData.getQuestionById() to return object', function (done) {
                threadData.getQuestionById()
                    .then((result)=> {
                        expect(result).to.be.a('object')
                    })
                    .then(done, done)
            });
        });

    });
});

describe('INTEGRATION TESTS', function () {
    describe('threadData tests', function () {

        it('expect getThread("ios") to return array with threads', function (done) {
            var user = {
                "username": "admin",
                "password": "admin"
            };
            userData.login(user)
                .then(function (success) {
                    localStorage.setItem('username', success.username);
                    localStorage.setItem('userId', success._id);
                    localStorage.setItem('authKey', success._kmd.authtoken);
                })
                .then(function () {
                    threadData.getThread('ios')
                        .then(response => {
                            expect(response).to.be.a('array');
                        })
                        .then(done, done);
                })


        });

        it('expect getQuestionById("57ef93f2a31702935171a0de","csharp") to retrun an object', function (done) {
            var user = {
                "username": "admin",
                "password": "admin"
            };
            userData.login(user)
                .then(function (success) {
                    localStorage.setItem('username', success.username);
                    localStorage.setItem('userId', success._id);
                    localStorage.setItem('authKey', success._kmd.authtoken);
                })
                .then(function () {
                    threadData.getQuestionById('57ef93f2a31702935171a0de', "csharp")
                        .then(response => {
                            expect(response).to.be.a('object');
                        })
                        .then(done, done);
                })

        })
    })
});


mocha.run();