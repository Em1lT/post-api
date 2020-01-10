# Interfaces

```
/login
/logout
/user
/submit
/delete/post/:id
/users
/posts
/post/:id
/user/:id
/post/like
/register
/delete/like
/login
```


## POST  /login

### Parameters:
   ```
    "username":"Example",
	"password":"Example"
   ``` 

### Response:
```
    {
    "succes": true,
    "data": [
        {
            "idUsers": 3,
            "name": null,
            "username": "Emil",
            "createdAt": "2019-11-17T17:21:15.000Z",
            "updatedAt": "2019-11-18T19:22:55.000Z",
            "cookie": 851,
            "password": "pass1"
        }
    ]
} 
```

## POST /logout

### Parameters:
   ```
    "username":"Example"
   ``` 

### Response:
```
    {
    "succes": true,
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 34,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```

## POST /user

### Parameters:
   ```
    "username":"Example",
    "cookie": "123"
   ``` 

### Response:
```
    [
    {
        "idUsers": 3,
        "name": null,
        "username": "Emil",
        "createdAt": "2019-11-17T17:21:15.000Z",
        "updatedAt": "2020-01-10T13:31:55.000Z",
        "cookie": "447",
        "password": "pass1"
    }
]
```

## POST /submit

### Parameters:
   ```
    {
	"username":"example",
	"cookie":"123",
	"post":{
		"message":"Test123"
	}
} 
   ``` 

### Response:
```
  {
    "succes": true
  }
```

## DELETE /delete/post/:id

IN PROGRESS NO AUTHORIZATION YET
 

### Response:
```
  {
    "succes": true
  }
```
## GET /users

### Response:
```
  {
        "idUsers": 2,
        "name": "example",
        "username": "example",
        "createdAt": "2019-11-15T05:06:19.000Z",
        "updatedAt": "2019-11-16T18:38:40.000Z",
        "cookie": "123",
        "password": "test"
    }
```


## GET /posts 

### Response:
```
 {
        "id": 2,
        "userId": 2,
        "createdAt": "2019-11-15T13:48:34.000Z",
        "likes": 17,
        "message": "shit"
    },
```

## GET /post/:id

### Response
```
 {
        "id": 2,
        "userId": 2,
        "createdAt": "2019-11-15T13:48:34.000Z",
        "likes": 17,
        "message": "shit"
    },
```

## GET /user/:id

NEEDS AN AUTHORIZATION AND REMOVE SECRET DATA 

### Response

```
   {
        "idUsers": 1,
        "name": "Testi",
        "username": "Trolli",
        "createdAt": "2019-11-13T22:00:00.000Z",
        "updatedAt": "2019-11-15T04:57:16.000Z",
        "cookie": null,
        "password": null
    }
```

## POST /post/like

### Parameters
```
{
	"userId":2,
	"username":"Emil",
	"cookie": "447",
	"id":4
}	
```

### Response
```
{
    "succes": true,
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
