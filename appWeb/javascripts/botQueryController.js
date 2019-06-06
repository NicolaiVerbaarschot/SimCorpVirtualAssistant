
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {


        setResponse("Bot: " + data.answer.split("#linebreak").join("\n"));


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

    }

};

