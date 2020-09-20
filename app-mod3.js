var express = require('express');
var app = express();
const mysql = require('mysql');

app.get('/', function(req, res) {

  var connection = mysql.createConnection({
  	host: "db-inst-identifier.chbtgxigx9rp.us-east-1.rds.amazonaws.com",
  	port: 3306,
  	user: "admin",
  	password: "masspass",
  	database: "db-inst-identifier"
  });
  
  connection.query('Select pid, name, description from product', function (error, results, fields) {
    // Handle error after the release.
    connection.end();
    if (error) res.sendStatus(500).send(error);
    else res.send(results);
  });
  
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app