// function QueryManager() {}
//
// QueryManager.prototype.manageInput = function(input) {
//
//     if (input === "") {
//         console.log("ERROR: QueryManager cannot handle empty input");
//         return
//     }
//     // Split input based on 'and'.
//     //If no 'and' is detected, 'subqueries' will be [input]
//     const subqueries = input.split("and");
//
//
//     const sendAsyncInSequence = function(subqueries, currentIndex) {
//
//         sendAsync(subqueries[currentIndex]).then((data) => {
//             //TODO: Refactor action to be given as argument
//             action(data);
//
//             if (currentIndex === subqueries.length - 1) {
//                 // last elem. Update UI
//                 const reply = formatMultipleLineReply(data.result.fulfillment.speech);
//                 setResponse("Bot: " + reply);
//
//                 // copy the query into the query field
//                 $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length-1]));
//
//                 // execute the query
//                 $("#HButton").click();
//             } else {
//                 // Recursive
//                 sendAsyncInSequence(subqueries, currentIndex + 1)
//             }
//         })
//     };
//
//     sendAsyncInSequence(subqueries, 0);
// };
//
// const sendAsync = async function(value) {
//     let result;
//     try {
//         result = await $.ajax({
//             type: "POST",
//             url: baseUrl + "query?v=20150910",
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             headers: {
//                 "Authorization": "Bearer " + accessToken
//             },
//             data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),
//         });
//
//         return result;
//
//     } catch (error) {
//         console.log(error);
//     }
// };




const baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order: "",
    group: "",
    search: ""
};

let queryObjectStack = [baseQueryObject];


function copyQueryObject(queryObject){
    return {
        columns: queryObject.columns,
        filter: queryObject.filter,
        sort: queryObject.sort,
        order: queryObject.order,
        group: queryObject.group,
        search: queryObject.search
    };
}

function  queryParser(queryObject) {
    let query = "SELECT " + queryObject.columns + " FROM Stocks"; // Re-arranging

    // Filter and Search
    let filterLength = queryObject.filter.length;
    let searchLength = queryObject.search.length;
    if (!(filterLength === 0 && searchLength === 0)) { // Check for filter or a search
        query += " WHERE ";

        if (filterLength !== 0) { // Check if there is a filter
            // TODO: multiple filters (AND vs. OR)

            query += queryObject.filter[0][0];

            if (queryObject.filter[0][2]) query += " > ";
            else query += " < ";

            query += queryObject.filter[0][1];

            if (searchLength !== 0) { // Check if there is a filter and search
                query += " AND " + queryObject.search;
            }
        } else { // There is only a search
            query += queryObject.search;
        }
    }

    // Group and sort
    const sortLength = queryObject.sort.length;
    const groupLength = queryObject.group.length;
    if (!(sortLength === 0 && groupLength === 0)) {
        query += " ORDER BY ";

        if (groupLength !== 0) {
            query += queryObject.group;
            if (sortLength !== 0) query += ", " + queryObject.sort;
        } else {
            query += queryObject.sort;
        }
    }

    // Sorting order
    if (queryObject.order) {
        query += " " + queryObject.order;
    }

    query += ";";

    return query;
}


function getQueryFromAction(intentName,parameters) {

    // get intent
    let intent = data.result.action;

    // exit if action cannot be executed
    if (data.result.actionIncomplete) return;

    // get parameters
    let stockAttribute =  data.result.parameters["StockAttribute"];
    let searchString = data.result.parameters["any"];
    let groupString = data.result.parameters["attribute"];
    let filterThreshold = data.result.parameters["number"];
    let higherLower = data.result.parameters["higherLower"];
    let documentSearchString = data.result.parameters["any"];

    // match intent to corresponding action
    switch (intent) {
        case "searchTable":



            break;
        /*case "clearSearch":
            clearSearch();
            break;
        case "sortBy":
            sortTable(stockAttribute);
            break;
        case "reverseTable":
            reverseTable();
            break;
        case "groupTable":
            groupTable(groupString);
            break;
        case "ungroup":
            ungroup();
            break;
        case "filterTable":
            filterTable(stockAttribute, filterThreshold, higherLower);
            break;
        case "undo":
            undo();
            break;
        case "reset":
            reset();
            break;
        case "hideColumn":
            hideColumns(stockAttribute);
            break;
        case "showColumn":
            showColumns(stockAttribute);
            break;
        case "showAllColumns":
            showAllColumns(stockAttribute);
            break;
        case "drawBarDiagram":
            drawBarDiagram(stockAttribute);
            break;
        case "documentSearch":
            sendDocumentSearchStringToFuse(documentSearchString);*/
    }


}

module.exports.getQueryFromAction = getQueryFromAction;