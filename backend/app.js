const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// the following code block will allow other domains to access resources at our server

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts',(req, res, next) => {
    
    const posts = [
        {id: '1', title: 'Server post title1', content: 'this is coming directly from server'},
        {id: '2', title: 'Server post title2', content: 'this is coming directly from server'},
        {id: '3', title: 'Server post title3', content: 'this is coming directly from server'}
    ];
    
    return res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;