const mysql = require('mysql');
const visualisationModule = require('./dataVisualisationModule');



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
        con.query(query, function (err, data) {
            if (err) throw err;
            res.render('tableTemplate.ejs', {results: data}); // TODO: Use Aync/Await to send data to index.js and render there
        });
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

