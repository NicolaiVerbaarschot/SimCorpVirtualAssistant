const express = require('express');
const router = express.Router();
var Fuse = require('fuse.js');
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

function queryDBTable(res,query) {
  con.query(query, function (err, data) {
    if (err) throw err;
    console.log("made query: "+query);
    res.render('table.ejs', {results: data});
  });
}

function queryDBGraph(res,query) {
  con.query(query, function (err, data) {
    if (err) throw err;
    console.log("made query: "+query);
    res.render('graph.ejs', {results: data});
  });
}

function fuseTest(res,query) {

  var books = [{
    title: "Old Man's War fiction",
    author: 'John X',
    tags: ['war']
  }, {
    title: 'Right Ho Jeeves',
    author: 'P.D. Mans',
    tags: ['fiction', 'war']
  }];

  var options = {
    keys: [{
      name: 'title',
      weight: 0.3
    }, {
      name: 'author',
      weight: 0.7
    }]
  };
  var fuse = new Fuse(books, options);
  var fuseResponse = fuse.search('Man');

  fuseResponse.forEach(function (result) {
    console.log(result);
  });

  res.render('searchResults.ejs', {results: fuseResponse});

}

router.get('/api/search/:query', function(req, res) {
  fuseTest(res,req.params.query);
});

router.get('/api/graph/:query', function(req, res) {
  queryDBGraph(res,req.params.query);
});

router.get('/api/table/:query', function(req, res) {
  queryDBTable(res,req.params.query);
});

router.get('/', function(req, res, next) {
  res.render('client.html' , {result_from_database: ""});
});

router.get('/docs', function(req, res, next) {
  res.render('docs.html');
});

router.get('/about', function(req, res, next) {
  res.render('about.html');
});

router.get('/features', function(req, res, next) {
  res.render('features.html');
});



module.exports = router;

