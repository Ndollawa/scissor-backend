*** ALT School Second semester Exams Blog App API project ***
# Blog App
This is an api for a blog app

---

## Requirements

    1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
    2. A user should be able to sign up and sign in into the blog app
    3. Use JWT as authentication strategy and expire the token after 1 hour
    4. A blog can be in two states; draft and published
    5. Logged in and not logged in users should be able to get a list of published blogs created
    6. Logged in and not logged in users should be able to to get a published blog
    7. Logged in users should be able to create a blog.
    8. When a blog is created, it is in draft state
    9. The owner of the blog should be able to update the state of the blog to published
    10.  The owner of a blog should be able to edit the blog in draft or published state
    11.  The owner of the blog should be able to delete the blog in draft or published state
    12. The owner of the blog should be able to get a list of their blogs. 
        a. The endpoint should be paginated
        b. It should be filterable by state
    13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
    14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
        a. default it to 20 blogs per page. 
        b. It should also be searchable by author, title and tags.
        c. It should also be orderable by read_count, reading_time and timestamp
    15. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
    16. Come up with any algorithm for calculating the reading_time of the blog.
    17. Write tests for all endpoints
    18. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm start`

---
## Base URL
- https://drab-rose-slug-wrap.cyclic.app/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  firs_tname | string  |  optional|
|  last_name  |  string |  optional  |
|  email     | string  |  reqduire |
|  password |   string |  required  |
|  roles |  number |  required, default: Author, enum: ['Author','Editor', 'Admin'] |
|  createdAt     | Date(timestamps)  |  reqduire |
|  updatedAt |   Date |  required  |

### Post
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  author |  date |  required |
|  state | number  |  required,default: draft, enum: ['draft','published'] |
|  body  |  string |  required  |
|  description     | string  |  optional |
|  tags |   string |  required  |
|  category |  number |  required |
|  read_count |  number |  required |
|  reading_time |  string |  required|



## APIs
---

### Signup User

- Route: /regigister
- Method: POST
- Body: 
```
{
"first_name" :"Ndubuisi",
"last_name" :"Ollawa", 
"username":"Ndollawa",
"user_email":"ndollawa@yahoo.com",
"password":"mypass"}
```

- Responses

Success
```
{
    message: 'New user ndollawa@yahoo.com created!',
   
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
    "user_email":"ndollawa@yahoo.com",
     "password":"mypass"
}
```

- Responses

Success
```
{
  "message": "successfully logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyIjoiNjM2NWM5MzA0OTJjOGI1YmZjODhmMzg3IiwidXNlckVtYWlsIjoibmRvbGxhd2FAZ21haWwuY29tIiwidXNlcm5hbWUiOiJOZG9sbGF3YSIsInJvbGVzIjpbMyxudWxsLG51bGxdfSwiaWF0IjoxNjY4MjU5Mzc5LCJleHAiOjE2NjgyNTk2Nzl9.s5m_B8xdcWQ2uCWr0R9trvRoXiOXox56P2wJs9qLQEk"
}
```

---
### Create Post

- Route: /post
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title":"The Fall of the Black Race",
  "body":"have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "tags":"Litrature, Trending",
  "description":"Wise words",
  "category":"Litrature"
}
```

- Responses

Success
```
{
  "message": "New Post 'The Fall of the Black Race' created!"
}
```
### Create Post

- Route: /post/:id
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title":"The Updated Post",
  "body":"have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "tags":"Litrature, Trending",
  "description":"Wise words",
  "category":"Litrature"
}
```

- Responses

Success
```
{
  "message": "New Post 'The Fall of the Black Race' updated!",
  "post":{
  "title":"The Updated Post",
  "body":"have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "tags":"Litrature, Trending",
  "description":"Wise words",
  "category":"Litrature"
}
}
```

### Change Post state

- Route: /post/:id                          ("63678ca097b1af6a14468f4e)
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "state": "published"
 }
 ```

- Responses

