import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {userData} from './../user-data.js'
import { validator } from 'validator'
import { cleaner } from 'cleaner'

const mainContainer = $('#wrapper');

class UserController {
    register(context) {
        templateGenerator.load('auth', 'register')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#btn-register').on('click', function () {
                    var $username = $('#user-name'),
                        $password = $('#input-password'),
                        $confirmPassword = $('#input-password2'),
                        $email = $('#user-email'),
                        $firstName = $('#user-first-name'),
                        $lastName = $('#user-last-name');

                    var username = $username.val(),
                        password = $password.val(),
                        confirmPassword = $confirmPassword.val(),
                        firstName = $firstName.val(),
                        lastName = $lastName.val(),
                        email = $email.val();

                    //validate correct username, password and e-mail
                    if(!validator.validateUser(username)){
                        toastr.error('Username is not in the correct format!');
                        cleaner.cleanInputField($username);
                        return;
                    }

                    if(!validator.validatePassword(password)){
                        toastr.error('Password is not in the correct format!');
                        cleaner.cleanInputField($password, $confirmPassword);
                        return;
                    }

                    if(!validator.validateEmail(email)){
                        toastr.error('E-mail is not valid!');
                        cleaner.cleanInputField($email);
                        return;
                    }


                    if(password != confirmPassword){
                        toastr.error('Passwords do not match!');
                        cleaner.cleanInputField($password, $confirmPassword);
                        return;
                    }


                    let newUser = {username, password, firstName, lastName, email};

                    userData.register(newUser)
                        .then(function (user) {
                            notifier.success(`${user.username} successfully registered!`);
                            context.redirect('#/login')
                        }).catch(function (errorLog) {
                        notifier.error(errorLog);
                        console.log(errorLog);
                    });
                });
            })
    }

    login(context) {
        templateGenerator.load('auth', 'login')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#btn-login').on('click', function () {
                    var $username = $('#user-name'),
                        $password = $('#input-password');

                    var username = $username.val(),
                        password = $password.val();

                    //validate username and password
                    if(!validator.validateUser(username)){
                        toastr.error('Username is not in the correct format!');
                        cleaner.cleanInputField($username);
                        return;
                    }

                    if(!validator.validatePassword(password)){
                        toastr.error('Password is not in the correct format!');
                        cleaner.cleanInputField($password, $confirmPassword);
                        return;
                    }


                    let user = {
                        username,
                        password
                    };
                    userData.login(user)
                        .then(function (success) {
                            localStorage.setItem('username', success.username);
                            localStorage.setItem('userId', success._id);
                            localStorage.setItem('authKey', success._kmd.authtoken);
                        })
                        .then(function () {
                            notifier.success(`${user.username} logged in!`);
                            context.redirect(`#/`);
                        })
                        .catch(function (errorLog) {
                            notifier.error(`${errorLog} occurred`);
                            console.log(errorLog)
                        });
                })
            })
    }

    logout(context) {
        userData.logout()
            .then(function () {
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                localStorage.removeItem('authKey');
            })
            .then(function (data) {
                notifier.success(`You have logged out successfully!`);
                context.redirect('#/home');
            })
            .catch(function (errorLog) {
                notifier.error(errorLog);
                console.log(errorLog);
            });
    }

}


const userController = new UserController();
export {userController}