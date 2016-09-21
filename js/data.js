import {kinveyConst} from 'kinvey-constants'
import {requester} from 'requester'

class UserData {
    register(user) {
        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/`;
        let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
        const headers = {
            'Authorization': `Basic ${authorization}`,
            'ContentType': 'application/json',
        };

        var theUser = {
            username: user.username,
            password: user.password
        };
        requester.post(url, {
            headers: headers,
            data: theUser,
        });

    }

    login(user) {
        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;
        let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);
        let headers = {
            'Authorization': `Basic ${authorization}`,
            'ContentType': 'application/json',
        };
        requester.post(url, headers);
    }

    logout() {

    }
}

const userData = new UserData();

export {userData}
