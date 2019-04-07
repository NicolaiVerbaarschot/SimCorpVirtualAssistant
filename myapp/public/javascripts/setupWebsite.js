function setResponse(val) {
    $("#response").text($("#response").text() + val + "\r\n");
    $("#response").scrollTop($("#response")[0].scrollHeight);
}

var successHandler = function(data) {
    var reply = formatMultipleLineReply(data.result.fulfillment.speech); // Allow multi line responses
    setResponse("Bot: " + reply);
    action(data);
}
var errorHandler = function() {
    setResponse("Internal Server Error");
}


function setInput(text) {
    $("#input").val(text);
}

function updateRec(text) {
    $("#rec").text(text);
}

var speechRecognition = new SpeechRecognition(updateRec, setInput);
var queryManager = new QueryManager();

$(document).ready(function() {
    $("#HButton").on("click", function () {
        var query = $("#queryText").val();
        $.ajax({
            url: "http://localhost:3000/api/"+query
        })
            .done(function( data ) {
                console.log(data)
                $("#databaseContainer").html(data.toString());
            });
    });
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var text = $("#input").val();
            if (text == "") return 
            queryManager.manageInput(text);
            setResponse("You: " + text);
            //network.send(text);
        }
    });
    $("#rec").click(function(event) {
        speechRecognition.switch();
    });
    $("#rowButton").click(function() {
        $("#myTable").append("<tr><td>Beer</td><td>$ 20.00 </td></tr>");
    });

    $( "#addRow" ).click(function() {
        addRow();
    });

    $( "#removeRow" ).click(function() {
        removeRow();
    });

    $( "#showHideTable" ).click(function() {
        toggleTable();
    });

    $( "#sortBtn" ).click(function() {
        $( "#stockTitle" ).click();
    });

    $( "#populate" ).click(function() {
        $("tbody").each(function(elem,index){
            var arr = $.makeArray($("tr",this).detach());
            arr.reverse();
            $(this).append(arr);
        });
    });


    $('#table').DataTable({
        "ordering": true // false to disable sorting (or any other option)
    });
    $('.dataTables_length').addClass('bs-select');

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