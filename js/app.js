import Sammy from 'sammy'
import 'jquery'
import {kinveyConst} from 'kinvey-constants'
import {userController} from 'user-controller'
import {threadController} from 'thread-controller'
const wrapper = '#wrapper';
console.log(kinveyConst);

const sammyApp = Sammy(wrapper, function () {
    this.get('#/register', userController.register);

    this.get('#/login', userController.login);

    this.get('#/home', function () {
        getAll()
            .then(function (data) {
                console.log(data);
            });
    });

    this.get('#/logout', userController.logout);

    this.get('#/', threadController.home);
});

// var register = function (user) {
//     let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/`;
//     let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
//
//     var promise = new Promise(function (resolve, reject) {
//         var theUser = {
//             username: user.username,
//             password: user.password
//         };
//         $.ajax({
//             url: url,
//             method: 'POST',
//             headers: {
//                 'Authorization': `Basic ${authorization}`,
//                 'ContentType': 'application/json',
//             },
//             data: theUser,
//             success: function (data) {
//                 resolve(data);
//             },
//             error: function (err) {
//                 console.log(err);
//                 reject(err);
//             }
//         })
//     });
//     return promise
// };
//
// var login = function (user) {
//     let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;
//     let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
//
//     var promise = new Promise(function (resolve, reject) {
//         var theUser = {
//             username: user.username,
//             password: user.password
//         };
//         $.ajax({
//             url: url,
//             method: 'POST',
//             headers: {
//                 'Authorization': `Basic ${authorization}`,
//                 'ContentType': 'application/json',
//             },
//             data: theUser,
//             success: function (data) {
//                 console.log("YOu are a wizard Harry and you are logged in!");
//                 resolve(data);
//             },
//             error: function (err) {
//                 reject(err);
//             }
//         })
//     });
//     return promise
//
// };

function getAll() {
    let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/ios`;
    let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
    var promise = new Promise(function (resolve, reject) {
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