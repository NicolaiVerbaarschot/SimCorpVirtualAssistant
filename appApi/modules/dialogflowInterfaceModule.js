const najax = require('najax');
const dialogflow = require('dialogflow').v2beta1;
const uuid = require('uuid');

const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";


var config = {
    projectId: 'firstbot-d1b5b',
    keyFilename: 'appApi/firstbot-d1b5b-e44bae98475c.json',
};
const projectId = 'firstbot-d1b5b';
// A unique identifier for the given session
const sessionId = uuid.v4();
const languageCode = 'en';

// Create a new session
const sessionClient = new dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function postToDialogflow(query) {

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: query,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);


    console.log('Detected intent');
    const queryResult = responses[0].queryResult;
    console.log(`  Query: ${queryResult.queryText}`);
    console.log(`  Response: ${queryResult.fulfillmentText}`);
    let isKnowledgeAnswer = queryResult.action==="";
    let allRequiredParamsPresent = queryResult.allRequiredParamsPresent;

    if (queryResult.intent) {
        console.log(`  Intent: ${queryResult.intent.displayName}`);

    } else {
        console.log(`  No intent matched.`);
    }
    return {
        answer: queryResult.fulfillmentText,
        action: isKnowledgeAnswer ? "Knowledge" : queryResult.action,
        allRequiredParamsPresent : allRequiredParamsPresent,
        parameters: queryResult.allRequiredParamsPresent ? queryResult.parameters : undefined,
        intentName: queryResult.intent.displayName
    };

}

async function postToDialogflowOld(value) {



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
                "Authorization": "Bearer " + "AIzaSyA40DmYkUG4wlLlWishzJBhHb"
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

