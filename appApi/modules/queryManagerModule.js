
const columnPositions = ["Symbol", "Market", "Price", "OpenPrice", "DailyHigh", "DailyLow", "PointChangeToday", "PercentChangeToday"];
let modColumns = columnPositions.slice();

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

// --------- Table operations ---------

function hideColumns(queryObject, columnNames) {

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

    // create query object
    let newQuery = copyQueryObject(queryObject);
    newQuery.columns = sqlString;
    return newQuery;
}

function showAllColumns(queryObject) {
    modColumns = columnPositions.slice();
    let newQuery = copyQueryObject(queryObject);
    newQuery.columns = "*";

    return newQuery;
}

function filterTable(queryObject, stockAttribute, threshold, higherLower) {
    let isHigher = false;

    if (higherLower === "higher than") {
        isHigher = true;
    }

    let newQuery = copyQueryObject(queryObject);
    newQuery.filter = [[stockAttribute, threshold, isHigher]];
    return newQuery;
}

// ----------------------------------

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




function getQueryFromAction(intent, queryObject, parameters) { //
    //handle edge case where filter is not defined because express is shit\
    if (!queryObject.filter)
        queryObject.filter = [];

    switch (intent) {
        case "reset":
            //TODO: Handle on client side
            break;
        case "column_hide":
            return queryParser(hideColumns(queryObject, parameters["columnName"]));
        case "column_show_all":
            return queryParser(showAllColumns(queryObject));
        case "filter":
            let higherLower = parameters.higherLower;
            let attribute = parameters.numAttribute;
            let value = parameters.value;
            return queryParser(filterTable(queryObject, attribute, value, higherLower))
        case "group":
            break;
        case "group_ungroup":
            break;
        case "search":
            break;
        case "search_clear":
            break;
        case "sort":
            break;
        case "sort_reverse":
            break;
        case "undo":
            //TODO: Handle on client side
            break;
    }


}

module.exports.getQueryFromAction = getQueryFromAction;
