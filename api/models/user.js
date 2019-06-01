const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        type: String,
        unique: true
    },
    userRole: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//generating token -- using .methods to define function on instance
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'stackclsecret', { expiresIn: '1d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//Hiding some data while sending profile info -- using .methods to define function on instance
userSchema.methods.getPublicProfile = function () {
    const user = this;
    let userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;
    console.log(userObj);
    return userObj;
}

//Login User -- using .statics to define model functions
userSchema.statics.findByCredentials = async (req) => {
    const user = await User.findOne({ $or: [{ 'emailId': req.body.username }, { 'userName': req.body.username }] });

    if (!user) {
        throw new Error('Unable to login!');
    }

    const isMatch = await bcrypt.compare(req.body.passwd, user.password);
    if (!isMatch) {
        console.log("Incorrect password");
        throw new Error('Unable to login!');
    }

    return user;
}

//Hash the password before saving
userSchema.pre('save', async function (next) {
    // 'this' contains the document to be stored
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;