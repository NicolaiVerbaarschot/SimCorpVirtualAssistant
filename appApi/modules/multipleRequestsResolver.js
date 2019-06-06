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

        let updatedResolvedData = updateUndefinedParams(resolvedData, currentResult)
        return postSubqueriesToDialogFlow(queries, updatedTopQueryObject, updatedSecondTopMostQueryObject, updatedResolvedData)
    }
}

function updateUndefinedParams(current, previous) {
    if (previous == null) {
        return current
    }
    current.actionType = current.actionType == null ? previous.actionType : current.actionType
    current.answer = current.answer == null ? previous.answer : current.answer
    current.knowledgeAnswer = current.knowledgeAnswer == null ? previous.knowledgeAnswer : current.knowledgeAnswer
    current.newQueryObject = current.newQueryObject == null ? previous.newQueryObject : current.newQueryObject
    current.newTable = current.newTable == null ? previous.newTable : current.newTable
    current.newVisualisation = current.newVisualisation == null ? previous.newVisualisation : current.newVisualisation
    current.parameters = current.parameters == null ? previous.parameters : current.parameters
    current.tableOperationType = current.tableOperationType == null ? previous.tableOperationType : current.tableOperationType
    current.isKnowledgeAnswer = current.isKnowledgeAnswer == null? previous.isKnowledgeAnswer : current.isKnowledgeAnswer
    return current

}

module.exports.resolve = resolve;