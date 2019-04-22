const express = require('express');
const router = express.Router();

const documentSearch = require('../public/javascripts/documentSearch');
const dataVisualisation = require('../public/javascripts/dataVisualisation');
const superuserCommandHandler = require('../public/javascripts/superuserCommandHandler');

/* GET home page. */

const mysql = require('mysql');

const con = mysql.createConnection({
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
    console.log(data);
    res.render('table.ejs', {results: data});
  });
}

function queryDBGraph(res,query) {
  con.query(query, function (err, data) {
    if (err) throw err;
    let modifiedData = dataVisualisation(data);
    console.log("made query: "+query);
    res.render('graph.ejs', {results: modifiedData});
  });
}

//TODO: handle unmatched queries
function fuseQuery(res,query) {
  const fuse = documentSearch.fuse;
  const fuseResponse = fuse.search(query);
  console.log("made search: "+query);
  res.render('searchResults.ejs', {results: fuseResponse});
}

function superuserCommand(res,command) {
  const commandOutput = superuserCommandHandler.handler(command);
  res.render("superuserResults.ejs", {results: commandOutput});
}

router.get('/api/superuser/:query', function(req, res) {
  superuserCommand(res,req.params.query);
});

router.get('/api/search/:query', function(req, res) {
  fuseQuery(res,req.params.query);
});

router.get('/api/graph/:query', function(req, res) {
  queryDBGraph(res,req.params.query);
});

router.get('/api/table/:query', function(req, res) {
  queryDBTable(res,req.params.query);
});

router.get('/', function(req, res) {
  res.render('client.html' , {result_from_database: ""});
});

router.get('/superuser', function(req, res) {
  res.render('superuser.html');
});

router.get('/docs', function(req, res) {
  res.render('docs.html');
});

router.get('/about', function(req, res) {
  res.render('about.html');
});

module.exports = router;

