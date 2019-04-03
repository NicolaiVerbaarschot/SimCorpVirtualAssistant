const express = require('express');
const router = express.Router();

/* GET home page. */

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "yiZaQZM5Nm",
  password: "L3YF0CxQf7",
  database: "yiZaQZM5Nm"
});


function makeConnectionToDB() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!");
  });
}
makeConnectionToDB();

function queryDB(res,query) {
  con.query(query, function (err, data) {
    if (err) throw err;
    console.log("made query: "+query);
    res.render('table.ejs', {results: data});
  });
}

router.get('/api/:query', function(req, res) {
  queryDB(res,req.params.query);
});

router.get('/', function(req, res, next) {
  res.render('client.html' , {result_from_database: ""});
});

router.get('/graph', function(req, res, next) {
  res.render('graph.html');
});

module.exports = router;

