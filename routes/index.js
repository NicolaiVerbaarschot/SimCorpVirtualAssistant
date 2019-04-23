const express = require('express');
const path = require('path');
const database = require(path.resolve(__dirname, "./databaseModule"));
const documentSearch = require(path.resolve(__dirname, '../public/javascripts/documentSearch'));
const superuserCommandHandler = require(path.resolve(__dirname, '../public/javascripts/superuserCommandHandler'));

const router = express.Router();

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
  database.functions.queryDBGraph(res,req.params.query);
});

router.get('/api/table/:query', function(req, res) {
  database.functions.queryDBTable(res,req.params.query);
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

