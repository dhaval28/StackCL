const mongoose = require('mongoose');

const User = mongoose.model('User', {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    userRole: {
        type: String
    }
});

module.exports = User;