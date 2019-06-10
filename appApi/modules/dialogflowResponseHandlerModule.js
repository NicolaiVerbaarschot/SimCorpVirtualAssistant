const database = require('./databaseModule');
const queryManager = require('./queryManagerModule');
const ejsEngine = require('./renderEngineModule');
const visualisationModule = require("./dataVisualisationModule");
const fuseSearchModule = require("./documentSearch");

const tableOperation = 'tableOP';
const graphOperation = 'graphOP';
const fuseSearchOperation = 'searchOP';
const knowledgeBaseOperation = 'Knowledge';


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
        tableOperationType: undefined, // Can be 'normal', 'undo'.
        isKnowledgeAnswer: undefined,
        fuseSearch: undefined
    };
    // return prematurely as not all params are present
    // Action type is resolved from intent name by splitting on underscore character
    const actionType = response.intentName.substring(0, response.intentName.indexOf('.'));
    const intentName = response.intentName.substring(response.intentName.indexOf('.') + 1);

    resolvedResponseData.isKnowledgeAnswer = response.isKnowledgeAnswer;


    if (!response.allRequiredParamsPresent) {
        resolvedResponseData.answer = response.answer;
        resolvedResponseData.newQueryObject = topQueryObject;

        return resolvedResponseData;
    }


    // Define remaining properties
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;
    resolvedResponseData.actionType = actionType;


    if (response.action == "") {
        resolvedResponseData.actionType = '';
        return resolvedResponseData
    }

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
            case fuseSearchOperation:
                const fuse = fuseSearchModule.fuse;
                const fuseResponse = fuse.search(response.parameters['any']['stringValue']);
                if (fuseResponse != null && fuseResponse[0]['score'] < 0.15) { // Empty == null

                    await ejsEngine.render('searchTemplate', {results: fuseResponse}).then((html) => {
                        resolvedResponseData.fuseSearch = html;
                    });

                } else {
                    resolvedResponseData.fuseSearch = "<p>Sorry, I'm not confident in my findings... Try asking in a different way.</p>";
                }
                resolvedResponseData.actionType = fuseSearchOperation;
        }
    }

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
            let html;
            if (data && data.length > 0) {
                html = await ejsEngine.render('tableTemplate', data);
            } else {
                html = "No data to show...";
            }
            objectToReturn.newTable = html;
        } catch (e) {
            console.log("\nERROR:\n",e);
        }
    }
    return objectToReturn;
}


module.exports.resolve = handleDialogflowResponse;