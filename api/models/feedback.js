const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback', {
    commentInput: {
        type: String
    },
    starRating: {
        type: Number
    }
});

module.exports = Feedback;