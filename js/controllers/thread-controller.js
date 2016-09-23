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

    askQuestion(context) {
        templateGenerator.load('add-post')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            })
            .then(function () {
                $('#add-post-btn').on('click', function () {
                    let threadCategory = $('#thread-category').val();
                    let postTitle = $('#post-title').val();
                    let postQuestion = $('#post-content').val();

                    threadData.addNewQuestion({
                        threadCategory,
                        postTitle,
                        postQuestion
                    });
                })
            })
    }

    all() {

    }
}

const threadController = new ThreadController();

export {threadController};