const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const Feedback = require('./../models/feedback');

router.get('/dbInfo', async (req, res) => {

    try {
        const feedbacks = await Feedback.find({});
        res.status(200).send(feedbacks);        
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
