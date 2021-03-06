require('dotenv').config()
let mysql = require('mysql');
let con;

connect = () => {
    con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected to database...");
    });
}
logout = (username) => {
    return new Promise((resolve, reject) => {
        saveCookieToDb(username, "null").then((data) => {
            console.log(data);
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

login = (data) => {
    let object;
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + data.username + "' AND password = '" + data.password + "';"

    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                object = {
                    succes: false,
                    data: err
                }
                reject(object)
            }
            if (result.length == 0) {
                object = {
                    succes: false,
                    data: "login failed"
                }
                reject(object)
            }
            resolve(result);
        })
    })
}
saveCookieToDb = (username, cookie) => {
    const sql = "UPDATE todo_api.users SET cookie ='" + cookie + "' WHERE username = '" + username + "';"
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }

            if (result.changedRows == 0) {
                reject("no User found")
            }
            resolve(result);
        })
    })
}

userWithCookie = (data) => {
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + data.username + "' AND cookie ='" + data.cookie + "'";

    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            if (result.length) {
                resolve(result);
            } else {
                reject(result);
            }
        })
    })
}

createNewUser = (user) => {

    let object;
    return new Promise((resolve, reject) => {

        if (!user.username || user.username.length == 0) {
            object = {
                succes: false,
                reason: "no name in name field"
            }
            reject(object)
        }


        const sql = "INSERT INTO todo_api.users (username, password, createdat, updatedat) VALUES ('" + user.username + "', '" + user.password + "', NOW(), NOW())";
        con.query(sql, (err, result) => {
            if (err) reject(err);
            object = {
                succes: true,
                reason: result
            }
            resolve(result);
        })
    })
}

//REGISTER CHECK IF USERNAME IS IN USE
checkIfExistsUsername = (username) => {
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + username + "'";

    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
            if (result.length == 0) {
                resolve();
            }
            reject();
        })
    })
}

checkIfUserExists = (data) => {
    let object;
    const sql = "SELECT * FROM todo_api.users WHERE username = \"" + data.username + "\" AND password = \"" + data.password + "\";";

    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
            if (result.length == 0) {
                object = {
                    succes: false,
                    reason: "no user found"
                }
                reject(object);
            }
            createuserupdate(data.username).then(() => {
                object = {
                    succes: true,
                    data: result[0].userId
                }
                resolve(object);
            })
        })
    })

}
//TIMESTAMP
createuserupdate = (data) => {

    const sql = "UPDATE todo_api.users SET updatedAt = NOW() WHERE username = '" + data + "'";

    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })

}
//UPDATES UPDATEDAT SLOT IN DB WHEN LOGGED IN
updateTimeStamp = (username) => {
    const sql = "UPDATE `ForumApp`.`accounts` SET `updatedat` = NOW() WHERE (`username` = '" + username + "');";
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
            object = {
                succes: true,
                data: result
            }
            resolve(object);
        })
    })
}

submit = (data, post) => {
    return new Promise((resolve, reject) => {
        createNewPost(data[0], post)
            .then((obj) => {
                resolve(obj);
            })
    })
}

createNewPost = (user, post) => {
    let object;
    const sql = "INSERT INTO todo_api.posts (userid, createdAt, likes, message) VALUES ('" + user.idUsers + "', NOW(), 0, '" + post.message + "')";
    console.log(sql)
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(object);
        })
    })
}

DeletePost = (id) => {

    const sql = "DELETE FROM todo_api.posts WHERE id = '" + id + "'";
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        })
    })
}

listUsers = () => {
    const sql = "SELECT * FROM todo_api.users";
    console.log(sql);

    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        })
    })
}

listPosts = () => {
    const sql = "SELECT * FROM todo_api.posts";

    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        })
    })
}

getSinglePost = (id) => {
    const sql = "SELECT * FROM todo_api.posts WHERE id = '" + id + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        })
    })
}

getSingleUser = (id) => {
    const sql = "SELECT * FROM todo_api.users WHERE idUsers = '" + id + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        })
    })
}

findUserName = (username) => {
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + username + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);

            if (result.length >= 1) {
                reject("username already found")
            }
            resolve(result);
        })
    })
}
//UPDATE ed_names SET c_request = c_request+1 WHERE id = 'x'
likePost = (id) => {
    const sql = "UPDATE posts SET likes = likes+1 WHERE id = '" + id + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            
            resolve(result)
        })
    })
}

checkifLiked = (userId, postId) => {
    
    const sql = "SELECT * FROM todo_api.likes WHERE userId = '" + userId + "' AND postId ='" + postId + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            if(result){
                resolve(result)
            } else {
                reject()
            }
            
        })
    })
}

listAllUsersPosts = (id) => {
    const sql = "SELECT * FROM todo_api.posts WHERE userId = '" + id + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            if(result){
                resolve(result)
            } else {
                reject()
            }
            
        })
    })
}

checkIfYourOwn = (userId, postId) => {
    const sql = "SELECT * FROM todo_api.posts WHERE userId = '" + userId + "' AND id ='" + postId + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            if(result){
                resolve(result)
            } else {
                reject()
            }
            
        })
    })
}

createLikeMark = (userId, postId) => {
    
    const sql = "INSERT INTO todo_api.likes (userId, postId, createdAt) VALUES ('" + userId + "','" + postId + "', NOW())";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            resolve(result)
        })
    })
}

deleteLike = (userId, postId) => {
    const sql = "DELETE FROM todo_api.likes WHERE userId = '" + userId + "' AND postId = '" + postId + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            resolve(result)
        })
    })
}

getAllLikesFromPerson = (userId, postId) => {
    const sql = "SELECT * FROM todo_api.likes WHERE userId = '" + userId + "'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err){ reject(err)};

            if(result){
                resolve(result)
            } else {
                reject()
            }
            
        })
    })
}

module.exports = {
    connect: connect,
    login: login,
    logout: logout,
    submit: submit,
    listPosts: listPosts,
    listUsers: listUsers,
    likePost: likePost,
    checkifLiked: checkifLiked,
    checkIfYourOwn: checkIfYourOwn,
    createLikeMark: createLikeMark,
    DeletePost: DeletePost,
    listAllUsersPosts: listAllUsersPosts,
    getSingleUser: getSingleUser,
    getSinglePost: getSinglePost,
    getAllLikesFromPerson: getAllLikesFromPerson,
    findUserName: findUserName,
    userWithCookie: userWithCookie,
    updateTimeStamp: updateTimeStamp,
    createuserupdate: createuserupdate,
    checkIfUserExists: checkIfUserExists,
    createNewUser: createNewUser,
    deleteLike: deleteLike
}
