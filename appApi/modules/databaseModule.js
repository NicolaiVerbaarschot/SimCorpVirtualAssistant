const mysql = require('mysql');
const visualisationModule = require('./dataVisualisationModule');
const util = require('util');

//Since SQL queries are a type-2 grammar it can't be validated completely using RegEx
//though here is a simple regex that catches most cases:

var RegexSimpleSQLSelectQuery = RegExp('SELECT .* FROM DB_DATA( WHERE .*)?','i');




const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "yiZaQZM5Nm",
    password: "L3YF0CxQf7",
    database: "yiZaQZM5Nm"
});
const conQuery = util.promisify(con.query).bind(con); // Convert 'con.query' to async function returning a promise.

function makeConnectionToDB() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database!");
    });
}
makeConnectionToDB();
const queryUtil = util.promisify(con.query).bind(con);

function validQuery(query,res){

}

function simpleQuerySyntaxTest(query, res) {
    let queryIsValid = RegexSimpleSQLSelectQuery.test(query);
    if (!queryIsValid) res.status(500).send('query is not valid according to regex');
}

var ExportObject = {

    queryDBTable: async function(res,query) {
        simpleQuerySyntaxTest(query, res);
        try {
            let data =  await queryUtil(query);
            res.render('tableTemplate.ejs', {results: data});
        } catch (e) {
            res.status(500).send('error');
            throw e.toString();
        }
    },
    getDBArrayFromQuery: async function (query) {
        simpleQuerySyntaxTest(query, res);
        try {
            return await queryUtil(query);
        } catch (e) {
            throw e;
        }
    },

    queryDBGraph: function(res,query) {
        simpleQuerySyntaxTest(query, res);
        con.query(query, function (err, data) {
            if (err) throw err;
            let modifiedData = visualisationModule.formatData(data);
            res.render('graphTemplate.ejs', {results: modifiedData});
        });
    },

    queryTableSuperuser: function(res, query) {
        con.query(query, function (err, data) {
            if (err) throw err;
            res.render('tableTemplate.ejs', { results: data });
        });
    }
};

module.exports.functions = ExportObject;

