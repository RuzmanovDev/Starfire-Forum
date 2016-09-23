import {requester} from 'requester'
import {kinveyConst} from 'kinvey-constants'
import {Post} from 'js/models/post.js'

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
        // TODO make the post class
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
        let currentQuestion = JSON.parse(localStorage.currentQuestion);
        let currentQuestionID = currentQuestion._id;
        let currentQuestionsPosts = currentQuestion.posts;
        let threadData = JSON.parse(localStorage.threadData);

        // console.log(currentQuestionID);
        // console.log(currentQuestionsPosts);
        // currentQuestionsPosts.push(post);
        // console.log(currentQuestionsPosts);
        let dataToUpdate;
        for (let array of threadData.data) {
            if (array._id === currentQuestionID) {
                array.posts.push(post);
                dataToUpdate = array;
            }
        }
        console.log(dataToUpdate);
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${threadData.categoryName}/${currentQuestionID}`;
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        console.log(requester.get(url, {headers}));
        requester.put(url, {
            headers: headers,
            data: dataToUpdate
        });

    }
}

const threadData = new ThreadData();

export {threadData}
