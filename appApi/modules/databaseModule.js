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


function simpleQuerySyntaxTest(query, res) {
    let queryIsValid = RegexSimpleSQLSelectQuery.test(query);
    if (!queryIsValid) {
        res.send(500, { error: "Error: Query syntax is invalid" });
        throw 'query is not valid according to regex';
    }
}

var ExportObject = {

    queryDBTable: async function(res,query) {
        simpleQuerySyntaxTest(query, res);
        try {
            let data =  await queryUtil(query);
            res.render('tableTemplate.ejs', {results: data});
        } catch (e) {
            res.send(500, { error: e.toString() });
            //res.status(500).send();
            throw e.toString();
        }
    },

    getDBArrayFromQuery: async function (query) {
        try {
            return await queryUtil(query);
        } catch (e) {
            throw e;
        }
    },

    queryDBGraph: async function(res,query) {
        simpleQuerySyntaxTest(query, res);
        try {
            let data =  await queryUtil(query);
            let modifiedData = visualisationModule.formatData(data);
            res.render('graphTemplate.ejs', {results: modifiedData});
        } catch (e) {
            res.status(500).send();
            throw e.toString();
        }
    },

    queryTableSuperuser: async function(res, query) {
        try {
            let data = await queryUtil(query);
            res.render('tableTemplate.ejs', { results: data });
        } catch (e) {
            res.status(500).send();
            throw e.toString();
        }
    }
};

module.exports.functions = ExportObject;

