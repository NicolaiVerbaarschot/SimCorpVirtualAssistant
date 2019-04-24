
var resolvedResponseData = {
    actionType: "",
    parameters: [],
    answer: "",
    newTable: "",
    newVisualisation: ""
};

function handleDialogflowResponse(response) {

    // resolve action type from intent id
    const intentID = response.intentName;
    resolvedResponseData.actionType = intentID.substring(0, intentID.indexOf('_'));




    return resolvedResponseData;
}




module.exports.resolve = handleDialogflowResponse;


    // switch (action) {
    //     case "searchTable":
    //         searchTable(searchString);
    //         break;
    // };
