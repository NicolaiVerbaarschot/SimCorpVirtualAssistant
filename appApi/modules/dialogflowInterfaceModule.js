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

    var askingKB = false;
    if (query[0] === '?') {
        askingKB = true;
        query = query.substr(1);
    } else if (query.includes('question mark')){
        askingKB = true;
        query = query.split('question mark')[1];
    }
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: query,
                languageCode: languageCode,
            },
        },
    };


    // Send request and log result
    const response = (await sessionClient.detectIntent(request))[0];
    let allRequiredParamsPresent = true;
    if (askingKB) {
        if (response.queryResult.knowledgeAnswers!=null) {
            queryResult = response.queryResult.knowledgeAnswers.answers[0];
            return {
                success: true,
                query: query,
                answer: queryResult.answer,
                action: queryResult.action,
                allRequiredParamsPresent: allRequiredParamsPresent,
                parameters: undefined,
                intentName: 'KB',
                isKnowledgeAnswer: true
            };
        } else {
            return {
                success: true,
                query: query,
                answer: "I didn't find anything in the documents, for: " + "'"+query+"'",
                action: "TextOP.fail",
                allRequiredParamsPresent: true,
                parameters: undefined,
                intentName: 'KB',
                isKnowledgeAnswer: true
            };
        }


    } else {
        queryResult = response.queryResult;
        while (queryResult.intent.displayName.includes('Knowledge')){
            queryResult = response.alternativeQueryResults.pop()
        }
        allRequiredParamsPresent = queryResult.allRequiredParamsPresent;
        //console.log(`  Intent: ${queryResult.intent.displayName}`);
        //parameters = queryResult
        return {
            success: true,
            query: query,
            answer: queryResult.fulfillmentText,
            action: queryResult.action,
            allRequiredParamsPresent : allRequiredParamsPresent,
            parameters: allRequiredParamsPresent ? queryResult.parameters.fields : undefined,
            intentName: queryResult.intent.displayName,
            isKnowledgeAnswer: false
        };

    }
}

module.exports.send = postToDialogflow;

