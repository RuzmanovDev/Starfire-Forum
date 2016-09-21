import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {userData} from 'js/data.js'

const mainContainer = $('#wrapper');
class UserController {
    register(context) {
        // var newUser = {
        //     username: 'pencho',
        //     password: 'pencho',
        // };

        templateGenerator.load('register')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#btn-register').on('click', function () {
                    var username = $('#user-name').val(),
                        password = $('#inputPassword').val();

                    let newUser = {username, password};

                    return userData.register(newUser);
                });
            })
    }

    login(context) {
        var user = "";
        userData.login(user);
    }

    logout(context) {
        userData.logout();
    }
}


const userController = new UserController();
export {userController}