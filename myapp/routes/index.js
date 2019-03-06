const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile("/Users/jakoboffersen/Desktop/myFirstNode/myapp/views/client.html");
});

module.exports = router;
