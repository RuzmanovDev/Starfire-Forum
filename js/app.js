import Sammy from 'sammy'
import 'jquery'

const wrapper = '#wrapper';

const sammyApp = Sammy(wrapper, function () {
    this.get('#/', function () {
        alert('test');
    })
});

sammyApp.run('#/');