
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
    array = query.split(/(SELECT|FROM|WHERE)/g);
    let columns = array[2];
    let predicate = array[6];
    console.log(predicate);
    $("#predicate").html(predicate);
}
