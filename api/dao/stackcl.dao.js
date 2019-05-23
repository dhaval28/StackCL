const MongoClient = require('mongodb').MongoClient;
const ResponseTemplates = require('../utils/ResponseTemplates')
let stackclDAO = {};

let collection;
let _db;
const URI = "mongodb+srv://admin:admin@cluster1-ou1sq.mongodb.net/test?retryWrites=true";

MongoClient.connect(URI, { useNewUrlParser: true })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        connection = client;
        _db = connection.db("stack_cl");
    })


stackclDAO.login = async (req, res) => {
    collection = _db.collection("user_info");

    await collection.findOne(({ $and: [{ $or: [{ emailId: req.body.username }, { userName: req.body.username }] }, { password: req.body.passwd }] }), function (err, result) {
        ResponseTemplates.basicResponse(res, err, result);
    });
};

stackclDAO.signup = async (req, res) => {
    collection = _db.collection("user_info");

    await collection.insertOne(req.body, function (err, result) {
        ResponseTemplates.basicResponse(res, err, result);
    });
};
stackclDAO.feedback = async (req, res) => {
    collection = _db.collection("feedback_response");

    await collection.insertOne(req.body, function (err, result) {
        ResponseTemplates.basicResponse(res, err, result);
    });
};
stackclDAO.dbInfo = async (req, res) => {
    collection = _db.collection("feedback_response");
    let error, result;
    try {
        result = await collection.find({}).toArray();
    } catch (err) {
        error = err;
    } finally {
        ResponseTemplates.basicResponse(res, error, result);
    }
};

module.exports = stackclDAO;
