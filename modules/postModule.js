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

        db.submit(req.body).then((data) => {
            object = {
                succes: true,
                data: result
            }
            resolve(data)
        }).catch((err) => {
            object = {
                succes: false,
                data: err
            }
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