const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const Feedback = require('./../models/feedback');

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req);
        console.log(user);

        //creating JWT for the user found.
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/signup', async (req, res) => {
    req.body.userRole = 'EXTERNAL';
    req.body.userName = req.body.emailId.split('@')[0];
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/feedback', async (req, res) => {
    const feedback = new Feedback(req.body);

    try {
        await feedback.save();
        res.status(201).send(feedback);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
