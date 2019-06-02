const path = require('path');
const dialogflow = require(path.resolve(__dirname, "./dialogflowInterfaceModule"));
const dialogflowResponseHandler = require(path.resolve(__dirname, ".//dialogflowResponseHandlerModule"));

async function resolve(query, topQueryObject, secondTopMostQueryObject) {

    if (query == "") {
        console.log("ERROR: QueryManager cannot handle empty input")
        return
    }
    // Split input based on 'and'.
    //If no 'and' is detected, 'subqueries' will be [input]
    var subqueries = query.split("and");

    return await postSubqueriesToDialogFlow(subqueries, topQueryObject, secondTopMostQueryObject, null);
}

async function postSubqueriesToDialogFlow(queries, topQueryObject, secondTopMostQueryObject, currentResult) {

    if (queries.length == 0) {
        // Base case
        console.log("RESOLVE LAST ELEM!");
        return currentResult
    } else {
        var head = queries.shift();
        let dfData = await dialogflow.send(head)
        let resolvedData = await dialogflowResponseHandler.resolve(dfData, topQueryObject, secondTopMostQueryObject)
        let updatedTopQueryObject = resolvedData.newQueryObject;
        let updatedSecondTopMostQueryObject = topQueryObject;

        return postSubqueriesToDialogFlow(queries, updatedTopQueryObject, updatedSecondTopMostQueryObject, resolvedData)
    }
}

module.exports.resolve = resolve;