var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', (req,res,next) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(!user) {
            return res.status(401).json({
                error: new Error('User not found'),
                message: 'user not found'
            })
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if(!valid){
                return res.status(401).json({
                    error: new Error('Incorrect Password!'),
                    message: 'incorrect password'
                })
            }
            const token = jwt.sign(
                { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h'}
              )
              res.status(200).json({
                  userId: user._id,
                  token: 'token',
                  message:'login successful!'
              })
        }
        ).catch((error) => {
            res.status(500).json({
                error: error
            })
        })
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
})

module.exports = router;
