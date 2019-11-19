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

//NOT WORKING YET
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

likePost = (data) => {
    return new Promise((resolve, reject) => {

        db.userWithCookie(data).then(() => {

            db.likePost(data.id).then((res) => {
                object = {
                    succes: true,
                    data: res
                }
                resolve(object);
                
            }).catch((err) => {
                object = {
                    succes: false,
                    data: err
                }
                reject(object)
            });
        }).catch((err) => {
            reject(err);
        });
    })

}

module.exports = {
    listAllUser: listAllUser,
    listAllPosts: listAllPosts,
    getSinglePost: getSinglePost,
    likePost: likePost,
    getSingleUser: getSingleUser,
    submitPost: submitPost,
    deletePost: deletePost
}