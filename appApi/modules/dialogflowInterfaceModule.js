const najax = require('najax');

const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";

var DIALOG_FLOW_TOKEN;
const { exec } = require('child_process');
let routine = function(){
    exec('gcloud auth print-access-token', (err, stdout, stderr) => {
        if (err) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        DIALOG_FLOW_TOKEN = stdout.substr(0,stdout.length-2);//removes newline character at the end of string
        console.log("DIALOG_FLOW_TOKEN was updated to: ",DIALOG_FLOW_TOKEN);
    });
};


var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function() {
    routine();
}, 10000);

routine();

async function postToDialogflow(value) {
    var config = {
        projectId: 'project-id',
        keyFilename: '/routes/firstbot-d1b5b-e44bae98475c.json',
    };
    // Imports the Google Cloud client library.
    //const storage = require('@google-cloud/storage')(config);




    // Instantiates a client. Explicitly use service account credentials by
    // specifying the private key file. All clients in google-cloud-node have this
    // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md

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

