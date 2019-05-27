const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const Feedback = require('./../models/feedback');

router.post('/login', async (req, res) => {

    try {
        const user = await User.find(({ $and: [{ $or: [{ emailId: req.body.username }, { userName: req.body.username }] }, { password: req.body.passwd }] }));
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(e);
    }

});

router.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
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
