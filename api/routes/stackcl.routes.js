
let stackclController = require("../controller/stackcl.controller");
let express = require("express");
let router = express.Router();

router.post("/login", (req, res) => stackclController.login(req, res));

module.exports = router;