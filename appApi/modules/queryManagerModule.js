
const columnPositions = ["Symbol", "Type", "Price", "QC", "Total_QTY", "Total_Price", "Maturity_Date", "Dirty_Value_QC", "Dirty_Value_PC", "Dirty_Value_RC"];
let modColumns = columnPositions.slice();

const baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order : "",
    group: "",
    search: ""
};

// --------- Table operations ---------

function hideColumnsInTable(queryObject, columnNames) {

    // modify column names to be shown (remove selected columns from modColumns
    columnNames.forEach(function (column) {
        if (modColumns.indexOf(column) > -1) {
            modColumns.splice(modColumns.indexOf(column), 1);
        }
    });

    // parse string from modColumns into SQL syntax
    let sqlString = "";

    modColumns.forEach(function (column) {
        sqlString += column + ", ";
    });

    sqlString = sqlString.substr(0, sqlString.length - 2);

    queryObject.columns = sqlString;
    return queryObject;
}

function showAllColumnsInTable(queryObject) {
    queryObject.columns = "*";
    return queryObject;
}

function filterTable(queryObject, stockAttribute, threshold, higherLower) {
    let isHigher = false;

    if (higherLower === "higher than") {
        isHigher = true;
    }
    queryObject.filter = [[stockAttribute, threshold, isHigher]];
    return queryObject;
}

function groupTable(queryObject, columnName) {
    queryObject.group = columnName;
    return queryObject;
}

function ungroupTable(queryObject) {
    queryObject.group = "";
    return queryObject;
}

//TODO: update search string to include all searchable columns from correct table.
function searchTable(queryObject, searchString) {
    queryObject.search = "Market = '" + searchString + "' OR Symbol = '" + searchString + "'";
    return queryObject;
}

function clearSearch(queryObject) {
    queryObject.search = "";
    return queryObject;
}

function sortTable(queryObject, stockAttribute) {
    queryObject.sort = stockAttribute;
    return queryObject;
}

//Move to backend
function reverseTable(queryObject) {
    if (queryObject.order === "DESC") {
        queryObject.order = "";
    } else {
        queryObject.order = "DESC";
    }
    return queryObject;
}
// ----------------------------------

function  queryParser(queryObject) {
    if (!queryObject) return undefined;

    let query = "SELECT " + queryObject.columns + " FROM Stocks"; // Re-arranging
    let query = "SELECT " + queryObject.columns + " FROM DB_Data"; // Re-arranging

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



// Returns the query as object and as string wrapped in object.
function getQueryFromAction(intent, topQueryObject, secondTopMostQueryObject, parameters) { //
    //handle edge case where filter is not defined because express is shit\
    if (!topQueryObject.filter) topQueryObject.filter = [];
    if (secondTopMostQueryObject && !secondTopMostQueryObject.filter) secondTopMostQueryObject.filter = [];

    var tableOperationType = "normal";
    var object = undefined;

    switch (intent) {
        case "reset":
            object = baseQueryObject;
            break;
        case "column_hide":
            let attri = parameters["columnName"];
            var object = hideColumnsInTable(topQueryObject, attri)
            break;
        case "column_show_all":
            object = showAllColumnsInTable(topQueryObject);
            break;
        case "filter":
            let higherLower = parameters.higherLower;
            let attribute = parameters.numAttribute;
            let value = parameters.value;
            //TODO: Add error handling if attribute is empty, i.e. trying to filter by unknown attribute

            object = filterTable(topQueryObject, attribute, value, higherLower);
            break;
        case "group":
            let columnName = parameters.stringAttribute;
            //TODO: Add error handling if column name is empty, i.e. trying to group by unknown attribute

            object = groupTable(topQueryObject, columnName);
            break;
        case "group_ungroup":
            object = ungroupTable(topQueryObject);
            break;
        case "search":
            //TODO: Add error handling if 'searchString' is empty, i.e. trying to search by unknown attribute
            let searchString = parameters.searchString;
            object = searchTable(topQueryObject, searchString);

            break;
        case "search_clear":
            object = clearSearch(topQueryObject);
            break;
        case "sort":
            let sortAtrribute = parameters.columnName;
            //TODO: Add error handling if 'sortAtrribute' is empty, i.e. trying to sort by unknown attribute
            object = sortTable(topQueryObject, sortAtrribute);
            break;
        case "sort_reverse":
            object = reverseTable(topQueryObject);
            break;
        case "undo":
            object = secondTopMostQueryObject;
            tableOperationType = "undo";
            break;
    }
    return {
        newTopQueryObject: object,
        query: queryParser(object),
        tableOperationType: tableOperationType
    }
}

module.exports.getQueryFromAction = getQueryFromAction;
