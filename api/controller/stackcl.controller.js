let stackclDAO = require("../dao/stackcl.dao");
let stackclController = {};

stackclController.test = (req, res) => {
	// console.log(req.body);
	stackclDAO.test(req, res);
}

module.exports = stackclController;