function QueryManager() {}

QueryManager.prototype.manageInput = function(input) {
    
    if (input == "") {
        console.log("ERROR: QueryManager cannot handle empty input")
        return
    }
    // Split input based on 'and'. 
    //If no 'and' is detected, 'subqueries' will be [input]
    var subqueries = input.split("and");


    var sendAsyncInSequence = function(subqueries, currentIndex) {

        sendAsync(subqueries[currentIndex]).then((data) => {
            //TODO: Refactor action to be given as argument
            action(data)
            
            if (currentIndex == subqueries.length - 1) {
                // last elem. Update UI
                var reply = formatMultipleLineReply(data.result.fulfillment.speech);
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
    }

    sendAsyncInSequence(subqueries, 0);
}
let sendAsync = async function(value) {
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
        console.log(error)
    }
}


let sendAsync2 = async function(value) {
    let result;
    console.log("welcome");

    const DIALOG_FLOW_TOKEN = "ya29.c.El7pBnzc0fQxXmlhmcMqT69C52hoKsNHNRI4yIfINmrxUXKW603cI8eDiQYyW2Hd0-1ih7rJIIcIcBbW-orwe8p22-7pf8FTsTl1xRz756l-ty-7FG2Z28ZZqOk_Q1-U";

    const DIALOG_FLOW_API_ROOT_URL = "https://dialogflow.googleapis.com/v2";
    const YOUR_PROJECT_ID = "firstbot-d1b5b";
    const SESSION_ID = "SomeOtherRandomThing";
    const URL = `${DIALOG_FLOW_API_ROOT_URL}/projects/${YOUR_PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent`;

    console.log(URL);

    try {
        result = await $.ajax({
            type: "POST",
            url: URL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + DIALOG_FLOW_TOKEN
            },
            data: JSON.stringify({"queryInput": {"text": {"text": value, "languageCode": "en"}}}),
        });
        console.log(result);
        return result;

    } catch (error) {
        console.log(error)
    }
};
