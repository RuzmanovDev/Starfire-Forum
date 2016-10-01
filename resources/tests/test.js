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

describe('userData tests', function () {

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

        it('expect post() to be called once', function (done) {
            userData.login(user)
                .then(() => {
                    expect(requester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect dataService.login() to make correct POST call', function (done) {
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

        it('expect userData.login() to put correct user data', function (done) {
            userData.login(user)
                .then(() => {
                    const actual = requester.post
                        .firstCall
                        .args[1];
                    const prop = Object.keys(actual).sort();
                    expect(prop.length).to.equal(2);
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

        it('expect localStorage to have no username after logout', function (done) {
            userData.login()
                .then(() => {
                    return userData.logout();
                })
                .then(() => {
                    expect(localStorage.getItem('username')).to.be.null;
                })
                .then(done, done);
        });

        it('expect localStorage to have no authKey after logout', function (done) {
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

describe('threadData tests', function () {
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

    it('expects getThread() to be called with correct url', function () {
        threadData.getThread()
            .then(()=> {
                const actual = requester.get.firstCall
                    .args[1];

                console.log(actual);
            })

    })
});


mocha.run();