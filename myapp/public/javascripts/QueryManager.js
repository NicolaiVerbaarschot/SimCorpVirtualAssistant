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

        sendAsync(subqueries[currentIndex]).then((queryResult) => {
            //TODO: Refactor action to be given as argument
            console.log("inside queryManager");
            console.log(queryResult);
            newVar = queryResult;
            action(queryResult);
            
            if (currentIndex == subqueries.length - 1) {
                // last elem. Update UI
                var reply = formatMultipleLineReply(queryResult.fulfillmentText);
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
    // Imports the Google Cloud client library.
    const {Storage} = require('@google-cloud/storage');

    // Instantiates a client. Explicitly use service account credentials by
    // specifying the private key file. All clients in google-cloud-node have this
    // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
    const storage = new Storage({
        projectId: 'project-id',
        keyFilename: '/routes/firstbot-d1b5b-e44bae98475c.json',
    });
    storage.

        //TODO token should be fetched with "~: gcloud auth print-access-token".
        //      1: install and initialize the Cloud SDK https://cloud.google.com/sdk/docs/
        //      2: run:
        //           cd myapp
        //           gcloud auth activate-service-account --key-file routes/firstbot-d1b5b-e44bae98475c.json
        //           gcloud auth print-access-token
        //       copy token and insert here:
        //       do this every hour.. #OMG
        // When this has been moved to backend. server can make this call.
    const DIALOG_FLOW_TOKEN = "ya29.c.El7pBlmlfr-s0teXdEPgf5mZVqNJ8padT53rjTeNlb0LnBX_Vbh_F4teSdKdFY-KsCDnAuc__5yAad1-o4siaXUmMXx_Nd6OEsKKnqmhf3wzULpgpZzjN3sGyl1b7i9l"
    const DIALOG_FLOW_TOKEN2 = $(gcloud auth application-default print-access-token);
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
        return result.queryResult;

    } catch (error) {
        console.log(error)
    }
};
