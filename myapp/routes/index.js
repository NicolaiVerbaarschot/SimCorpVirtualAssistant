const express = require('express');
const router = express.Router();

/* GET home page. */

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "StockMarket"
});


function queryDB(res,query) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(query, function (err, data) {
      if (err) throw err;
      console.log("made query");
      //res.json(data);
      res.render('table.ejs', {results: data});
    });
  });
}



router.get('/api/:query', function(req, res) {
  var query = req.params.query;
  console.log("query: " + query);
  queryDB(res,query);
});

router.get('/table',function (req,res) {
  res.render('table.html');

});

router.get('/', function(req, res, next) {
  res.render('client.ejs' , {result_from_database: ""});

});
console.log("first2");
module.exports = router;

