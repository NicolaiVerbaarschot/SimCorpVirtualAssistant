const database = require('./databaseModule');
const queryManager = require('./queryManagerModule');
const ejsEngine = require('./renderEngineModule');

const tableOperation = 'tableOP';
const graphOperation = 'graphOP'

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
    if (actionType === tableOperation) {
        let resolvedQuery = queryManager.getQueryFromAction(intentName, topQueryObject, secondTopMostQueryObject, parameters);
        let query = resolvedQuery.query;

        resolvedResponseData.newQueryObject = resolvedQuery.newTopQueryObject;
        resolvedResponseData.tableOperationType = resolvedQuery.tableOperationType;

        if (query) {
            try {
                let data = await database.functions.requestQuery(query);
                await ejsEngine.render('tableTemplate', data)
                    .then((html) => {
                        resolvedResponseData[responseFieldMap[actionType]] = html;
                    });
            } catch (e) {
                console.log("\nERROR:\n",e);
            }

        }

    } else if (actionType === graphOperation) {
        let resolvedQuery = queryManager.getQueryFromAction(intentName, topQueryObject, secondTopMostQueryObject, parameters)
        let query = resolvedQuery.query;



        await ejsEngine.render(templateMap[actionType],parameters ).then((html) => {
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