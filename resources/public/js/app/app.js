import Sammy from 'sammy'
import 'jquery'
import {kinveyConst} from 'kinvey-constants'
import {userController} from 'user-controller'
import {threadController} from 'thread-controller'
import {requester} from 'requester'

const wrapper = '#wrapper';

const sammyApp = Sammy(wrapper, function () {
    // User handling routes
    this.get('#/register', userController.register);
    this.get('#/login', userController.login);
    this.get('#/logout', userController.logout);

    // navigation routes
    this.get('#/home', threadController.home);
    this.get('#/askQuestion', threadController.askQuestion);

    // Categories routes
    this.get('#/ios', ()=> threadController.showThread('ios'));
    this.get('#/javascript', ()=> threadController.showThread('javascript'));
    this.get('#/csharp', ()=> threadController.showThread('csharp'));

    this.get('#/components', threadController.components);

    this.get('#/:id', threadController.showQuestion);

    this.get('#/', threadController.home);

});

sammyApp.run('#/');