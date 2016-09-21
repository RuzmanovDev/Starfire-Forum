import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'

const mainContainer = $('#wrapper');

class ThreadController {
    home() {
        templateGenerator.load('home')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            });
    }

    all() {

    }
}

const threadController = new ThreadController();

export {threadController};