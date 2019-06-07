
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {

        setResponse("Bot: " + data.answer);

        console.log(data.actionType);



        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());
                representState(data.SQLQuery);
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


function representState(query){
    $("#SQLquery").html(query);
}
