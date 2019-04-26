const mysql = require('mysql');
const visualisationModule = require('./dataVisualisationModule');
const util = require('util');



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
const queryUtil = util.promisify(con.query).bind(con);

var ExportObject = {

    queryDBTable: function (res, query) {
        con.query(query, function (err, data) {
            if (err) throw err;
            res.render('tableTemplate.ejs', { results: data }); // TODO: Use Aync/Await to send data to index.js and render there
        });
    },


    getDBArrayFromQuery: async function (query) {
        try {
            return await queryUtil(query);
        } finally {
            con.end();
        }
    },

    queryDBGraph: async function (query) {
        try {
            const result = await queryUtil(query);
            let modifiedData = visualisationModule.formatData(result);
            console.log(modifiedData);
            return modifiedData
        } finally {
            con.end();
        }
    },

    queryDBGraph: function(res,query) {
        con.query(query, function (err, data) {
            if (err) throw err;
            let modifiedData = visualisationModule.formatData(data);
            res.render('graphTemplate.ejs', {results: modifiedData});
        });
    },

    queryTableSuperuser: function(res,query) {
        con.query(query, function (err, data) {
            if (err) throw err;
            res.render('tableTemplate.ejs', {results: data});
        });
    }
};

module.exports.functions = ExportObject;

