
var accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
var baseUrl = "https://api.api.ai/v1/";

// var p = document.querySelector("h1 + p");
// // setInterval(function(){
// //     p.textContent += ".";
// // },1000);

$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $("#rec").click(function(event) {
        switchRecognition();
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

    $( "#sortBtn" ).click(function() {
        $( "#stockTitle" ).click();
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


var recognition;

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.onstart = function(event) {
        updateRec();
    };
    recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    recognition.onend = function() {
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function setInput(text) {
    $("#input").val(text);
    send();
}

function updateRec() {
    $("#rec").text(recognition ? "Stop" : "Speak");
}

function send() {
    var text = $("#input").val();
    setResponse("You: " + text);
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

        success: function(data) {
            setResponse("Bot: " + data.result.fulfillment.speech);
            action(data);
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    //setResponse("Loading...");
}

function setResponse(val) {
    $("#response").text($("#response").text() + val + "\r\n");
    $("#response").scrollTop($("#response")[0].scrollHeight);
}

function addRow() {
    $("#table").append("<tr>\n" +
        "<th scope=\"row\">1</th>\n" +
        "<td>AAPL</td>\n" +
        "<td>NASDAQ</td>\n" +
        "<td>174.32</td>\n" +
        "<td>174.91</td>\n" +
        "<td>172.92</td>\n" +
        "<td>816.45B</td>\n" +
        "<td>1.69 %</td>\n" +
        "</tr>");
}

function removeRow() {
    $("#table tr:last").remove();
}

function toggleTable() {
    $("#table").toggle();
}

function flipTable() {
    $("tbody").each(function(elem,index){
        var arr = $.makeArray($("tr",this).detach());
        arr.reverse();
        $(this).append(arr);
    });
}

function searchTable(string) {
    $('#table').DataTable().search(string).draw();
}

function clearSearch() {
    $('#table').DataTable().search("").draw();
}


function action(data) {

    let intent = data.result.action;

    if (data.result.actionIncomplete) return;

    // TODO: Make robust
    let stockAttribute =  data.result.parameters["StockAttribute"];
    let searchString = data.result.parameters["any"];


    switch (intent) {
        case "input.addRow":
            addRow();
            break;
        case "input.deleteRow":
            removeRow();
            break;
        case "input.toggleTable":
            toggleTable();
            break;
        case "reverseTable":
            flipTable();
            break;
        case "searchTable":
            searchTable(searchString);
            break;
        case "clearSearch":
            clearSearch();
            break;
        case "sortBy":
            switch (stockAttribute) {
                case "title":
                    $("#stockTitle").click();
                    break;
                case "market":
                    $("#market").click();
                    break;
                case "price":
                    $("#currentPrice").click();
                    break;
                case "opening price":
                    $("#open").click();
                    break;
                case "daily high":
                    $("#dailyHigh").click();
                    break;
                case "daily low":
                    $("#dailyLow").click();
                    break;
                case "percent change":
                    $("#percentChange").click();
                    break;
            }

            break;
    }
}



