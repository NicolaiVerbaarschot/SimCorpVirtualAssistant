const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const dataVisualisation = require('../../appWeb/javascripts/dataVisualisation');



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
            res.render(path.resolve(__dirname, '../../appWeb/views/dynamic/table.ejs'), {results: data}); // TODO: Use Aync/Await to send data to index.js and render there
        });
    },

    queryDBGraph: function(res,query) {
        con.query(query, function (err, data) {
            if (err) throw err;
            let modifiedData = dataVisualisation(data);
            console.log("made query: "+query);
            res.render('graph.ejs', {results: modifiedData});
        });
    }
};

exports.functions = ExportObject;

