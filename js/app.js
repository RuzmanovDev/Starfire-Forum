import Sammy from 'sammy'
import 'jquery'

const wrapper = '#wrapper';

const sammyApp = Sammy(wrapper, function () {
    this.get('#/', function () {
        var newUser = {
            username: 'Trash',
            password: 'trash',
        };

        register(newUser)
            .then(function (usr) {
            })
    });
});

const appID = "kid_Syz1toa3",
    appSecret = "9b54b75b0aff4252a1f9a7ef94e83e8f";

var register = function (user) {
    let url = `https://baas.kinvey.com/user/${appID}/`;
    let authorization = btoa(`${appID}:${appSecret}`);
    console.log(user);
    console.log(user.password);
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
                console.log("YOu are a wizard Harry!");
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        })
    });
    return promise
};

function encrypt(str) {
    var utf8 = CryptoJS.enc.Utf8.parse(str);
    var base64 = CryptoJS.enc.Base64.stringify(utf8);

    return base64;
}
sammyApp.run('#/');