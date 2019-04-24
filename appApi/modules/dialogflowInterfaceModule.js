const najax = require('najax');

const accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
const baseUrl = "https://api.api.ai/v1/";

async function postToDialogflow(value) {
    let result;
    try {
        result = najax({
            type: "POST",
            url: baseUrl + "query?v=20150910",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),
        });

        /*
        let answer = data.result.fulfillment.speech.toString();
        let action = data.result.action.toString();
        let sessionID = data.sessionId.toString();
        let result:{
            "answer": answer,
            action = action,
            sessionID = sessionID
        } TODO send only necessary information
         */


        return result;

    } catch (error) {
        console.log(error);
    }
}

module.exports.send = postToDialogflow;