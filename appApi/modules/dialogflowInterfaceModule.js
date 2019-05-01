const najax = require('najax');

const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";

async function postToDialogflow(value) {
    // Imports the Google Cloud client library.
    const {Storage} = require('@google-cloud/storage');

    // Instantiates a client. Explicitly use service account credentials by
    // specifying the private key file. All clients in google-cloud-node have this
    // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
    const storage = new Storage({
        projectId: 'project-id',
        keyFilename: '/routes/firstbot-d1b5b-e44bae98475c.json',
    });

    const DIALOG_FLOW_TOKEN = "ya29.c.El78BrFVri7tOtWdL-oivHf7qm4pOjdlLGofzfyyLFJdIAj2v2TlTaUhNUhfcfZ-WQq-p82PoosF86YSSrOhgBG0k4k0Ah9v3jfsjE0O--jD3ST3Lxna4aKS2egR1B5O";
    //TODO token should be fetched with "~: gcloud auth print-access-token".
    //      1: install and initialize the Cloud SDK https://cloud.google.com/sdk/docs/ (make sure to add commands to your PATH, it is mentioned in the instructions as optional)
    //      2: run:
    //           cd root of app
    //           gcloud auth activate-service-account --key-file appApi/firstbot-d1b5b-e44bae98475c.json
    //           gcloud auth print-access-token
    //       copy token and insert here:
    //       do this every hour.. #OMG-Simon <- lol at the #OMG-Nicolai -Simon: haha xD
    // const DIALOG_FLOW_TOKEN2 = $(gcloud auth application-default print-access-token);
    const DIALOG_FLOW_API_ROOT_URL = "https://dialogflow.googleapis.com/v2beta1";
    const YOUR_PROJECT_ID = "firstbot-d1b5b";
    const SESSION_ID = "SomeOtherRandomThing";
    const URL = `${DIALOG_FLOW_API_ROOT_URL}/projects/${YOUR_PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent`;

    try {
        let data = await najax({
            type: "POST",
            url: URL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + DIALOG_FLOW_TOKEN
            },
            data: JSON.stringify({"queryInput": {"text": {"text": value, "languageCode": "en"}}}),
        });
        let isKnowledgeAnswer = !data.alternativeQueryResults;
        let allRequiredParamsPresent = data.queryResult.allRequiredParamsPresent;

        return {
            answer: data.queryResult.fulfillmentText,
            action: isKnowledgeAnswer ? "Knowledge" : data.queryResult.action,
            allRequiredParamsPresent : allRequiredParamsPresent,
            parameters: allRequiredParamsPresent ? data.queryResult.parameters : undefined,
            intentName: data.queryResult.intent.displayName
        };

    } catch (error) {
        console.log(error)
    }

}

module.exports.send = postToDialogflow;

