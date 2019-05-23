module.exports.basicResponse = function (res, err, result) {
    if (err) res.status(500).json(err);
    result ? res.json(result) : res.send(null);
}
