
function setResponse(val) {
    $("#response").text($("#response").text() + val + "\r\n");
    $("#response").scrollTop($("#response")[0].scrollHeight);
}

var successHandler = function(data) {
    var reply = formatMultipleLineReply(data.result.fulfillment.speech); // Allow multi line responses
    setResponse("Bot: " + reply);
    action(data);
};

var errorHandler = function() {
    setResponse("Internal Server Error");
};

var network = new Network(successHandler, errorHandler);

function setInput(text) {
    $("#input").val(text);
}

function updateRec(text) {
    $("#rec").html(text);
}

var speechRecognition = new SpeechRecognition(updateRec, setInput, network);

$(document).ready(function() {

    $("#VisualizeButton").on("click", function () {

        var query = $("#queryTextForGraph").val();

        $.ajax({
            url: "http://localhost:3000/api/graph/"+query
        })
            .done(function( data ) {
                $("#graphContainer").html(data.toString());
            });
    });

    $("#HButton").on("click", function () {
        var query = $("#queryText").val();
        $.ajax({
            url: "http://localhost:3000/api/table/"+query
        })
            .done(function( data ) {
                $("#databaseContainer").html(data.toString());
            });
    });

    // TODO: Prevent crash from incorrectly formed query upon enter key submission
    $("#queryText").keypress(function (e) {
        if (e.which == 13) {
            $("#HButton").click();
            return false;
        }
    });
    $("#queryTextForGraph").keypress(function (e) {
        if (e.which == 13) {
            $("#VisualizeButton").click();
            return false;
        }
    });

    $("#input").keypress(function(event) {
        if (event.which == 13) {
            var text = $("#input").val();
            setResponse("You: " + text);
            network.send(text);
            return false;
        }
    });

    $("#rec").click(function() {
        speechRecognition.switch();
    });
});

function formatMultipleLineReply(response) {
    var responseLines = response.split('#linebreak');			// split response by keyword #linebreak
    var multiLineReply = "";									// create output variable
    
    for (var i = 0; i < responseLines.length - 1; i++) {		// append all but the last line with \n
    multiLineReply += responseLines[i] + "\n ";
    }
    
    multiLineReply += responseLines[responseLines.length - 1];	// append the last line
    
    return multiLineReply;										// return the result
}