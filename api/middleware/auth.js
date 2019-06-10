const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.STACK_CL_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        if (e && e.name === 'TokenExpiredError') {
            const currToken = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.decode(currToken, { complete: true });
            const user = await User.findOne({ _id: decoded.payload._id });
            user.tokens = user.tokens.filter((token) => token.token !== currToken);
            await user.save();
        }
        res.status(401).send({ error: 'Please Authenticate.' });
    }

}

module.exports = auth;