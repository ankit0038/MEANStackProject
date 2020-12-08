const express = require("express");
const bcrypt = require("bcrypt");  // this package is used for encrypting the password
const jwt = require("jsonwebtoken"); // this package is used for generating web tokens for validating http request
const User = require("../models/user");
const user = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User Created',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Invalid authentication credentials!"
            });
        });
    });
    
});

router.post("/login", (req, res, next) => {
    console.log("login request");
    fetchedUser = null;
    User.findOne({email: req.body.email })
    .then(user => {
        
        if(!user) {
            console.log("user not found");
            return res.status(401).json({
                message: "email does not exist!"
            });
        }
        fetchedUser = user;
        console.log("user "+fetchedUser);
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        console.log("user email ", fetchedUser.email, fetchedUser._id);
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer', {expiresIn: "1h"}); // this sign method will generate the token
        console.log(token);
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        }); 
    });
});

module.exports = router;

