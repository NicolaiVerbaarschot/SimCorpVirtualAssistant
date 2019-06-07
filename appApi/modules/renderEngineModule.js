const render = require('consolidate');
const path = require('path');

async function renderEjs(templateName, parameters) {
    try {
        return await render.ejs(path.resolve(__dirname,'../ejsTemplates/'+templateName+'.ejs'), { results: parameters });
    } catch (e) {
        throw e;
    }
}

module.exports.render = renderEjs;