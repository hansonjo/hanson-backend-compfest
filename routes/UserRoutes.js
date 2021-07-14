const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('../validation');

// Register
router.post('/register', async (req, res) => {

    const { error } = validator.registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //Check Unique
    const exist = await User.findOne({email: req.body.email});
    if(exist) return res.status(400).send('Email already exists');

    //Hash 
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        role : "Patient"
    });

    try{
        const savedPost = await user.save();
        res.json(savedPost);
    } catch(err){
        res.status(400).json({message : err.message});
    }

});

// Login
router.post('/login', async (req, res) => {

    const { error } = validator.loginValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //Check Email
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email doesn\'t exists');

    //Check Password 
    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send('Invalid Password');


    //Create Token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_TOKEN);
    res.header('auth-token', token).send({token, role: user.role, id: user._id});
});

// find user
router.get('/find/:postId', async (req,res) => {
    try{
        const user = await User.findById(req.params.postId);
        res.json(user);
    } catch(err){
        res.status(400).json({message : 'id not found'});
    }
})

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.status(400).json({message : err});
    }
});

module.exports = router;