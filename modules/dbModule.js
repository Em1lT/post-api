var mysql = require('mysql');
let con;

connect = () => {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "new_password",
        database: "todo_api"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected to database...");
    });
}
logout = (username) => {
    return new Promise((resolve, reject) => {
        saveCookieToDb(username, "null").then(() => {
            resolve();
        });
    });
}

login = (data) => {
    let object;
    const sql = "SELECT * FROM todo_api.users WHERE username = '"+ data.username + "' AND password = '"+data.password+"';"

    console.length(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                object = {
                    succes: false,
                    data: err
                }
                reject(object)
            }         
            if(result.length == 0){
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
    const sql = "UPDATE todo_api.users SET cookie ='"+cookie+"' WHERE username = '"+ username + "';"
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err){
                reject(err)
            }
            resolve();
        })
    })
}

userWithCookie = (data) => {
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + data.username+"' AND cookie ='"+data.cookie+"'";
   
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
            if (result.length) {
                object = {
                    succes: true,
                    data: result
                }            
                resolve(object);
            } else {
                object = {
                    succes: false,
                    data: "no user found"
                }   
                reject(object);
            }
        })
    })
}

createNewUser = (user) => {

    let object;
    return new Promise((resolve, reject) => {
        
        if(!user.username || user.username.length == 0){
            object = {
                succes: false,
                reason: "no name"
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
    const sql = "SELECT * FROM todo_api.users WHERE username = '" + username+"'";
   
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
    const sql = "UPDATE `ForumApp`.`accounts` SET `updatedat` = NOW() WHERE (`username` = '"+username+"');";
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

submit = (data) => {
    return new Promise((resolve, reject) => {
    
        userWithCookie(data).then((user) => {

            createNewPost(user.data[0], data.post)
            .then((obj) => {
                resolve(obj);
            })
        }).catch((err) => {
            console.log("catch")
            reject(err);
        })    
    })
    
}

createNewPost = (user, post) => {
    let object;

    const sql = "INSERT INTO todo_api.posts (userid, createdAt, likes, message) VALUES ('" + user.idUsers + "', NOW(), 0, '"+post.message+"')";
    console.log(sql)
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
                
                resolve(object);
            })
    })
}

DeletePost = (id) => {

    const sql = "DELETE * FROM todo_api.users WHERE id = '" +id+ "'";
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
    const sql = "SELECT * FROM todo_api.posts WHERE id = '"+id+"'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
   
            resolve(result);
        })
    })
}

getSingleUser = (id) => {
    const sql = "SELECT * FROM todo_api.users WHERE idUsers = '"+id+"'";
    console.log(sql);
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) reject(err);
   
            resolve(result);
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
    DeletePost: DeletePost,
    getSingleUser: getSingleUser,
    getSinglePost: getSinglePost,
    userWithCookie: userWithCookie,
    updateTimeStamp: updateTimeStamp,
    createuserupdate: createuserupdate,
    checkIfUserExists: checkIfUserExists,
    createNewUser: createNewUser

}