Success
```
{
  "_id": "63678ca097b1af6a14468f4e",
  "author": [
    "6365c930492c8b5bfc88f387"
  ],
  "title": "The Desire for Wisdom 2",
  "body": "have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "description": "Wise words",
  "tags": "Litrature, Trending",
  "category": "Litrature",
  "state": "published",
  "read_count": 4,
  "__v": 1,
  "updatedAt": "2022-11-12T11:20:46.655Z"
}
```
### Delete a Post 

- Route: /post/:id                          ("63678ca097b1af6a14468f4e)
- Method: DELETE
- Header
    - Authorization: Bearer {token}

- Responses

Success
```
{
 "message": "New Post 'The Fall of the Black Race' deleted!" }

 ```
---
### Get Post

- Route: /post/:id     ("63678ca097b1af6a14468f4e")
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "_id": "63678ca097b1af6a14468f4e",
  "author": [
    "6365c930492c8b5bfc88f387"
  ],
  "title": "The Desire for Wisdom 2",
  "body": "have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "description": "Wise words",
  "tags": "Litrature, Trending",
  "category": "Litrature",
  "state": "draft",
  "read_count": 4,
  "__v": 1,
  "updatedAt": "2022-11-12T11:20:46.655Z"
}
```
---
### Get Post

- Route: /post/:author     ("6365c930492c8b5bfc88f387")
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  "_id": "63678ca097b1af6a14468f4e",
  "author": [
    "6365c930492c8b5bfc88f387"
  ],
  "title": "The Desire for Wisdom 2",
  "body": "have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
  "description": "Wise words",
  "tags": "Litrature, Trending",
  "category": "Litrature",
  "state": "draft",
  "read_count": 4,
  "__v": 1,
  "updatedAt": "2022-11-12T11:20:46.655Z"
}
```
---

### Get Posts

- Route: /post
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: createdAt)
    - order (options: asc | desc, default: desc)
    - state
    - createdAt
- Responses

Success
```
{
  "itemsList": [
    {
      "_id": "63678ca097b1af6a14468f4e",
      "author": [
        {
          "roles": {
            "Author": 3
          },
          "_id": "6365c930492c8b5bfc88f387",
          "email": "ndollawa@gmail.com",
          "username": "Ndollawa",
          "password": "$2b$10$EqhFImOoxMWPJTn09iYVTOSfOaN5FxpdTvgWfsk2TPDG.VladsTfu",
          "created_at": "2022-11-05T02:23:44.907Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZG9sbGF3YUBnbWFpbC5jb20iLCJpYXQiOjE2NjgyNTkzNzksImV4cCI6MTY2ODI2Mjk3OX0.A-pLmjbOSqenrI_K5EqvgLv5Ne6jlLauo5Saiodzx_M",
          "updatedAt": "2022-11-12T13:22:59.219Z"
        }
      ],
      "title": "The Desire for Wisdom 2",
      "body": "have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to63678ca097b1af6a14468f4e do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
      "description": "Wise words",
      "tags": "Litrature, Trending",
      "category": "Litrature",
      "state": "draft",
      "read_count": 6,
      "__v": 1,
      "updatedAt": "2022-11-12T13:29:49.044Z"
    },
    {
      "_id": "63678d1897b1af6a14468f53",
      "author": [
        {
          "roles": {
            "Author": 3
          },
          "_id": "6365c930492c8b5bfc88f387",
          "email": "ndollawa@gmail.com",
          "username": "Ndollawa",
          "password": "$2b$10$EqhFImOoxMWPJTn09iYVTOSfOaN5FxpdTvgWfsk2TPDG.VladsTfu",
          "created_at": "2022-11-05T02:23:44.907Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZG9sbGF3YUBnbWFpbC5jb20iLCJpYXQiOjE2NjgyNTkzNzksImV4cCI6MTY2ODI2Mjk3OX0.A-pLmjbOSqenrI_K5EqvgLv5Ne6jlLauo5Saiodzx_M",
          "updatedAt": "2022-11-12T13:22:59.219Z"
        }
      ],
      "title": "The Fall of the Black Race",
      "body": "have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
      "description": "Wise words",
      "tags": "Litrature, Trending",
      "category": "Litrature",
      "state": "draft",
      "read_count": 0,
      "__v": 0
    },
    {
      "_id": "636f9f2336e3a42ad24cd395",
      "author": [
        {
          "roles": {
            "Author": 3
          },
          "_id": "6365c930492c8b5bfc88f387",
          "email": "ndollawa@gmail.com",
          "username": "Ndollawa",
          "password": "$2b$10$EqhFImOoxMWPJTn09iYVTOSfOaN5FxpdTvgWfsk2TPDG.VladsTfu",
          "created_at": "2022-11-05T02:23:44.907Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZG9sbGF3YUBnbWFpbC5jb20iLCJpYXQiOjE2NjgyNTkzNzksImV4cCI6MTY2ODI2Mjk3OX0.A-pLmjbOSqenrI_K5EqvgLv5Ne6jlLauo5Saiodzx_M",
          "updatedAt": "2022-11-12T13:22:59.219Z"
        }
      ],
      "title": "The test",
      "body": "I have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
      "description": "Wise words",
      "tags": "Litrature, Trending",
      "category": "Litrature",
      "state": "draft",
      "read_count": 0,
      "reading_time": "1",
      "createdAt": "2022-11-12T13:26:59.909Z",
      "updatedAt": "2022-11-12T13:26:59.909Z",
      "__v": 0
    }
  ],
  "paginator": {
    "itemCount": 3,
    "perPage": 10,
    "pageCount": 1,
    "currentPage": 1,
    "slNo": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prev": null,
    "next": null
  }
}
```
---

