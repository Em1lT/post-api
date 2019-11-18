const db = require('./dbModule');

listAllUser = () => {
    return new Promise((resolve, reject) => {
        db.listUsers().then((data) => {
            resolve(data);
        })
    })
}
listAllPosts = () => {
    return new Promise((resolve, reject) => {
        db.listPosts().then((data) => {
            resolve(data);
        })
    })
}

getSinglePost = (id) => {
    return new Promise((resolve, reject) => {
        db.getSinglePost(id).then((data) => {
            resolve(data);
        })
    })
}


getSingleUser = (id) => {
    return new Promise((resolve, reject) => {
        db.getSingleUser(id).then((data) => {
            resolve(data);
        })
    })
}

deletePost = (id) => {
    return new Promise((resolve, reject) => {
        db.DeletePost(id).then((data) => {
            resolve(data);
        })
    })
}

submitPost = (data) => {

    return new Promise((resolve, reject) => {
    db.userWithCookie(data).then((user) => {

        db.submit(user.data[0], data.post).then((data1) => {
            object = {
                succes: true,
                data: data1
            }
            resolve(object)
        }).catch((err) => {
            object = {
                succes: false,
                data: err
            }
            reject(err);
        })
    }).catch((err) => {
        reject(err);
    })    
    })
}
//getSinglePost
//submitPost
//
module.exports = {
    listAllUser: listAllUser,
    listAllPosts: listAllPosts,
    getSinglePost: getSinglePost,
    getSingleUser: getSingleUser,
    submitPost: submitPost,
    deletePost: deletePost
}