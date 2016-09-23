import {requester} from 'requester'
import {kinveyConst} from 'kinvey-constants'

class ThreadData {
    getThread(threadName) {
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${threadName}`;
        // let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };

        return requester.get(url, {headers: headers})
    }

    addNewQuestion(data) {
        let url = `https://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/${data.threadCategory}`;
        let newPost = {
            title: data.postTitle,
            question: data.postQuestion,
            posts: []
        };
        let headers = {
            'Authorization': `Kinvey ${localStorage.authKey}`,
            'ContentType': 'application/json',
        };
        console.log(data);
        requester.post(url, {
            headers: headers,
            data: newPost
        });
    }
}

const threadData = new ThreadData();

export {threadData}
