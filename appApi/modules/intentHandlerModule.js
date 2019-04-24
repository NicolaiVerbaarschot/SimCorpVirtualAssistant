

module.exports = function (chatBotQueryResult) {
    //process intent information
    let action = chatBotQueryResult.action;


    switch (action) {
        case "searchTable":
            searchTable(searchString);
            break;
    };


    return {
        actionType: "tablequery",
        response: chatBotQueryResult.answer,
        newTable: "",
        newVisualisation: ""
    }
};