const columnPositions = ["Symbol", "Market", "Price", "OpenPrice", "DailyHigh", "DailyLow", "PointChangeToday", "PercentChangeToday"];
let modColumns = columnPositions.slice();

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



// Returns the query as object and as string wrapped in object.
function getQueryFromAction(intent, queryObject, parameters) { //
    //handle edge case where filter is not defined because express is shit\

    if (!queryObject.filter)
        queryObject.filter = [];

    switch (intent) {
        case "reset":
            //TODO: Handle on client side
            break;
        case "column_hide":
            let attri = parameters["columnName"];
            var object = hideColumnsInTable(queryObject, attri);

            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
        case "column_show_all":
            var object = showAllColumnsInTable(queryObject);
            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
        case "filter":
            let higherLower = parameters.higherLower;
            let attribute = parameters.numAttribute;
            let value = parameters.value;
            //TODO: Add error handling if attribute is empty, i.e. trying to filter by unknown attribute

            var object = filterTable(queryObject, attribute, value, higherLower);

            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
        case "group":
            let columnName = parameters.stringAttribute;
            //TODO: Add error handling if column name is empty, i.e. trying to group by unknown attribute

            var object = groupTable(queryObject, columnName);

            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
        case "group_ungroup":
            var object = ungroupTable(queryObject);

            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
        case "search":
            //TODO: Add error handling if 'searchString' is empty, i.e. trying to group by unknown attribute
            let searchString = parameters.searchString;
            var object = searchTable(queryObject, searchString);

            return {
                queryObject: object,
                query: queryParser(queryObject)
            }
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