...
### Get Posts by Author

- Route: /post/author/:author  (filter by state ?state = published)
- Method: GET

success:
Response
{
"_id": "637025ff3fe480a1c2719820",
"author": [
{
"roles": {
"Author": 3
},
"_id": "6370251a3fe480a1c2719814",
"first_name": "Ndubuisi",
"last_name": "Ollawa",
"email": "ndollawa@yahoo.com",
"username": "Ndollawa",
"password": "$2b$10$7/VLRoTUCFGoYCtkKeWKoOR25x1esHjOI64ItUR8BkdkvFtW.NCdi",
"createdAt": "2022-11-12T22:58:34.873Z",
"updatedAt": "2022-11-13T00:22:01.776Z",
"__v": 0,
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZG9sbGF3YUB5YWhvby5jb20iLCJpYXQiOjE2NjgyOTg5MjEsImV4cCI6MTY2ODMwMjUyMX0.fMgwg_2CK1wXNnAQqniQIBv0Galjqfz5MA6Kq1W2bmo"
}
],
"title": "Unical Exams as ASUU Resumes ",
"body": "I have finally graduated! There is always that mix of excitement and relief in the air (right @Shaun Makanda ?) that you only get when you accomplish great things thanks to hard work!Curious of what we do during the ceremony :question: :thinking_face: • We hear advice from our very own sensei on what we need to do to continue being successful software engineers • Graduates get officially onboarded in The Room and write a letter to their future self, as a future reminder and checker of their aspirations and goals. But there are so many things that we are not going to tell you…we do not want to spoil the surprise to you!:arrow_down: Here some of the beautiful faces during prior graduation - can you believe that you will be one of them soon!?",
"description": "Wise words",
"tags": "Litrature, Trending",
"category": "Litrature",
"state": "published",
"read_count": 2,
"reading_time": "1",
"createdAt": "2022-11-12T23:02:23.916Z",
"updatedAt": "2022-11-13T00:28:45.829Z",
"__v": 0
}

```
...
### Search Posts by Author | Tags | Title

- Route: /post/search/
- Method: GET
#   P a y b u d d i e - b a c k e n d  
 