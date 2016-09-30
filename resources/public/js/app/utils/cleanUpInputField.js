import 'jquery'

class Cleaner {

    static cleanInputField(...inputs){
        inputs.forEach(x => x.val(''));
    }
}

var cleaner = new Cleaner();
export { cleaner };