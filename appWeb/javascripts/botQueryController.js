
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
            representState(data.SQLQuery);
            setResponseBot(formatResponse(data.answer));
        }

        console.log(data.actionType);


        switch (data.actionType) {
            case 'tableOP':
                $("#databaseContainer").html(data.newTable.toString());
                representState(data.SQLQuery);
                break;
            case 'graphOP':
                $("#graphContainer").html(data.newGraph.toString());
                break;
            case 'searchOP':
                $('#fuseContainer').html(data.fuseSearch.toString());
                break;

        }

    }

};


function representState(query){
    array = query.split(/(SELECT|FROM|WHERE|ORDER|BY|;)/);
    console.log(array);

    const i1 = array.findIndex( S => S=="WHERE") + 1;
    console.log(i1);
    predicateString = i1 ? "constraints: " + array[i1].toLocaleLowerCase() : "";

    const i2 = array.findIndex( S => S=="BY") + 1;
    orderByString = i2 ? "ordered by: " + array[i2].toLocaleLowerCase() : "";

    $("#predicate").html(predicateString);
    $("#order").html(orderByString);
    console.log('representState End');
}
