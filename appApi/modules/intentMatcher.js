const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
    console.log("Intent is : " + req.body.queryResult.intent.displayName);
});

module.exports = router;
