const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://max:jJtrC3G7jigZax3l@cluster0.7yd6l.mongodb.net/posts?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true }).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
    console.log("connection failed");
});

app.use(bodyParser.json());

// the following code block will allow other domains to access resources at our server

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        //console.log(result);
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
});

app.get('/api/posts',(req, res, next) => {
    

    Post.find().then( documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
        });
    });
    
    
});

app.delete("/api/posts/:id", (req, res, next) =>{
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id})
    .then( result => {
        console.log(result);
        res.status(200).json({message: 'Post Deleted'});
    });
});

module.exports = app;