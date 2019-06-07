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

    let initialResult = {
        newQueryObject : topQueryObject,
        secondTopMostQueryObject : secondTopMostQueryObject
    }
    return await postSubqueriesToDialogFlow(subqueries, [initialResult]);
}

async function postSubqueriesToDialogFlow(queries, results) {

    if (queries.length === 0) {
        // Base case
        return reduceResults(results);
    } else {
        let head = queries.shift();
        let dfData = await dialogflow.send(head);

        // extract necessary params for dialogflowResponseHandler
        let currentResult = results[results.length - 1];
        // Parse by value
        let topQueryObject = currentResult.newQueryObject;
        let secondTopMostQueryObject = currentResult.secondTopMostQueryObject;
        let secondTopMostQueryObject2 = JSON.parse(JSON.stringify(currentResult.newQueryObject));

        let resolvedData = await dialogflowResponseHandler.resolve(dfData, topQueryObject, secondTopMostQueryObject);
        resolvedData.secondTopMostQueryObject = secondTopMostQueryObject2;

        results.push(resolvedData);

        return postSubqueriesToDialogFlow(queries, results);
    }
}

function updateUndefinedParams(current, previous) {
    if (previous == null) {
        return current;
    }
    current.actionType = current.actionType == null ? previous.actionType : current.actionType;
    current.answer = current.answer == null ? previous.answer : current.answer;
    current.knowledgeAnswer = current.knowledgeAnswer == null ? previous.knowledgeAnswer : current.knowledgeAnswer;
    current.newQueryObject = current.newQueryObject == null ? previous.newQueryObject : current.newQueryObject;
    current.newTable = current.newTable == null ? previous.newTable : current.newTable;
    current.newVisualisation = current.newVisualisation == null ? previous.newVisualisation : current.newVisualisation;
    current.parameters = current.parameters == null ? previous.parameters : current.parameters;
    current.tableOperationType = current.tableOperationType == null ? previous.tableOperationType : current.tableOperationType;
    current.isKnowledgeAnswer = current.isKnowledgeAnswer == null? previous.isKnowledgeAnswer : current.isKnowledgeAnswer;
    return current;

}

function reduceResults(results) {
    let combinedAnswer = "";
    // Remove head as it didnt contain any answer
    results.shift();
    results.forEach(function (result) {
        combinedAnswer += result.answer + "\n"
    })

    let finalResult = results[results.length - 1];
    finalResult.answer = combinedAnswer;
    return finalResult;
}

module.exports.resolve = resolve;