const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const Feedback = require('./../models/feedback');
const auth = require('./../middleware/auth');
const accountMethods = require('./../emails/account');

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req);

        //creating JWT for the user found.
        const token = await user.generateAuthToken();
        res.status(200).send({ user: user.getPublicProfile(), token });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/loginByToken', auth, async (req, res) => {

    try {
        res.status(200).send({ user: req.user.getPublicProfile(), token: req.token });
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/signup', async (req, res) => {
    req.body.userRole = 'ADMIN';
    req.body.userName = req.body.emailId.split('@')[0];
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user: user.getPublicProfile(), token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/logoutAllSessions', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send(error);
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

router.post('/forgotPassword', async (req, res) => {
    let result = '';        //stores a random string as a new password
    let chars = '0123456789';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    try {
        const user = await User.findOne(req.body);
        if (!user) {
            throw new Error('EmailNotFound');
        }

        if (user.lastPasswordReset && (new Date().valueOf() - new Date(user.lastPasswordReset).valueOf() < 86400000)) {
            throw new Error('ForgotPasswordLimit');
        }

        user.password = result;
        console.log(result);

        accountMethods.sendForgotPasswordMail(user);
        user.lastPasswordReset = new Date();
        await user.save();
        res.status(201).send(true);
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/deleteUser', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
