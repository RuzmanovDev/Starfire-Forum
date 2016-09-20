import Sammy from 'sammy'
import 'jquery'
import {kinveyConst} from 'kinvey-constants'

const wrapper = '#wrapper';
console.log(kinveyConst);
const sammyApp = Sammy(wrapper, function () {
    this.get('#/', function () {
        var newUser = {
            username: 'admin',
            password: 'admin',
        };

        login(newUser)
            .then(function (success) {
                console.log(success.username);
                console.log(success._id);
                console.log(success._kmd.authtoken);
                localStorage.setItem('username', success.username);
                localStorage.setItem('userId', success._id);
                localStorage.setItem('authKey', success._kmd.authtoken);
            }).then(function () {
            getAll(newUser);
        });

    });
});

const appID = "kid_Syz1toa3",
    appSecret = "9b54b75b0aff4252a1f9a7ef94e83e8f";

var register = function (user) {
    let url = `https://baas.kinvey.com/appdata/${appID}/books`;
    var promise = new Promise(function (resolve, reject) {
        var theUser = {
            username: user.username,
            password: user.password
        };
        $.ajax({
            url: url,
            method: 'POST',
            headers: `Kinvey ${localStorage.authKey}`,
            contentType: 'application/json',
            data: theUser,
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
    return promise
};

var login = function (user) {
    let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;
    let authorization = btoa(`${appID}:${appSecret}`);

    var promise = new Promise(function (resolve, reject) {
        var theUser = {
            username: user.username,
            password: user.password
        };
        $.ajax({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authorization}`,
                'ContentType': 'application/json',
            },
            data: theUser,
            success: function (data) {
                console.log("YOu are a wizard Harry and you are logged in!");
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
    return promise

};

function getAll(user) {
    let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/books`;
    let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
    let mk = '5c87e01676414974a4a9ab3285b229c3';
    var promise = new Promise(function (resolve, reject) {
        var theUser = {
            username: user.username,
            password: user.password
        };
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'Authorization': `Kinvey ${localStorage.authKey}`,
                'ContentType': 'application/json',
            },
            success: function (data) {
                console.log(data);
                resolve(data);
            },
            error: function (err) {
                console.log(err);
                reject(err);
            }
        })
    });
    return promise
}
sammyApp.run('#/');