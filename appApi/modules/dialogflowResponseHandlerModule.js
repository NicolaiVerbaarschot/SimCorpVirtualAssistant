
var resolvedResponseData = {
    actionType: undefined,
    parameters: undefined,
    answer: undefined,
    newTable: undefined,
    newVisualisation: undefined
};

function handleDialogflowResponse(response) {

    // resolve action type from intent name by splitting on underscore character
    resolvedResponseData.actionType = response.intentName.substring(0, response.intentName.indexOf('_'));

    // Obtain parameters
    resolvedResponseData.parameters = response.parameters;

    // Obtain answer
    resolvedResponseData.answer = response.answer;

    // TODO: Implement handling of newTable and newVisualization

    return resolvedResponseData;
}




module.exports.resolve = handleDialogflowResponse;


    // switch (action) {
    //     case "searchTable":
    //         searchTable(searchString);
    //         break;
    // };
