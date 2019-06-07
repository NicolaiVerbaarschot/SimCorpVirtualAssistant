const express = require('express');
const path = require('path');
const database = require(path.resolve(__dirname, "./modules/databaseModule"));
const documentSearch = require(path.resolve(__dirname, "./modules/documentSearch"));
const superuserCommandHandler = require(path.resolve(__dirname, "./modules/superuserModule"));
const multipleRequestsResolver = require(path.resolve(__dirname, "./modules/multipleRequestsResolver"));
const router = express.Router();


router.get('/api/chatBotQueryManager/', function (req,res) {
    multipleRequestsResolver.resolve(req.query.query, req.query.topQueryObject, req.query.secondTopMostQueryObject).then((result) => {
        res.send(result);
    });
});

router.get('/api/superuser/:query', function(req, res) {
    const commandCode = req.params.query.replace(/ .*/,'');

    superuserCommandHandler.handler(req.params.query, res).then(function (commandOutput) {

    res.send([commandOutput, commandCode === 'graphQuery']);
    });

});

router.get('/api/search/:query', function(req, res) {
    const fuse = documentSearch.fuse;
    const fuseResponse = fuse.search(req.params.query);
    res.render('searchTemplate.ejs', {results: fuseResponse});
});

router.get('/api/table/:query', function(req, res) {
    database.requestQuery(req.params.query).then( (data) => {
        res.render('tableTemplate.ejs', {results: data});
    })
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
