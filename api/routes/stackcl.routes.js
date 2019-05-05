
let stackclController = require("../controller/stackcl.controller");
let express = require("express");
let router = express.Router();

router.post("/login", (req, res) => stackclController.login(req, res));
router.post("/signup", (req, res) => stackclController.signup(req, res));
router.post("/feedback", (req, res) => stackclController.feedback(req, res));

module.exports = router;