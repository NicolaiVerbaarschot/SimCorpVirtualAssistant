const database = require('./databaseModule');
const queryManager = require('./queryManagerModule');
const ejsEngine = require('./renderEngineModule');

const responseFieldMap = {
    textOP: '',
    tableOP: 'newTable',
    graphOP: 'newGraph',
    Knowledge: 'knowledgeAnswer'
};

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
    const parameters = response.parameters;


    // Render ejs templates according to action type
    switch (actionType) {
        case 'tableOP':
            let resolvedQuery = queryManager.getQueryFromAction(intentName, topQueryObject, secondTopMostQueryObject, parameters);
            let query = resolvedQuery.query;

            resolvedResponseData.newQueryObject = resolvedQuery.newTopQueryObject;
            resolvedResponseData.tableOperationType = resolvedQuery.tableOperationType;

            if (query) {
                try {
                    let data = await database.functions.getDBArrayFromQuery(query);
                    await ejsEngine.render('tableTemplate', data)
                        .then((html) => {
                            resolvedResponseData[responseFieldMap[actionType]] = html;
                        });
                } catch (e) {
                    console.log("\nERROR:\n",e);
                }

            }
            break;


        case 'graphOP':
            await ejsEngine.render(templateMap[actionType],parameters ).then((html) => {
                resolvedResponseData[responseFieldMap[actionType]] = html;
            });
            break;

        case 'Knowledge':
            let parameters = [response.query,response.answer];
            await ejsEngine.render(templateMap[actionType],parameters).then((html) => {
                resolvedResponseData[responseFieldMap[actionType]] = html;
            })
            break;
    }


    // Define remaining properties
    resolvedResponseData.actionType = actionType;
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;
    return resolvedResponseData;
}


module.exports.resolve = handleDialogflowResponse;