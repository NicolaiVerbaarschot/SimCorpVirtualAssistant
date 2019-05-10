const database = require('./databaseModule');
const queryManager = require('./queryManagerModule');
const ejsEngine = require('./renderEngineModule');
const visualisationModule = require("./dataVisualisationModule");

const responseFieldMap = {
    textOP: '',
    tableOP: 'newTable',
    graphOP: 'newGraph',
    Knowledge: 'knowledgeAnswer'
};
const tableOperation = 'tableOP';
const graphOperation = 'graphOP';
const knowledgeBaseOperation = 'Knowledge';

const templateMap = {
    textOP: 'testejs',
    tableOP: 'testejs',
    graphOP: 'graphTemplate',
    Knowledge: 'KnowledgeTemplate'
};


async function handleDialogflowResponse(response, topQueryObject, secondTopMostQueryObject) {

    // Declare return object defaults
    let resolvedResponseData = {
        actionType: undefined,
        parameters: undefined,
        answer: undefined,
        newTable: undefined, //html
        knowledgeAnswer: undefined,
        newVisualisation: undefined,
        newQueryObject: undefined,
        tableOperationType: undefined // Can be 'normal', 'undo'.
    };

    // Action type is resolved from intent name by splitting on underscore character
    const actionType = response.intentName.substring(0, response.intentName.indexOf('.'));
    const intentName = response.intentName.substring(response.intentName.indexOf('.') + 1);

    if (response.parameters != null || response.answer!= null) {
        // Render ejs templates according to action type
        switch (actionType) {
            case tableOperation:
                let data = await handleTableOperation(intentName, topQueryObject, secondTopMostQueryObject, response.parameters);
                resolvedResponseData.tableOperationType = data.tableOperationType;
                resolvedResponseData.newTable = data.newTable;
                resolvedResponseData.newQueryObject = data.newQueryObject;
                break;
            case graphOperation:
                let html = await handleGraphOperation(topQueryObject, response.parameters);
                resolvedResponseData.newGraph = html;
                break;
            case knowledgeBaseOperation:
                let parameters = [response.query,response.answer];
                await ejsEngine.render('KnowledgeTemplate',parameters).then((html) => {
                    resolvedResponseData['knowledgeAnswer'] = html;
                });
                break;
        }
    }


    // Define remaining properties
    resolvedResponseData.actionType = actionType;
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;
    return resolvedResponseData;
}

async function handleGraphOperation(topQueryObject, parameters) {
    let query = queryManager.resolveGraphFromAction(topQueryObject, parameters);
    let data = await database.requestQuery(query);
    let modifiedData = visualisationModule.formatData(data);

    let html = await ejsEngine.render('graphTemplate', modifiedData);
    return html;
}

async function handleTableOperation(intentName, topQueryObject, secondTopMostQueryObject, parameters) {

    let objectToReturn = {
        newQueryObject: undefined,
        tableOperationType: undefined,
        newTable: undefined
    }

    let resolvedQuery = queryManager.resolveQueryFromAction(intentName, topQueryObject, secondTopMostQueryObject, parameters);
    let query = resolvedQuery.query;

    objectToReturn.newQueryObject = resolvedQuery.newTopQueryObject;
    objectToReturn.tableOperationType = resolvedQuery.tableOperationType;

    if (query) {
        try {
            let data = await database.requestQuery(query);
            let html = await ejsEngine.render('tableTemplate', data);
            objectToReturn.newTable = html;
        } catch (e) {
            console.log("\nERROR:\n",e);
        }
    }
    return objectToReturn;
}


module.exports.resolve = handleDialogflowResponse;