
const express = require('express')
const app = express()

app.use(express.json())

const PORT = 8080

var users = []
var reddits = [
    {
        'id': '100',
        'title': 'Writing essays sucks',
        'author': 'default_user',
        'content': 'There\'s a lot of things to consider, topic, intro, everything.',
        'topic': 'english',
        'upvotes': 7,
        'downvotes': 1
    },
    {
        'id': '101',
        'title': 'Python has for loops',
        'author': 'bic101',
        'content': 'Just type "for i in range(10): print(i)" and you\'re sorted',
        'topic': 'programming',
        'upvotes': 103,
        'downvotes': 2
    }
]

app.listen(
    PORT,
    () => console.log(`App running at http://localhost:${PORT}`)
)

// Reddit posts routes
// feed
app.get('/', (req, res) => {
    res.status(200).send([
        {
            'id': '100',
            'title': 'Writing essays sucks',
            'author': 'default_user',
            'content': 'There\'s a lot of things to consider, topic, intro, everything.',
            'topic': 'english',
            'upvotes': 7,
            'downvotes': 1
        },
        {
            'id': '101',
            'title': 'python has for loops',
            'author': 'bic101',
            'content': 'Just type "for i in range(10): print(i)" and you\'re sorted',
            'topic': 'programming',
            'upvotes': 3,
            'downvotes': 0
        }
    ])
})

// ge reddit by id
app.get('/reddits/:id', (req, res) => {
    res.status(200).send({
        'id': '101',
        'title': 'python has for loops',
        'author': 'bic101',
        'content': 'Just type "for i in range(10): print(i)" and you\'re sorted',
        'topic': 'programming',
        'upvotes': 3,
        'downvotes': 0
    })
})

// comment on a reddit
app.post('/reddits/:id', (req, res) => {
    const {comment} = {
        comment:req.body.comment,
        upvotes: 0,
        downvotes: 0
    }
    if (req.params.id==='101'){
        res.send({
            'id': '101',
            'title': 'python has for loops',
            'author': 'bic101',
            'content': 'Just type "for i in range(10): print(i)" and you\'re sorted',
            'topic': 'programming',
            'comments': [],
            'upvotes': 3,
            'downvotes': 0
        })
    }

    res.status(415).send({'message': 'Password does not match'})
})

// create a reddit post
app.post('/reddits/', (req, res) => {
    const reddit = {
        ...req.body,
        upvotes: 0,
        downvotes: 0,
        id: Math.floor(Math.random() * 500),
        comments: []
    }
    res.send(reddit)
})


app.patch('/reddits/:id/comment', (req, res) => {
    res.send({
        ...req.body,
        'id': 'updated user'
    })
})

// upvote reddit
app.patch('/reddits/:id/upvote', (req, res) => {
    res.send({
        ...req.body,
        'id': 'updated user'
    })
})

// delete reddit
app.delete('/reddits/:id', (req, res) => {
    res.send({
        'id': 'delete reddit',
        deleted: true
    })
})


// user routes
app.get('/users', (req, res) => {
    res.status(200).send([
        {
            'name': 'Default',
            'surname': 'User',
            'email': 'default.user@hotmail.com'
        },
        {
            'name': 'Bic',
            'surname': 'Michum',
            'email': 'bic101@gmail.com'
        }
    ])
})

app.get('/user/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    res.status(200).send({
        'id': id,
        'name': 'Bic',
        'surname': 'Michum',
        'email': 'bic101@gmail.com'
    })
})

app.post('/register', (req, res) => {
    const {name, surname, username, email, password, confirmPassword} = req.body
    if (password===confirmPassword){
        res.send({
            'id': surname+username+name,
            ...req.body,
            deleted: false
        })
    }

    res.status(415).send({'message': 'Password does not match'})
})

app.post('/login', (req, res) => {
    const body = {...req.body}
    if (body.password==='123'){
        res.send({
            'id': surname+username+name,
            ...body
        })
    }

    res.status(420).send({'message': 'Incorrect Username/Password'})
})

app.patch('/user/:userId', (req, res) => {
    res.send({
        ...req.body,
        'id': 'updated user'
    })
})

app.delete('/user/:id', (req, res) =>{
    res.send({
        ...req.body,
        'id': 'delete user',
        deleted: true
    })
})
