
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {

        // const reply = formatMultipleLineReply(data.result.fulfillment.speech);
        setResponse("Bot: " + data.answer);

        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());

        }
        // // copy the query into the query field
        // $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length - 1]));
        //
        // // execute the query
        // $("#HButton").click();
    }

};

