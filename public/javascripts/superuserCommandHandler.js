
function handleSuperuserCommand(command) {

    var returnString;


    function commandHelp() {
        returnString = "This is the help text"
    }

    switch (command) {
        case "help":
            commandHelp();
    }




    return returnString; // text to render
}

exports.handler = handleSuperuserCommand;