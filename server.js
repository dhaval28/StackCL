let express = require("express");
let cors = require("cors");
let bodyParser = require('body-parser');
let Routes = require('./api/routes/stackcl.routes');
let app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(Routes);


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(port,function(){
    console.log("App listening on port ",port);
});
