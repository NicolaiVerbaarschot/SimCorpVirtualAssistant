const render = require('consolidate');
const path = require('path');
const database = require('./databaseModule');
const queryManager = require('./queryManagerModule');

const responseFieldMap = {
    textOP: '',
    tableOP: 'newTable',
    graphOP: 'newGraph'
};

const templateMap = {
    textOP: 'testejs',
    tableOP: 'testejs',
    graphOP: 'graphTemplate'
};

//TODO remove async?
async function renderEjs(templateName, parameters) {

    let htmlOuter;
    await render.ejs(path.resolve(__dirname,'../ejsTemplates/'+templateName+'.ejs'), { results: parameters })
        .then(function (html) {
            htmlOuter = html;
        })
        .catch(function (err) {
            throw err;
        });
    return htmlOuter;
}

async function handleDialogflowResponse(response, topQueryObject, secondTopMostQueryObject) {

    // Declare return object defaults
    let resolvedResponseData = {
        actionType: undefined,
        parameters: undefined,
        answer: undefined,
        newTable: undefined, //html
        newVisualisation: undefined,
        newQueryObject: undefined,
        tableOperationType: undefined // Can be 'normal', 'undo'.
    };

    // Action type is resolved from intent name by splitting on underscore character
    const actionType = response.intentName.substring(0, response.intentName.indexOf('_'));
    const intentName = response.intentName.substring(response.intentName.indexOf('_') + 1);
    const parameters = response.parameters;


    // Render ejs templates according to action type
    if (['tableOP'].includes(actionType)) {
        let resolvedQuery = queryManager.getQueryFromAction(intentName, topQueryObject, secondTopMostQueryObject, parameters);
        let query = resolvedQuery.query;

        resolvedResponseData.newQueryObject = resolvedQuery.newTopQueryObject;
        resolvedResponseData.tableOperationType = resolvedQuery.tableOperationType;

        let data = await database.functions.getDBArrayFromQuery(query);
        await renderEjs('tableTemplate', data)
            .then((html) => {
                resolvedResponseData[responseFieldMap[actionType]] = html;
            });

    } else if (['graphOP'].includes(actionType)) {
        await renderEjs(templateMap[actionType],parameters ).then((html) => {
            resolvedResponseData[responseFieldMap[actionType]] = html;
        });
    }

    // Define remaining properties
    resolvedResponseData.actionType = actionType;
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;
    return resolvedResponseData;
}


module.exports.resolve = handleDialogflowResponse;