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

var result;


router.get('/', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from Stocks", function (err, data) {
      if (err) throw err;
      res.render('client.ejs',{results:data});
    });
  });
  console.log("rendering");

});
console.log("first2");
module.exports = router;