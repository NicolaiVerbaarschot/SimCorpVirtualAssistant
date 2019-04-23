function QueryManager() {}

QueryManager.prototype.manageInput = function(input) {
    
    if (input === "") {
        console.log("ERROR: QueryManager cannot handle empty input");
        return
    }
    // Split input based on 'and'. 
    //If no 'and' is detected, 'subqueries' will be [input]
    const subqueries = input.split("and");


    const sendAsyncInSequence = function(subqueries, currentIndex) {

        sendAsync(subqueries[currentIndex]).then((data) => {
            //TODO: Refactor action to be given as argument
            action(data);
            
            if (currentIndex === subqueries.length - 1) {
                // last elem. Update UI
                const reply = formatMultipleLineReply(data.result.fulfillment.speech);
                setResponse("Bot: " + reply);
                
                // copy the query into the query field
                $("#queryText").val(queryParser(queryObjectStack[queryObjectStack.length-1]));

                // execute the query
                $("#HButton").click();
            } else {
                // Recursive 
                sendAsyncInSequence(subqueries, currentIndex + 1)
            }
        })
    };

    sendAsyncInSequence(subqueries, 0);
};

const sendAsync = async function(value) {
    let result;
    try {
        result = await $.ajax({
            type: "POST",
            url: baseUrl + "query?v=20150910",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),
        });

        return result;

    } catch (error) {
        console.log(error);
    }
};
