# reddit-api
## Reddit API using Node.js

# Routes
## Users:

[GET]
- /users

    Get all users. Access: [root]

- /user/:userId

    Get user details. Access [userId, root]

[POST]
- /register

    Create new user. Public Access. Body:

        {
            name: string,
            surname: string,
            username: string,
            email: email,
            password: password,
            confirmPassword: password
        }

- /login

    Login with user. Body:

        {
            username: string/email,
            password: password
        }

[PATCH]
- /user/:userId

    Update user profile. Access: [userId, root]. Body:

        {
            (optional) name: string,
            (opt) surname: string,
            (opt) username: string,
            (opt) email: email,
            (conditional) oldPassword: password,
            (cond) newPassword: password,
            (cond) confirmPassword: password
        }

[DELETE]
- /user/:userId

    Delete account. Access: [userId, root]



## Reddits (Reddit posts):
[GET]
- /

    Get all Reddit posts [public]

- /feed

    Get latest and popular reddits [public]

- /reddits/:redditId

    Get specific reddit by id [public]

- /reddits/?filters

    Get reddits by filters [public]

[POST]
- /reddits/:redditId

    Comment on a Reddit post [logged in, root]

- /reddits

    Post a new Reddit [logged in]

[PATCH]
- /reddits/:redditId

    Like/Dislike Reddit post [logged in, root]

    Like/Dislike Reddit post's comment [logged in, root]

    Delete Comment. Access [poster, commenter, root]

[DELETE]

- /reddits/:redditId

    Delete a post [poster, root]

