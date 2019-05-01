const MongoClient = require('mongodb').MongoClient;
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
        _db = connection.db("sample_airbnb");
    })


stackclDAO.test = async (req, res) => {
    collection = _db.collection("listingsAndReviews");
    await collection.find({ name: "Ribeira Charming Duplex" }).toArray()
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });

};

module.exports = stackclDAO;
