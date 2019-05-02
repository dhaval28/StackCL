
let stackclController = require("../controller/stackcl.controller");
let express = require("express");
let router = express.Router();

router.post("/login", (req, res) => stackclController.login(req, res));
router.post("/signup", (req, res) => stackclController.signup(req, res));

module.exports = router;