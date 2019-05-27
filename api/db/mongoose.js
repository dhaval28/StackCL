const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster1-ou1sq.mongodb.net/stack_cl?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
});
