var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("inside intentMatcher");
    console.log(req);
    //console.log(res);
});

module.exports = router;
