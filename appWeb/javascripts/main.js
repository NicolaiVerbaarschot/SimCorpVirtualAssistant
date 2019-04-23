const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";
const localHost = "http://localhost:8080/";

const baseQueryObject = {
    columns: "*",
    filter: [],
    sort: "",
    order : "",
    group: "",
    search: ""
};

let queryObjectStack = [baseQueryObject];

const columnPositions = ["Symbol", "Market", "Price", "OpenPrice", "DailyHigh", "DailyLow", "PointChangeToday", "PercentChangeToday"];
let modColumns = columnPositions.slice();
//TODO: can these column names be fetched from the database? Would make the program a lot more robust. The column names
//TODO: in DB, DialogFlow, and here have to be consistent!

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
    if (queryObjectStack[queryObjectStack.length-1].order === "DESC") {
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

function ungroup() {
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.group = "";
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

function hideColumns(columnNames) {

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
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.columns = sqlString;
    queryObjectStack.push(newQuery);
}

function showColumns(columnNames) {
    let standardPos = -1;       // this variable will hold the standard position of the column
    let insertIndex = -1;       // this variable will hold the insertion position of the column

    // iterate over all columns contained in the argument list
    columnNames.forEach(function (column) {

        // only add columns that are not contained in the current table.
        if (modColumns.indexOf(column) === -1) {
            standardPos = columnPositions.indexOf(column);  // get the standard position of the current column
            insertIndex = -1;                               // set insertion index to -1

            // iterate over all columns currently shown in the table. When a column is encountered that is usually
            // positioned to the right of the current column in question, save that index.
            for (let i = 0; i < modColumns.length; i++) {
                if (columnPositions.indexOf(modColumns[i]) >= standardPos && insertIndex === -1) {
                    insertIndex = i;
                }
            }

            // insert the column as the last column if the index has not been updated
            if (insertIndex === -1) {
                modColumns.push(column);
            }
            // insert the column at the insertion index
            else {
                modColumns.splice(insertIndex, 0, column);
            }
        }
    });

    // parse string from modColumns into SQL syntax
    let sqlString = "";

    modColumns.forEach(function (column) {
        sqlString += column + ", ";
    });

    sqlString = sqlString.substr(0, sqlString.length - 2);

    // create query object
    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.columns = sqlString;
    queryObjectStack.push(newQuery);
}

function showAllColumns() {
    modColumns = columnPositions.slice();

    let newQuery = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    newQuery.columns = "*";
    queryObjectStack.push(newQuery);

}

function drawBarDiagram(stockAttribute) {
    let queryObject = copyQueryObject(queryObjectStack[queryObjectStack.length-1]);
    queryObject.columns = "Symbol, " + stockAttribute;
    let query = queryParser(queryObject);

    $("#queryTextForGraph").val(query);
    $.ajax({
        url: localHost + "api/graph/" + query
    })
        .done(function( data ) {
            $("#graphContainer").html(data.toString());
        });
}

function sendDocumentSearchStringToFuse(documentSearchString) {
    $.ajax({
        url: localHost + "api/search/" + documentSearchString
    })
        .done(function( data ) {
            $("#fuseContainer").html(data.toString());
        });
}

function action(data) {

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
            sendDocumentSearchStringToFuse(documentSearchString);
    }


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