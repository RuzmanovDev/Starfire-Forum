import toastr from 'toastr'

class Validator {
    static validateUser(user) {
        var regex = /^[a-zA-Z0-9 ]{2,30}$/;
        if (!(regex.test(user))) {
            return false;
        }

        return true;
    }

    static validatePassword(password) {
        var regex = /^[A-Za-z0-9]\w{5,15}$/;
        if (!(regex.test(password))) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!(regex.test(email))) {
            return false;
        }
        return true;

    }

}
export { Validator };