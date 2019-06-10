
const bot_DOM_QueryController = {

    handleDialogflowResult: function(data) {



        function formatResponse(text) {
            text = text.split("-").join("<br>");
            text = text.split("*").join("<em>");
            text = text.split("^").join("</em>");

            return text;
        }

        // Set bot response
        if (data.actionType === 'discoverOP') {

            var text = data.answer.split("&");

            text.forEach(function (line, index, collection) {

                setTimeout(function (){

                    setResponseBot(formatResponse(line));

                }, index * 2000);

            });
            console.log(text);


        } else {

            setResponseBot(formatResponse(data.answer));
        }

        console.log(data.actionType);


        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());
                break;
            case 'graphOP':
                $("#graphContainer").html(data.newGraph.toString());
                break;
            case 'searchOP':
                $('#fuseContainer').html(data.fuseSearch.toString());
                break;

        }

        // if (data.isKnowledgeAnswer) {
        //     $("#fuseContainer").html(data.answer.toString());
        // }


    }

};

