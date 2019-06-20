// Reveals our api
$.getScript('javascripts/api.js', function() {});

function sendInput(text) {sendBotQuery(text)}
function updateRec(text) {$("#rec").html(text)}
const speechRecognition = new SpeechRecognition(updateRec, sendInput);


// Populates the table so that it isn't blank when it loads initially
window.onload = function() {
    $.ajax({
        url: "http://localhost:8080/api/table/"+"SELECT%20*%20FROM%20DB_Data"
    })
        .done(function( answer ) {
            $("#databaseContainer").html(answer.toString());
        });
};

// Ties logic to html components
$(document).ready(function() {

    $("#input").keypress(function(event) {
        if (event.which === 13) {
            event.preventDefault();
            const text = $("#input").val();
            if (text === "") return;
            $("#input").val("");
            sendBotQuery(text);
        }

    });
    $("#rec").click(function() {
        speechRecognition.switch();
    });
});

// Submits the user query from the inut field to our server
function sendBotQuery(text) {
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
    });

}

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



