
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {


        // TODO: Proccess responses from dialogflow


        function formatResponse(text) {
            text = text.split("-").join("<br>");
            text = text.split("*").join("<em>");
            text = text.split("^").join("</em>");


            return text;
        }

        setResponseBot(formatResponse(data.answer));

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

