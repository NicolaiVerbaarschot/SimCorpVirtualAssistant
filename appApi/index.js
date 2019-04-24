const express = require('express');
const path = require('path');
const rest = require(path.resolve(__dirname, "./modules/httpRequest")); //TODO make more nice nicolai
const database = require(path.resolve(__dirname, "./modules/databaseModule"));
const documentSearch = require(path.resolve(__dirname, "./modules/documentSearch"));
const superuserCommandHandler = require(path.resolve(__dirname, "./modules/superuserModule"));

const router = express.Router();



router.get('/api/superuser/:query', function(req, res) {
  const commandOutput = superuserCommandHandler.handler(req.params.query, res);
  if (req.params.query.replace(/ .*/,'') !== "tableQuery") // TODO: Perhaps we should unify methods to render to the superuser output
    res.render('superuserTemplate.ejs', {results: commandOutput});

});


const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";
const localHost = "http://localhost:8080/";

router.get('/api/chatBotQueryManager/:query', function (req,res) {
  let message = req.params.query;
  console.log(message);
  //res.send("answering you")

  const options = {
    host: "https://google.com",//baseUrl+"query?v=20150910",
    port: 443,
    path: '',
    method: 'GET',
    headers: {
      'Authorization': "Bearer " + accessToken
    }
  };
  rest.getJSON(options,(statusCode,result) => {
    console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);

    res.statusCode = statusCode;

    res.send(result);

  })


  //
  //
  // let output = '';
  //
  // const req1 = http.request(options, (res) => {
  //   console.log(`${options.host} : ${res.statusCode}`);
  //   res.setEncoding('utf8');
  //
  //   res.on('data', (chunk) => {
  //     output += chunk;
  //   });
  //
  //   res.on('end', () => {
  //     let obj = JSON.parse(output);
  //     console.log("ended: ");
  //     console.log(obj);
  //
  //     //onResult(res.statusCode, obj);
  //   });
  //
  //
  //
  // });
  //
  //
  //
  // req1.on('error', (err) => {
  //   // res.send('error: ' + err.message);
  // });
  //
  // req1.end();
 // sendAsync(message).then((data) => {
 //   console.log(data);
 //   res.send(data)
//
//
 // }
 // );

});

const sendAsync = async function(value) {
  let result;
  try {
    result = await jquery.$.ajax({
      type: "POST",
      url: baseUrl + "query?v=20150910",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
        "Authorization": "Bearer " + accessToken
      },
      data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),
    });

    return result;

  } catch (error) {
    console.log(error);
  }
};


router.get('/api/search/:query', function(req, res) {
  const fuse = documentSearch.fuse;
  const fuseResponse = fuse.search(req.params.query);
  res.render('searchTemplate.ejs', {results: fuseResponse});
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

