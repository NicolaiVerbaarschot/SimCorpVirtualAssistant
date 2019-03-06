var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "StockMarket"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from Stocks", function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
});