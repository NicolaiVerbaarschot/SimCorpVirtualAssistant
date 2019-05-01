const database = require('./databaseModule');

function handleSuperuserCommand(command, res) {

    // Splitting input into command and arguments
    const commandArgumentArray = command.split(/ (.*)/);
    var commandCode, commandArgument;
    if (commandArgumentArray.length > 1) {
        commandCode = commandArgumentArray[0];
        commandArgument = commandArgumentArray[1];
    } else {
        commandCode = commandArgumentArray[0];
    }


    var returnString;



    function commandHelp() {
        returnString = "Here is a list of available commands:\n" +
            "\t- help\n" +
            "\t- queryTable\n" +
            "\t- queryGraph\n" +
            "\t- searchDocs"
    }

    function commandHi() {
        returnString = "Welcome!"
    }

    function commandTableQuery() {
        database.functions.queryDBTable(res, commandArgument);
    }

    function commandGraphQuery() {
        database.functions.queryDBGraph(res, commandArgument);
    }

    function commandSearchDocs() {
        returnString = "Link to document search in appApi/modules/superuserModule.ejs"
    }

    switch (commandCode) {
        case "hi":
            commandHi();
            break;
        case "help":
            commandHelp();
            break;
        case "tableQuery":
            commandTableQuery();
            break;
        case "graphQuery":
            commandGraphQuery();
            break;
        case "searchDocs":
            commandSearchDocs();
            break;
    }


    return returnString; // text to render
}

exports.handler = handleSuperuserCommand;