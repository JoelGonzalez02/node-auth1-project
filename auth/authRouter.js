const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../users/users-model');



router.post('/register', async (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const newUser = await Users.add(user);
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    let {username, password } = req.body;

    try {
        const user = await Users.findBy({ username }).first();

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({message: `Welcome ${user.username}!`, })
        } else {
            res.status(401).json({message: 'Please enter a valid username and password'})
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy((err) => {
            if(err) {
                res.status(400).json({message: 'There was an error while loggin you out'})
            } else {
                res.json({message: 'You are now logged out'})
            }
        })
    } else {
        res.end()
    }
});

module.exports = router;

