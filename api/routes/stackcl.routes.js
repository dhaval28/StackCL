
let stackclController = require("../controller/stackcl.controller");
let express = require("express");
let router = express.Router();

router.get("/test", (req, res) => stackclController.test(req, res));

module.exports = router;