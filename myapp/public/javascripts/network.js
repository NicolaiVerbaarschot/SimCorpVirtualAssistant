var successHandler = function(data) {
    setResponse("Bot: " + data.result.fulfillment.speech);
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