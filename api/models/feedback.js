const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    commentInput: {
        type: String
    },
    starRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Feedback = new mongoose.model('Feedback', feedBackSchema);

module.exports = Feedback;