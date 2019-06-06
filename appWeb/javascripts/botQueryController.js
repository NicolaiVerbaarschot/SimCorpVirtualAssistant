
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {

        setResponse("Bot: " + data.answer);

        console.log(data.actionType);
        if (data.actionType) {

            switch (data.actionType) {
                case 'tableOP':
                    $("#databaseContainer").html(data.newTable.toString());
                    break;
                // case 'Knowledge':
                //     $("#fuseContainer").html(data.knowledgeAnswer.toString());
                //     break;
                case 'graphOP':
                    $("#graphContainer").html(data.newGraph.toString());
                    break;

            }
        } else {
            $("#fuseContainer").html(data.answer.toString());
        }

    }

};

