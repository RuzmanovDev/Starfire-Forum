import 'jquery'

class Cleaner {

    cleanInputField(...inputs){
        inputs.forEach(x => x.val(''));
    }
}

var cleaner = new Cleaner();
export { cleaner };