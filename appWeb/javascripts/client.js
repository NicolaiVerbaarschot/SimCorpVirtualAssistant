function setResponse(val) {
    const response = $("#response");
    response.text(response.text() + val + "\r\n");
    response.scrollTop(response[0].scrollHeight);
}

const successHandler = function(data) {
    const reply = formatMultipleLineReply(data.result.fulfillment.speech); // Allow multi line responses
    setResponse("Bot: " + reply);
    action(data);
};

const errorHandler = function() {
    setResponse("Internal Server Error");
};

function setInput(text) {
    $("#input").val(text);
}

function updateRec(text) {
    $("#rec").html(text);
}

const speechRecognition = new SpeechRecognition(updateRec, setInput);
const queryManager = new QueryManager();

$(document).ready(function() {

    $("#VisualizeButton").on("click", function () {

        const query = $("#queryTextForGraph").val();

        $.ajax({
            url: "http://localhost:8080/api/graph/"+query
        })
            .done(function( data ) {
                $("#graphContainer").html(data.toString());
            });
    });

    $("#HButton").on("click", function () {
        const query = $("#queryText").val();
        $.ajax({
            url: "http://localhost:8080/api/table/"+query
        })
            .done(function( data ) {
                $("#databaseContainer").html(data.toString());
            });
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

    // TODO: Prevent crash from incorrectly formed query upon enter key submission
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
            queryManager.manageInput(text);
            setResponse("You: " + text);
            //network.send(text);
        }
    });

    $("#rec").click(function() {
        speechRecognition.switch();
    });
});

function formatMultipleLineReply(response) {
    const responseLines = response.split('#linebreak');			// split response by keyword #linebreak
    let multiLineReply = "";									// create output variable
    
    for (let i = 0; i < responseLines.length - 1; i++) {		// append all but the last line with \n
    multiLineReply += responseLines[i] + "\n ";
    }
    
    multiLineReply += responseLines[responseLines.length - 1];	// append the last line
    
    return multiLineReply;										// return the result
}