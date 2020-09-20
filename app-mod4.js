var express = require('express');
var app = express();
var AWS = require('aws-sdk');
var RDS = new AWS.RDSDataService({region: 'us-east-1'});

app.get('/', function(req, res) {

  let params = {
    resourceArn: 'arn:aws:rds:us-east-1:506451991715:cluster:db-cluster-id',
    secretArn: 'arn:aws:secretsmanager:us-east-1:506451991715:secret:aurora_serverless_secret-noSiiM',
    database: 'initDBname',
    sql: 'SELECT pid, name, description FROM product'
  }
  
  RDS.executeStatement(params, (err, data) => {
    if (err)  res.send(err);
    else res.send(data);
  });
  
});


// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
