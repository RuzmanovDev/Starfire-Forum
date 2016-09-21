import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {userData} from 'js/data.js'

const mainContainer = $('#wrapper');
class UserController {
    register(context) {
        var newUser = {
            username: 'pencho',
            password: 'pencho',
        };

        userData.register(newUser);
        // templateGenerator.load('register')
        //     .then(function (htmlContent) {
        //         mainContainer.html(htmlContent);
        //     })
        //     .then(function () {
        //         var newUser = {
        //             username: 'gosho',
        //             password: 'gosho',
        //         };
        //
        //         userData.register(newUser);
        //     })
    }

    login(context){
        var user = "";
        userData.login(user);
    }
}


const userController = new UserController();
export {userController}