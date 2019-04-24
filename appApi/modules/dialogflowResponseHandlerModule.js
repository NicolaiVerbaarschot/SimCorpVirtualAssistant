const render = require('consolidate');
const path = require('path');


var resolvedResponseData = {
    actionType: undefined,
    parameters: undefined,
    answer: undefined,
    newTable: undefined,
    newVisualisation: undefined
};
//
// async function renderEjs(templateName) {
//     render.ejs(path.resolve(__dirname,'../ejsTemplates/'+templateName+'.ejs'), { results: ['test1','test2'] })
//         .then(function (html) {
//             console.log(html);
//             return html;
//         })
//         .catch(function (err) {
//             throw err;
//         });
// }

async function handleDialogflowResponse(response) {

    // Action type is resolved from intent name by splitting on underscore character
    resolvedResponseData.actionType = response.intentName.substring(0, response.intentName.indexOf('_'));
    resolvedResponseData.parameters = response.parameters;
    resolvedResponseData.answer = response.answer;



    if (resolvedResponseData.actionType === 'tableOP') {
        await render.ejs(path.resolve(__dirname,'../ejsTemplates/testejs.ejs'), { results: ['test1','test2'] })
            .then(function (html) {
                resolvedResponseData.newTable = html;
                console.log('2 ', resolvedResponseData);
                // return resolvedResponseData;
            })
            .catch(function (err) {
                throw err;
            });
        // renderEjs('testejs').then((html) => {
        //     console.log("1");
        //     console.log(html);
        //     resolvedResponseData.newTable = html;
        //     return resolvedResponseData;
        // });
    }
    return resolvedResponseData;
    // Render ejs templates in case of applicable action type
    // switch (resolvedResponseData.actionType) {
    //
    //     case 'tableOP':
    //         renderEjs('testejs').then((html) => {
    //             console.log("1");
    //             console.log(html);
    //             resolvedResponseData.newTable = html;
    //             return resolvedResponseData;
    //         });
    //         break;
    //
    //     case 'graphOP':
    //         render.ejs(path.resolve(__dirname,'../ejsTemplates/graphTemplate.ejs'), { results: '' }, function(err, html){
    //             if (err) throw err;
    //             resolvedResponseData.newVisualization = html;
    //             return resolvedResponseData;
    //         });
    //         break;
    //
    //     default:
    //         return resolvedResponseData;
    // }


}




module.exports.resolve = handleDialogflowResponse;