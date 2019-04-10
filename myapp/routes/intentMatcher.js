var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("Intent is : " + req.body.queryResult.intent.displayName);
});

module.exports = router;
