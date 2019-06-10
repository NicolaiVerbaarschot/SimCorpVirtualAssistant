// Reveals our api
$.getScript('javascripts/api.js', function() {});

const speechRecognition = new SpeechRecognition(updateRec, sendInput);
window.onload = function() {
    $.ajax({
        url: "http://localhost:8080/api/table/"+"SELECT%20*%20FROM%20DB_Data"
    })
        .done(function( answer ) {
            $("#databaseContainer").html(answer.toString());
        });
};
$(document).ready(function() {

    $("#VisualizeButton").on("click", function () {

        const query = $("#queryTextForGraph").val();

        $.ajax({
            url: "http://localhost:8080/api/graph/"+query
        })
            .done(function( answer ) {
                $("#graphContainer").html(answer.toString());

            });//TODO switch case based (knowledge/newTable/newGraph)
    });

    $("#HButton").on("click", function () {
        let queryTextField = $("#queryText");
        const query = queryTextField.val();//.toLowerCase();
        $.ajax({
            url: "http://localhost:8080/api/table/"+query
        })
            .done(function( data ) {
                $("#databaseContainer").html(data.toString());
            })
            .fail(function(model,textStatus,errorThrown) {
                alert("Query failed:\n"+model.responseJSON.error);
                queryTextField.select();
            })
    });

    $("#fuse").on("click", function () {
        const query = "man";
        $.ajax({
            url: "http://localhost:8080/api/search/"+query
        })
            .done(function( data ) {
                $("#fuseContainer").html(data.toString());
            });
    });
//TODO: Refactor into bot_DOM_QueryController
    $("#queryText").keypress(function (e) {
        if (e.which === 13) {
            $("#HButton").click();
            return false;
        }
    });
    $("#queryTextForGraph").keypress(function (e) {
        if (e.which === 13) {
            $("#VisualizeButton").click();
            return false;
        }


    });
    $("#input").keypress(function(event) {
        if (event.which === 13) {
            event.preventDefault();
            const text = $("#input").val();
            if (text === "") return;
            $("#input").val("");
            compileAndSendBotQueryThenHandleResult(text);
        }

    });
    $("#rec").click(function() {
        speechRecognition.switch();
    });
});

function compileAndSendBotQueryThenHandleResult(text) {
    setResponseClient(text);
    let topQuery = queryObjectStack[queryObjectStack.length-1];
    let secondTopMostQuery = queryObjectStack.length-2 >= 0 ? queryObjectStack[queryObjectStack.length-2] : undefined;
    api.submitBotQuery(text, topQuery, secondTopMostQuery).then((result) => {
        if (result.tableOperationType === 'undo') {
            undo();
        } else if (result.newQueryObject) {
            queryObjectStack.push(result.newQueryObject);
        }
        bot_DOM_QueryController.handleDialogflowResult(result);

        array = result.SQLQuery.split(/(SELECT|FROM|WHERE|ORDER|BY|;)/);

        const i1 = array.findIndex( S => S=="WHERE") + 1;
        if (i1){
            predicateString = i1 ? "constraints are " + array[i1].toLocaleLowerCase() : "";
            $("#predicate").html(predicateString);

        }

        const i2 = array.findIndex( S => S=="BY") + 1;
        if (i2) {
            orderByString = i2 ? "ordered by " + array[i2].toLocaleLowerCase() : "";
            orderByString = orderByString.split(',').join(' then ');
            $("#order").html(orderByString);
        }



    });

}

function sendInput(text) {
    compileAndSendBotQueryThenHandleResult(text);
} //FIXME: wtf?

function setResponseClient(val) {
    const response = $("#response");
    const message = $("<p class='client-response'></p>");
    message.append(val);
    response.append(message);
    response.scrollTop(response[0].scrollHeight);
}

function setResponseBot(val) {
    const response = $("#response");
    const container = $("<div class='chat-row'></div>");
    const message = $("<p class='bot-response'></p>");
    message.append(val);
    container.append('<img class="botDP" src="../images/botdp.png"  alt="Bot Display Picture"/>');
    container.append(message);
    response.append(container);
    response.scrollTop(response[0].scrollHeight);
}


function updateRec(text) {
    $("#rec").html(text);
}

