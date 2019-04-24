const render = require('consolidate');
const path = require('path');

var resolvedResponseData = {
    actionType: undefined,
    parameters: undefined,
    answer: undefined,
    newTable: undefined,
    newVisualisation: undefined
};

function handleDialogflowResponse(response) {

    // Action type is resolved from intent name by splitting on underscore character
    resolvedResponseData.actionType = response.intentName.substring(0, response.intentName.indexOf('_'));
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;

    // TODO: Implement handling of newTable and
    render.ejs(path.resolve(__dirname,'../ejsTemplates/superuserTemplate.ejs'), { results: 'tobi' }, function(err, html){
        if (err) throw err;
        console.log(html);
    });

    return resolvedResponseData;
}




module.exports.resolve = handleDialogflowResponse;