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
            db.submit(user, data.post).then((data1) => {
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

        db.userWithCookie(data).then((user) => {
            db.checkifLiked(data.userId, data.id).then((response) => {
                if (response.length > 0) {
                    object = {
                        succes: false,
                        data: "already liked"
                    }
                    reject(object)
                } else {
                    db.likePost(data.id).then((res) => {
                        
                        db.createLikeMark(data.userId, data.id).then((data) => {
                            object = {
                                succes: true,
                                data: res
                            }
                            resolve(object);

                        }).catch((err) => {

                            object = {
                                succes: true,
                                data: "error liking the picture"
                            }
                            reject(object);

                        })

                    }).catch((err) => {
                        object = {
                            succes: false,
                            data: err
                        }
                        reject(object)
                    });

                }

            }).catch((err) => {
                res.status(400);
                res.send(err);
            })
        }).catch((err) => {
            console.log("dsadasdasd");
            object = {
                succes: false,
                data: "no user found"
            }
            reject(object);
        });
    })
}

deleteLike = (data) => {
    
    return new Promise((resolve, reject) => {
        db.userWithCookie(data).then((user) => {
            db.deleteLike(data.userId, data.id)
            .then((response) => {
                object = {
                    succes: true,
                    data: response
                }
                resolve(object)
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

module.exports = {
    listAllUser: listAllUser,
    listAllPosts: listAllPosts,
    getSinglePost: getSinglePost,
    likePost: likePost,
    getSingleUser: getSingleUser,
    submitPost: submitPost,
    deletePost: deletePost,
    deleteLike: deleteLike
}