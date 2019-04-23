var express = require('express');
var path = require('path');
var cors = require('cors');


var indexRouter = require('./appApi/index');
var intentMatcherRouter = require('./appApi/modules/intentMatcher');
var app = express();

app.use(cors());

// view engine setup to make it possible to render plain html
app.set('views', [path.join(__dirname, '/appWeb/views'), path.join(__dirname, '/appApi/ejsTemplates')]);
app.engine('html', require('ejs').renderFile);

//setup dir to search through when looking for files
app.use(express.static(path.join(__dirname, 'appWeb')));

app.use('/', indexRouter);
app.use('/users',intentMatcherRouter);

app.listen(8080, function() {console.log('listening on port 8080...')});


module.exports = app;
