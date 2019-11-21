const express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
const db = require('./modules/dbModule');
let loginModule = require('./modules/LoginModule');
let postModule = require('./modules/postModule');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", maxAge: 10000}));

app.listen(PORT, () => {
    db.connect();
    console.log("running on port", PORT);
})

 app.post('/login', (req, res) => {
    loginModule.login(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400)
        res.send(error);
      })
 });

 app.post('/logout', (req, res) => {
   loginModule.logout(req.body.username)
   .then((data) => {
      res.send(data)
   }).catch((err) => {
     res.status(400)
      res.send(err)
   })
});

app.post('/user', (req, res) => {
  db.userWithCookie(req.body).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(400)
      res.send(err);    
    })
});
 
app.post('/submit', (req, res) => {
  postModule.submitPost(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  })
});

//DELETE FROM todo_api.posts WHERE id = 1;
app.delete('/delete/post/:id', (req, res) => {
  postModule.deletePost(req.params.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);    
    })
});

app.get('/users', (req, res) => {
  postModule.listAllUser().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);    
    })
});

app.get('/posts', (req, res) => {
  postModule.listAllPosts().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);    
    })
});


app.get('/post/:id', (req, res) => {
  postModule.getSinglePost(req.params.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);    
    })
});

app.get('/user/:id', (req, res) => {
  postModule.getSingleUser(req.params.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);    
    })
});

app.post('/post/like', (req, res) => {
  postModule.likePost(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(400);
    res.send(err);
  })
});

app.post('/testFunctions', (req, res) => {
  
});

 app.post('/register', (req, res) => {
  loginModule.registerNewUser(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  })
});


app.post('/delete/like', (req, res) => {
  postModule.deleteLike(req.body).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  })
});
