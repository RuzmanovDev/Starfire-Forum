import toastr from 'toastr'

class Validator {
    validateUser(user) {
        var regex = /^[a-zA-Z0-9 ]{2,20}$/;
        if (!(regex.test(user))) {
            return false;
        }

        return true;
    }

    validatePassword(password) {
<<<<<<< HEAD
        var regex = /^[A-Za-z0-9]\w{4,20}$/;
=======
        var regex = /^[A-Za-z0-9]\w{3,20}$/;
>>>>>>> 9be67bd7a2e447494f6ee49815bde2c3ac047fda
        if (!(regex.test(password))) {
            return false;
        }
        return true;
    }

    validateEmail(email) {
        var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!(regex.test(email))) {
            return false;
        }
        return true;

    }

}

const validator = new Validator();
export {validator};