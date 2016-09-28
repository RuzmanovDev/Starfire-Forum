import 'jquery'
import {templateGenerator} from 'template-generator'
import {notifier} from 'notifier'
import {threadData} from './../thread-data.js'

const mainContainer = $('#wrapper');

function getDateOfComment(date){

}
function rateCommentUp(questionData) {
    $('#comments-container').on('click', '.rate-comment-up', function () {
        let $this = $(this);
        let $rating = $this.siblings('.rating-value');
        let currentRating = +$rating.text();

        $rating.text(`${currentRating += 1}`);
    })
}

function rateCommentDown(questionData) {
    $('#comments-container').on('click', '.rate-comment-down', function () {
        let $this = $(this);
        let $rating = $this.siblings('.rating-value');
        let currentRating = +$rating.text();

        $rating.text(`${currentRating -= 1}`);
    })
}

class ThreadController {
    home() {
        templateGenerator.load('home','home')
            .then(function (htmlContent) {
                mainContainer.html(htmlContent);
            });
    }

    showThread(threadName) {
        Promise.all([templateGenerator.load('thread', 'read'), threadData.getThread(threadName)])
            .then(function ([htmlTemplate,data]) {
                // in order to make the thread template generic we need to add the thread name to the data object
                let dataWithCategoryName = {
                    data: data,
                    categoryName: threadName
                };
                localStorage.setItem('threadData', JSON.stringify(dataWithCategoryName));
                mainContainer.html(htmlTemplate(dataWithCategoryName));
            })
            .catch(function () {
                notifier.error("You must be logged in in order to view the threads!")
            })
    }

    askQuestion(context) {
        templateGenerator.load('post', 'add')
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
        let threadContent = JSON.parse(localStorage.threadData);
        let urlId = context.params.id;
        let categoryName = threadContent.categoryName;

        let questionData = threadData.getQuestionById(urlId, categoryName);

        Promise.all([questionData, templateGenerator.load('selected-question')])
            .then(function ([data,htmlContent]) {
                mainContainer.html(htmlContent(data));
            })
            .then(function () {
                rateCommentUp(questionData);
                rateCommentDown(questionData);
            })
            .then(function () {
                $('#btn-add-response').on('click', function () {
                    let $this = $(this);
                    $this.toggle();

                    $('#add-new-post').toggle();
                });

                $('#btn-post-response').on('click', function () {
                    let responseContentContainer = $('#post-response-content');
                    let responseContent = responseContentContainer.val();
                    responseContentContainer.val("");

                    localStorage.setItem('currentQuestionId', JSON.stringify(urlId));
                    threadData.addResponse(responseContent)
                        .then(function () {
                            notifier.success("Post added!");
                            context.redirect(`#/${urlId}`);
                        })
                        .catch(function (errorLog) {
                            notifier.error("The post wasn't added! Please try again!");
                            console.log(errorLog)
                        })
                })
            })
            .catch(function (errorLog) {
                notifier.error('Error has occurred please try again!');
                console.log(errorLog);
            })
    }

    addResponse() {

    }
}

const
    threadController = new ThreadController();

export {
    threadController
}