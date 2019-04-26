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
    tableOP: 'testejs',//'tableTemplate',
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

async function handleDialogflowResponse(response) {

    // Declare return object defaults
    let resolvedResponseData = {
        actionType: undefined,
        parameters: undefined,
        answer: undefined,
        newTable: undefined, //html
        newVisualisation: undefined
    };

    // Action type is resolved from intent name by splitting on underscore character
    const actionType = response.intentName.substring(0, response.intentName.indexOf('_'));
    const parameters = ['test1','test2'];//TODO extract


    // Render ejs templates according to action type
    if (['tableOP'].includes(actionType)){
        let query = "SELECT Price FROM Stocks";//queryParser(queryObjectStack[queryObjectStack.length - 1]);
        let data = await database.functions.getQueryDB(query);
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