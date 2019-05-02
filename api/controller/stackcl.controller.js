let stackclDAO = require("../dao/stackcl.dao");
let stackclController = {};

stackclController.login = (req, res) => {
	stackclDAO.login(req, res);
}
stackclController.signup = (req, res) => {
	req.body["userName"] = req.body.emailId.split('@')[0];
	stackclDAO.signup(req, res);
}

module.exports = stackclController;