
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {

        setResponse("Bot: " + data.answer);

        console.log(data.actionType);



        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());
                break;
            case 'graphOP':
                $("#graphContainer").html(data.newGraph.toString());
                break;
        }

        if (data.isKnowledgeAnswer) {
            $("#fuseContainer").html(data.answer.toString());
        }


    }

};

