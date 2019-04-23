

function handleSuperuserCommand(command) {

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
            "\t- searchDatabase\n" +
            "\t- searchDocs"
    }

    function commandHi() {
        returnString = "Welcome!"
    }


    function commandTableQuery() {
    //    make query directly || checkout: https://stackoverflow.com/questions/38946943/calling-express-route-internally-from-inside-nodejs
    }

    function commandGraphQuery() {

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
    }


    return returnString; // text to render
}

exports.handler = handleSuperuserCommand;