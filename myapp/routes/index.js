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
      res.render('client.ejs', {results: data});
    });
  });
}

router.get('/', function(req, res, next) {
  //queryDB(res,"select * from Stocks");
  queryDB(res,"select * from Stocks where Price>1000");

});
console.log("first2");
module.exports = router;

