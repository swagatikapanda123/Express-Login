var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password , 10)
  .then((hash) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    })
    user.save().then(()=>{
      res.status(201).json({
        message: 'user created successfully'
      })
    }).catch((error)=>{
      res.status(400).json({
        errro: error
      })
    })
  })
});

router.get('/', (req,res,next)=>{
  User.find().then((users) => {
    res.status(200).json(users)
  }).catch((error)=>{
    res.status(400).json({
      error: error
    })
})
})

module.exports = router;
