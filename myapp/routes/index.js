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



router.get('/api/books', function(req, res) {
  queryDB(res,"select * from Stocks where Price>1000");
});

router.get('/table',function (req,res) {
  res.render('table.html');

});

router.get('/', function(req, res, next) {
  res.render('client.ejs' , {result_from_database: "Datab2ase"});
  //queryDB(res,"select * from Stocks where Price>1000");

});
console.log("first2");
module.exports = router;

