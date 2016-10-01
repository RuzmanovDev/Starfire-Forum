import {requester} from 'requester'
import {kinveyConst} from 'kinvey-constants'
import {Post} from 'Post'

class ThreadData {
    getThread(threadName) {
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${threadName}`;
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        return requester.get(url, {headers: headers})
    }

    addNewQuestion(data) {
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${data.threadCategory}`;
        // TODO make the question class
        let newPost = {
            title: data.postTitle,
            question: data.postQuestion,
            posts: [],
            author: localStorage.username
        };
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        return requester.post(url, {
            headers: headers,
            data: newPost
        });
    }

    addResponse(responseContent) {
        let author = localStorage.username;
        let post = new Post(author, responseContent);
        let currentQuestionId = JSON.parse(localStorage.currentQuestionId);
        let threadData = JSON.parse(localStorage.threadData);
        let dataToUpdate;
        for (let array of threadData.data) {
            if (array._id === currentQuestionId) {
                array.posts.push(post);
                dataToUpdate = array;
            }
        }
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${threadData.categoryName}/${currentQuestionId}`;
        let headers = {
            'Authorization': `Basic ${kinveyConst.MASTER_KEY}`,
            'ContentType': 'application/json',
        };

        return requester.put(url, {
            headers: headers,
            data: dataToUpdate
        });

    }

    getQuestionById(id, categoryName) {
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${categoryName}/${id}`;
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        return requester.get(url, {headers: headers})
    }

    rateCommentUp(id, questionData, categoryName) {
        id = +id;
        return questionData
            .then(function (data) {
                let currentQuestionId = data._id;
                let indexOfCommentToBeUpdated = data.posts.findIndex(function (element, index) {
                    return element._id === id;
                });
                let oldDRating = +data.posts[indexOfCommentToBeUpdated].rating;

                data.posts[indexOfCommentToBeUpdated].rating = (oldDRating += 1);

                let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${categoryName}/${currentQuestionId}`;
                let headers = {
                    'Authorization': `Basic ${kinveyConst.MASTER_KEY}`,
                    'ContentType': 'application/json',
                };

                return requester.put(url, {
                    headers: headers,
                    data: data
                });

            });
    }

    rateCommentDown(id, questionData, categoryName) {
        id = +id;
        return questionData
            .then(function (data) {
                let currentQuestionId = data._id;
                let indexOfCommentToBeUpdated = data.posts.findIndex(function (element, index) {
                    return element._id === id;
                });
                let oldDRating = +data.posts[indexOfCommentToBeUpdated].rating;

                data.posts[indexOfCommentToBeUpdated].rating = (oldDRating -= 1);

                let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${categoryName}/${currentQuestionId}`;
                let headers = {
                    'Authorization': `Basic ${kinveyConst.MASTER_KEY}`,
                    'ContentType': 'application/json',
                };

                return requester.put(url, {
                    headers: headers,
                    data: data
                });

            });
    }

    deletePost(id, questionData, categoryName) {
        id = +id;
        return questionData
            .then(function (data) {
                let currentQuestionId = data._id;
                let indexOfelementToBeDeleted = data.posts.findIndex(function (element, index) {
                    return element._id === id;
                });
                if (data.posts[indexOfelementToBeDeleted].author !== localStorage.username) {
                    throw new Error("The user can delete only his comments!");
                }

                data.posts.splice(indexOfelementToBeDeleted, 1);

                let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${categoryName}/${currentQuestionId}`;
                let headers = {
                    'Authorization': `Basic ${kinveyConst.MASTER_KEY}`,
                    'ContentType': 'application/json',
                };

                return requester.put(url, {
                    headers: headers,
                    data: data
                });

            });
    }
	
	search(id, categoryName){
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${categoryName}/${id}`;
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        return requester.get(url, {headers: headers})
    }
}

const threadData = new ThreadData();

export {threadData}
