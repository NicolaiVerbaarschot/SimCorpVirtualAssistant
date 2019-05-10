
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {

        // const reply = formatMultipleLineReply(data.result.fulfillment.speech);
        setResponse("Bot: " + data.answer);

        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());
                break;
            case 'Knowledge':
                $("#fuseContainer").html(data.knowledgeAnswer.toString());
                break;
            case 'graphOP':
                $("#graphContainer").html(data.newGraph.toString());
                break;

        }

        // // copy the query into the query field
        // $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length - 1]));
        //
        // // execute the query
        // $("#HButton").click();
    }

};

