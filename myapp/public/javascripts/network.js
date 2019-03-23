var successHandler = function(data) {
    var reply = formatMultipleLineReply(data.result.fulfillment.speech); // Allow multi line responses
    setResponse("Bot: " + reply);
    action(data);
}

var errorHandler = function() {
    setResponse("Internal Server Error");
}

var network = new Network(successHandler, errorHandler);

function Network(successHandler, errorHandler) {
    this.successHandler = successHandler; 
    this.errorHandler = errorHandler;
}

Network.prototype.send = function(value) {
    setResponse("You: " + value);
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),

        success: successHandler,
        error: errorHandler
    });
}
