
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Reddit = require('./models/reddit')
const { MongoClient } = require("mongodb");

app.use(express.json())

const PORT = 8081

var users = [
    {
        'id': '0',
        'name': 'Default',
        'surname': 'User',
        'username': 'default_user',
        'email': 'default.user@hotmail.com'
    },
    {
        'id': '1',
        'name': 'Bic',
        'surname': 'Michum',
        'username': 'bic101',
        'email': 'bic101@gmail.com'
    }
]
var reddits;
var database;
// = [
//     {
//         'id': '100',
//         'title': 'Writing essays sucks',
//         'author': 'default_user',
//         'content': 'There\'s a lot of things to consider, topic, intro, everything.',
//         'topic': 'english',
//         'comments': [],
//         'upvotes': 7,
//         'downvotes': 1
//     },
//     {
//         'id': '101',
//         'title': 'Python has for loops',
//         'author': 'bic101',
//         'content': 'Just type "for i in range(10): print(i)" and you\'re sorted',
//         'topic': 'programming',
//         'comments': [{
//             author: 'default_user',
//             comment: 'You didn\'t know?',
//             'upvotes': 7,
//             'downvotes': 1
//         },
//         {
//             author: 'bic101',
//             comment: '@default_user Yes, I did not.',
//             'upvotes': 1,
//             'downvotes': 0
//         }],
//         'upvotes': 103,
//         'downvotes': 2
//     }
// ]

const username = encodeURIComponent("admin");
const password = encodeURIComponent("mOUTEkq8bYN6P5lh");
const cluster = "RedditCluster";
const authSource = "$external";
const authMechanism = "DEFAULT";

let uri =
  `mongodb+srv://${username}:${password}@${cluster}.gxsbumv.mongodb.net/?authSource=${authSource}&authMechanism=${authMechanism}`;

const client = new MongoClient(uri);


client.connect().then(()=>{
    console.log("Conn");
    database = client.db("reddit");
    reddits = database.collection("reddits");
    const cursor = reddits.find();
    console.log("nnected");
}).catch((err)=> {
    console.log(err);
});






// await cursor.forEach(doc => console.dir(doc));
  



// const mongoURL = "https://cloud.mongodb.com/v2/6318c1262eec35205a9ae064#metrics/replicaSet/6318c2b4944334007a75a7ed/explorer/reddit"
const mongoURL = "mongodb+srv://admin:mOUTEkq%38bYN%36P%35lh@redditcluster.gxsbumv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(
        PORT,
        () => console.log(`App running at http://localhost:${PORT}`)
    ))
    .catch((err) => console.log("Error:",err))



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:mOUTEkq8bYN6P5lh@redditcluster.gxsbumv.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log("Connected via testing");
//     client.close();
// });

// Reddit posts routes
// feed
app.get('/', (req, res) => {
    res.status(200).send(reddits)
})

// get reddit by id
app.get('/reddits/:id', (req, res) => {
    const {id} = req.params
    const reddit = reddits.find( r => r.id===id )
    if (reddit) res.status(200).send(reddit)
    res.status(415).send({
        'message': `Error! Could not find reddit with id ${id}`
    })
})

// upvote/downvote on a reddit
app.post('/reddits/:id', (req, res) => {
    const {id} = req.params
    const {vote} = req.body
    const comment = {
        ...req.body,
        upvotes: 0,
        downvotes: 0
    }
    const redditInd = reddits.findIndex( r => r.id===id )
    if (redditInd>=0){
        if ( vote==-1 ) {
            reddits[redditInd].downvotes += 1
        }
        else if ( vote == 1) {
            reddits[redditInd].upvotes += 1
        }
        else {
            res.status(417).send({'message': 'Error: Could not vote'})
        }
        res.status(200).send(reddits[redditInd])
    }

    res.status(416).send({'message': 'Error: Could not vote on invalid reddit'})
})

// create a reddit post
app.post('/reddits/', (req, res) => {
    const reddit = new Reddit({
        ...req.body,
        upvotes: 0,
        downvotes: 0,
        comments: []
    })
    reddit.save().then(() => 
    res.status(200).send(reddit)
    ).catch((err)=> 
        res.status(415).send({'message': 'Error: Could not create post'}
        )
    )
})

// comment on a post
app.post('/reddits/:id/comment', (req, res) => {
    const {id} = req.params
    const comment = {
        ...req.body,
        upvotes: 0,
        downvotes: 0
    }
    const redditInd = reddits.findIndex( r => r.id===id )
    if (redditInd>=0){
        reddits[redditInd].comments.push(comment)
        res.status(200).send(reddits[redditInd])
    }

    res.status(416).send({'message': 'Error: Could not write a comment'})
})

// edit a reddit post
app.patch('/reddits/:id', (req, res) => {
    const {id} = req.params
    const reddit = {
        ...req.body
    }
    const redditInd = reddits.findIndex( r => r.id===id )
    if (redditInd>=0){
        reddits[redditInd] = {
            ...reddits[redditInd],
            ...reddit
        }
        res.status(200).send(reddits[redditInd])
    }

    res.status(416).send({'message': 'Error: Could not edit reddit'})
})

// delete reddit
app.delete('/reddits/:id', (req, res) => {
    const {id} = req.params
    const reddit = {
        ...req.body
    }
    const redditInd = reddits.findIndex( r => r.id===id )
    if (redditInd>=0){
        reddits.pop(reddits[redditInd])
        res.status(200).send({'message': 'Deleted successfully'})
    }

    res.status(416).send({'message': 'Error: Could not delete reddit'})
})


// user routes
// get users
app.get('/users', (req, res) => {
    console.log(req);
    res.status(200).send(users)
})

// get user
app.get('/user/:id', (req, res) => {
    const {id} = req.params
    const user = users.find( u => u.id===id )
    if (user) res.status(200).send(user)
    res.status(415).send({
        'message': `Error! Could not find user with id ${id}`
    })
})

app.post('/register', (req, res) => {
    const user = {
        ...req.body,
        id: Math.floor(Math.random() * 500)
    }
    users.push(user)
    res.status(200).send(user)
})

app.post('/login', (req, res) => {
    const {email, username} = req.params
    const user = users.find( u => u.email===email || u.username===username )
    if (user) res.status(200).send(user)
    res.status(415).send({
        'message': `Error! Could not login with those details`
    })
})

// update user profile
app.patch('/user/:userId', (req, res) => {
    const {id} = req.params
    const user = users.find( u => u.id===id )
    if (user) {
        res.send({
            ...req.body,
            'id': 'updated user'
        })
    }
})

app.delete('/user/:id', (req, res) =>{
    const {id} = req.params
    const usuerInd = users.findIndex( u => u.id===id )
    if (usuerInd>=0){
        users.pop(users[usuerInd])
        res.status(200).send({message: `User ${id} deleted`})
    }

    res.status(416).send({'message': 'Error: Could not delete reddit'})
})

