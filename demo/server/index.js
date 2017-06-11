var express = require("express");
var app = express();
var PORT = 8087;

app.use(express.static(__dirname + '/..'));

app.listen(PORT);

console.log("Server listening on port: " + PORT);
