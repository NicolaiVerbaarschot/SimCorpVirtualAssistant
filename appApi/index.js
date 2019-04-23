const express = require('express');
const path = require('path');
const database = require(path.resolve(__dirname, "./modules/databaseModule"));
const documentSearch = require(path.resolve(__dirname, "./modules/documentSearch"));
const superuserCommandHandler = require(path.resolve(__dirname, "./modules/superuserModule"));

const router = express.Router();



router.get('/api/superuser/:query', function(req, res) {
  const commandOutput = superuserCommandHandler.handler(req.params.query);
  res.render('superuserResults.ejs', {results: commandOutput});
});

router.get('/api/search/:query', function(req, res) {
  const fuse = documentSearch.fuse;
  const fuseResponse = fuse.search(req.params.query);
  res.render('searchResults.ejs', {results: fuseResponse});
});

router.get('/api/graph/:query', function(req, res) {
  database.functions.queryDBGraph(res,req.params.query);
});

router.get('/api/table/:query', function(req, res) {
  database.functions.queryDBTable(res,req.params.query);
});

router.get('/', function(req, res) {
  res.render('client.html');
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

