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

}

const threadData = new ThreadData();

export {threadData}
