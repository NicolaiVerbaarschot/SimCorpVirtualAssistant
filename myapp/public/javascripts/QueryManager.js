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
            console.log("inside queryManager");
            console.log(data);
            newVar = data;
            action(data);
            
            if (currentIndex == subqueries.length - 1) {
                // last elem. Update UI
                var reply = formatMultipleLineReply(data.queryResult.fulfillmentText);
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
let sendAsync2 = async function(value) {
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

let newVar;

let sendAsync = async function(value) {
    let result;

    //TODO token should be fetched with "~: gcloud auth print-access-token"
    const DIALOG_FLOW_TOKEN = "ya29.c.El7pBlmlfr-s0teXdEPgf5mZVqNJ8padT53rjTeNlb0LnBX_Vbh_F4teSdKdFY-KsCDnAuc__5yAad1-o4siaXUmMXx_Nd6OEsKKnqmhf3wzULpgpZzjN3sGyl1b7i9l"
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
        console.log(result.queryResult.intent.displayName);
        return result;

    } catch (error) {
        console.log(error)
    }
};
