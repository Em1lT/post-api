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
        res.send(err);    
      })
    })

}

logout = (username) => {
    return new Promise((resolve, reject) => {
        db.logout(username).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}
module.exports = {
    login: login,
    logout: logout
}
