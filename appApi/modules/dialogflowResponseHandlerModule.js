const render = require('consolidate');
const path = require('path');


var resolvedResponseData = {
    actionType: undefined,
    parameters: undefined,
    answer: undefined,
    newTable: undefined,
    newVisualisation: undefined
};

async function renderEjs(templateName) {
    let htmlOuter;
    await render.ejs(path.resolve(__dirname,'../ejsTemplates/'+templateName+'.ejs'), { results: ['test1','test2'] }) // TODO: implement parameter handling
        .then(function (html) {
            htmlOuter = html;
        })
        .catch(function (err) {
            throw err;
        });
    return htmlOuter;
}

async function handleDialogflowResponse(response) {

    // Action type is resolved from intent name by splitting on underscore character
    resolvedResponseData.actionType = response.intentName.substring(0, response.intentName.indexOf('_'));
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;

    // Render ejs templates in case of applicable action type
    switch (resolvedResponseData.actionType) {

        case 'textOP':
            await renderEjs('testejs').then((html) => {
                resolvedResponseData.newTable = html;
            }); break;

        case 'tableOP':
            await renderEjs('testejs').then((html) => {
                resolvedResponseData.newTable = html;
            }); break;

        case 'graphOP':
            await renderEjs('testejs').then((html) => {
                resolvedResponseData.newTable = html;
            }); break;
        default:
            return resolvedResponseData;
    }

    return resolvedResponseData;
}




module.exports.resolve = handleDialogflowResponse;