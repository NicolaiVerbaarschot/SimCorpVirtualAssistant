const mysql = require('mysql');
const visualisationModule = require('./dataVisualisationModule');

//Since SQL queries are a type-2 grammar it can't be validated completely using RegEx
//though here is a simple regex that catches most cases:

var RegexSimpleSQLSelectQuery = RegExp('SELECT .* FROM DB_DATA( WHERE .*)?','i');




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


var ExportObject = {

    queryDBTable: function(res,query) {
        let queryIsValid = RegexSimpleSQLSelectQuery.test(query);
        console.log("databaseModule.js","query:",query,"\nregex:",queryIsValid);
        if (!queryIsValid) throw 'query is not valid according to regex';

        try {
            let query = con.query(query, function (err, data) {
                if (err) throw err;
                res.render('tableTemplate.ejs', {results: data});
            });
            query.on('error', function(err){
                if(err) {
                    console.log("hello",err.code);
                }
            });
            //if (!response.length) throw 'query to database failed'
        } catch (e) {
            console.log(e.toString());
        }

    },

    queryDBGraph: function(res,query)  {

        con.query(query, function (err, data) {
            if (err) throw err;
            let modifiedData = visualisationModule.formatData(data);

            res.render('graphTemplate.ejs', {results: modifiedData});
        });
    },

};

module.exports.functions = ExportObject;

