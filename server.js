let express = require("express");
let cors = require("cors");
require('./api/db/mongoose');
let bodyParser = require('body-parser');
let adminRoutes = require('./api/routes/admin.routes');
let userRoutes = require('./api/routes/user.routes');
let auth = require('./api/middleware/auth');

let app = express();
let port = process.env.PORT;

// Maintenance Mode middleware ( Cancel all requests )
// app.use((req, res, next) => {
//     res.status(503).send("Website in maintenance mode");
// });

app.use(cors());
app.use(bodyParser.json());
app.use(adminRoutes);
app.use(userRoutes);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(port, function () {
    console.log("App listening on port ", port);
});
