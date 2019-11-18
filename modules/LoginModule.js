const db = require('./dbModule');

login = (data) => {

    return new Promise((resolve, reject) => {

        db.login(data).then((object) => {
            createuserupdate(data.username).then(() => {
                object = {
                    succes: true,
                    data: object
                }
                object.data[0].cookie = Math.floor(Math.random() * Math.floor(999))

                saveCookieToDb(data.username, object.data[0].cookie)
                    .then(() => {
                        resolve(object);
                    }).catch((err) => {
                        object = {
                            succes: false,
                            data: err
                        }
                        reject();
                    })
            })
        }).catch((err) => {
            reject(err);
        })
    })

}
registerNewUser = (data) => {

    return new Promise((resolve, reject) => {

        db.findUserName(data.username).then((user) => {
            db.createNewUser(data).then((data) => {
                object = {
                    succes: true,
                    data: data
                }
                resolve(object)
            }).catch((err) => {
                object = {
                    succes: false,
                    data: err
                }
                reject(object)
            })
        }).catch((err) => {
            object = {
                succes: false,
                data: err
            }
            reject(object)
        })
    })
}

logout = (username) => {
    return new Promise((resolve, reject) => {
        db.logout(username).then((data) => {
            console.log(data);
            object = {
                succes: true,
                data: data
            }
            resolve(object);
        }).catch((err) => {
            object = {
                succes: false,
                data: err
            }
            reject(object);
        })
    })
}
module.exports = {
    login: login,
    logout: logout,
    registerNewUser: registerNewUser
}
