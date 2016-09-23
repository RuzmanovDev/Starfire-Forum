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
                // in order to make the thread template generic we need to add the threadname to the data object
                data = {
                    data: data,
                    categoryName: threadName
                };
                localStorage.setItem('threadData', JSON.stringify(data));
                // console.log(JSON.parse(localStorage.threadData));
                mainContainer.html(htmlTemplate(data));
            })
            .catch(function () {
                notifier.error("You must be logged in in order to view to threads!")
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
                    })
                        .then(function () {
                            notifier.success('Post Added');
                            context.redirect(`#/${threadCategory}`);
                        })
                        .catch(function () {
                            notifier.error("You must be logged in to post!");
                            context.redirect('#/login');
                        });
                })
            })
    }

    showQuestion(context) {
        templateGenerator.load('selected-question')
            .then(function (htmlContent) {
                let data = JSON.parse(localStorage.threadData);
                mainContainer.html(htmlContent(data));
            })
    }

    all() {

    }
}

const threadController = new ThreadController();

export {threadController};