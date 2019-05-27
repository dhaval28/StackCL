let express = require("express");
let cors = require("cors");
require('./api/db/mongoose');
let bodyParser = require('body-parser');
let adminRoutes = require('./api/routes/admin.routes');
let userRoutes = require('./api/routes/user.routes');

let app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(userRoutes);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(port,function(){
    console.log("App listening on port ",port);
});
