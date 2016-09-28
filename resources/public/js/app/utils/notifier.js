import toastr from 'toastr'

class Notifier {
    success(message) {
        toastr.success(message);
    }

    error(errorLog){
        toastr.error(errorLog);
        console.log(errorLog);
    }
}

const notifier = new Notifier();

export {notifier}
