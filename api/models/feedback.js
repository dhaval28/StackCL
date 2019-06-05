const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback', {
    commentInput: {
        type: String
    },
    starRating: {
        type: Number,
        default: 0
    }
});

module.exports = Feedback;