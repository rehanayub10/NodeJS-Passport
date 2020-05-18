const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');

//Login Page
router.get('/login', (req,res) => res.render('login'));

router.get('/register', (req,res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    // console.log(req.body);
    // res.send('Hello');

    //Validation
    //deconstructing
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!'});
    }

    //Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match!'});
    }

    //Check pass length
    if(password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters long'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        }); //Check layout files - how these appear on each render is set there
    } else {
        //res.send('pass');
        //Validation passed
        User.findOne({ email: email})
            .then(user => {
                if(user) {
                    //User Exists
                    errors.push({ msg: 'Email is already registered'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    }); 
                } else {
                    const newUser = new User({
                        name : name,
                        email, //this is ES6 version of above
                        password
                    });

                    console.log(newUser);
                    res.send('Hello');
                }
            })
    }
});

module.exports = router;