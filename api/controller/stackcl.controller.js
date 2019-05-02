let stackclDAO = require("../dao/stackcl.dao");
let stackclController = {};

stackclController.login = (req, res) => {
	stackclDAO.login(req, res);
}

module.exports = stackclController;