import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {threadData} from 'thread-data'

const mainContainer = $('#wrapper');

class ThreadController {
    home() {
        templateGenerator.load('home')
            .then(function (htmlContent) {

                mainContainer.html(htmlContent);
            });
    }

    showThread(threadName) {
        Promise.all([templateGenerator.load('thread'), threadData.getThread(threadName)])
            .then(function ([htmlTemplate,data]) {
                console.log(data);
                mainContainer.html(htmlTemplate(data));
            })
    }

    all() {

    }
}

const threadController = new ThreadController();

export {threadController};