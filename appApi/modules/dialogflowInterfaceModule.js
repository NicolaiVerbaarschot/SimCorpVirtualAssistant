const najax = require('najax');

const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";

async function postToDialogflow(value) {
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

    //TODO token should be fetched with "~: gcloud auth print-access-token".
    //      1: install and initialize the Cloud SDK https://cloud.google.com/sdk/docs/
    //      2: run:
    //           cd myapp
    //           gcloud auth activate-service-account --key-file routes/firstbot-d1b5b-e44bae98475c.json
    //           gcloud auth print-access-token
    //       copy token and insert here:
    //       do this every hour.. #OMG
    // When this has been moved to backend. server can make this call.
    const DIALOG_FLOW_TOKEN = "ya29.c.El71BvI7RCgni7YPJSud2DgJsok8ZNdWEgjlpvcOSJJyYyZDImv8eTjYisQiaY2ZNgFd2qujGBngiVRd2MzGTOeT9wsfI5cMzXSSqAizGEeSbnq0PIU29dXzwNCOqFYa";
    //const DIALOG_FLOW_TOKEN2 = $(gcloud auth application-default print-access-token);
    const DIALOG_FLOW_API_ROOT_URL = "https://dialogflow.googleapis.com/v2beta1";
    const YOUR_PROJECT_ID = "firstbot-d1b5b";
    const SESSION_ID = "SomeOtherRandomThing";
    const URL = `${DIALOG_FLOW_API_ROOT_URL}/projects/${YOUR_PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent`;

    console.log(URL);

    try {
        result = await najax({
            type: "POST",
            url: URL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + DIALOG_FLOW_TOKEN
            },
            data: JSON.stringify({"queryInput": {"text": {"text": value, "languageCode": "en"}}}),
        });
        console.log(result.queryResult.action);

        // let answer = result.queryResult.fulfillmentText;
        // let action = result.queryResult.action;
        // let sessionID = "";//data.sessionId;
        //
        // let result = {
        //     answer: answer,
        //     action: action,
        //     sessionID: sessionID
        // }// TODO send only necessary information

        return result;

    } catch (error) {
        console.log(error)
    }

}

module.exports.send = postToDialogflow;