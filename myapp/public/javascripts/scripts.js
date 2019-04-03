var accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
var baseUrl = "https://api.api.ai/v1/";

var baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order : "",
    group: "",
    search: ""
};

var queryObjectStack = [baseQueryObject];

// ---------------------------------------------- Table Operations ---------------------------------------------- //

// TODO: If we use more string attributes in the DB, this would have to be changed. Not ideal, could be implemented smarter
function searchTable(searchString) {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.search = "Market = '" + searchString + "' OR Symbol = '" + searchString + "'";
    queryObjectStack.push(newQuery);
}

function clearSearch() {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.search = "";
    queryObjectStack.push(newQuery);
}

function sortTable(stockAttribute) {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.sort = stockAttribute;
    queryObjectStack.push(newQuery);
}

function reverseTable() {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    if (queryObjectStack[queryObjectStack.length-1].order == "DESC") {
        newQuery.order = "";
    } else {
        newQuery.order = "DESC";
    }
    queryObjectStack.push(newQuery);
}

function groupTable(columnName) {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.group = columnName;
    queryObjectStack.push(newQuery);
}

function filterTable(stockAttribute, threshold, higherLower) {
    let boolHL = false;

    if (higherLower === "higher than") {
        boolHL = true;
    }

    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.filter = [[stockAttribute, threshold, boolHL]];
    queryObjectStack.push(newQuery);
}

function undo() {
    if (queryObjectStack.length > 1) {
        queryObjectStack.pop();
    } else {
        alert("You reached the base view. Cannot undo more actions.");
    }
}

function reset() {
    queryObjectStack = [baseQueryObject];
}

export function action(data) {
    // get intent
    let intent = data.result.action;

    // exit if action cannot be executed
    if (data.result.actionIncomplete) return;

    // TODO: Make robust

    // get parameters
    let stockAttribute =  data.result.parameters["StockAttribute"];
    let searchString = data.result.parameters["searchString"];
    let groupString = data.result.parameters["attribute"];
    let filterThreshold = data.result.parameters["number"];
    let higherLower = data.result.parameters["higherLower"];

    // match intent to corresponding action
    switch (intent) {
        case "searchTable":
            searchTable(searchString);
            break;
        case "clearSearch":
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
        case "filterTable":
            filterTable(stockAttribute, filterThreshold, higherLower);
            break;
        case "undo":
            undo();
            break;
        case "reset":
            reset();
            break;
    }

    // copy the query into the query field
    $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length-1]));

    // execute the query
    $("#HButton").click();
}

// ---------------------------------------------- Aux. Functions ---------------------------------------------- //

function copyQueryObject(queryObject) {
    return {
        columns: queryObject.columns,
        filter: queryObject.filter,
        sort: queryObject.sort,
        order: queryObject.order,
        group: queryObject.group,
        search: queryObject.search
    };
}

// TODO move to external file
function queryParser(queryObject) {
    var query = "SELECT " + queryObject.columns + " FROM Stocks"; // Re-arranging

    // Filter and Search
    var filterLength = queryObject.filter.length;
    var searchLength = queryObject.search.length;
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
    var sortLength = queryObject.sort.length;
    var groupLength = queryObject.group.length;
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