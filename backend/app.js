const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();


// process.env.MONGO_ATLAS_PW  this helps us to inject global variable into running node code
mongoose.connect("mongodb+srv://max:"+ process.env.MONGO_ATLAS_PW +"@cluster0.7yd6l.mongodb.net/posts?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true }).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
    console.log("connection failed");
});

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

// the following code block will allow other domains to access resources at our server

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
