const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const Feedback = require('./../models/feedback');
const auth = require('./../middleware/auth');

router.get('/dbInfo', auth, async (req, res) => {

    try {
        const feedbacks = await Feedback.find({});
        res.status(200).send(feedbacks);        
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/deleteFeedback', auth, async (req, res) => {

    try {
        await Feedback.findByIdAndDelete(req.body._id);
        const feedbacks = await Feedback.find({});
        res.status(200).send(feedbacks);        
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
