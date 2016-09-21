import {kinveyConst} from 'kinvey-constants'

class UserData {
    register(user) {
        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/`;
        let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);

        var promise = new Promise(function (resolve, reject) {
            var theUser = {
                username: user.username,
                password: user.password
            };
            $.ajax({
                url: url,
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authorization}`,
                    'ContentType': 'application/json',
                },
                data: theUser,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    console.log(err);
                    reject(err);
                }
            })
        });
        return promise
    }

    login(user) {
        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;
        let authorization = btoa(`${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`);

        var promise = new Promise(function (resolve, reject) {
            var theUser = {
                username: user.username,
                password: user.password
            };
            $.ajax({
                url: url,
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authorization}`,
                    'ContentType': 'application/json',
                },
                data: theUser,
                success: function (data) {
                    console.log("YOu are a wizard Harry and you are logged in!");
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            })
        });
        return promise
    }

    logout() {

    }
}

const userData = new UserData();

export {userData}
