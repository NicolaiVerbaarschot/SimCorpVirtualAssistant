var assert = require('assert');

Feature("KnowledgeBase");

// Standard intents

Scenario('q1', async (I) => {
    I.reloadPage();
    I.askBot('Filter by price higher than 1000');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert(!(docSearchDivText.length > 0));
});

Scenario('q2', async (I) => {
    I.reloadPage();
    I.askBot('Hide date');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert(!(docSearchDivText.length > 0));
});

Scenario('q3', async (I) => {
    I.reloadPage();
    I.askBot('Filter');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert(!(docSearchDivText.length > 0));
});

Scenario('q4', async (I) => {
    I.reloadPage();
    I.askBot('Search for APPL');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert(!(docSearchDivText.length > 0));
});

Scenario('q5', async (I) => {
    I.reloadPage();
    I.askBot('What can you do?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert(!(docSearchDivText.length > 0));
});

// Questions with internal answers

Scenario('q6', async (I) => {
    I.reloadPage();
    I.askBot('Who is Vivan?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Vivan was the initial implementation of the chat bot');
});

Scenario('q7', async (I) => {
    I.reloadPage();
    I.askBot('What dependencies are required?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Vito depends on various third party products and frameworks. Without these dependencies, Vito ' +
        'would not be alive and kicing today! These dependecies, together with the function they serve, are briefly ' +
        'mentioned in the following sections. DialogFLow DialogFlow is a Google product used for creating chat bots. ' +
        'It is with DialogFLow, that Vito has been built and trained.');
});

Scenario('q8', async (I) => {
    I.reloadPage();
    I.askBot('How does the document search work?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('It is possible to search Vitos documentation pages via the assistant. Search strings are ' +
        'matched to either document titles, headers, or body content; Each with respective weights, and the results are ' +
        'displayed on the homepage.');
});

Scenario('q9', async (I) => {
    I.reloadPage();
    I.askBot('Which grid operations are supported?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Symbol is an ID for each asset. For example APPL is the symbol of Apple.');
});

Scenario('q10', async (I) => {
    I.reloadPage();
    I.askBot('What is Price?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Price shows the price of a single asset');
});

// Questions with external answers

Scenario('q11', async (I) => {
    I.reloadPage();
    I.askBot('What is investing?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Investing is really about');
});

Scenario('q12', async (I) => {
    I.reloadPage();
    I.askBot('What is an investing vehicle?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('There are many different ways you can go about investing');
});

Scenario('q13', async (I) => {
    I.reloadPage();
    I.askBot('How much does a 25 year-old have to put aside each month to become a millionaire?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('A 25-year-old who wishes to accumulate $1 million by age 60 would need to invest $880.21 each ' +
        'month assuming a constant return of 5%.');
});

Scenario('q14', async (I) => {
    I.reloadPage();
    I.askBot('Why should I have invested in Apple?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('An investment of $10,000 in the stock of Apple (AAPL) that was made on December 31, 1980 would ' +
        'have grown to $2,709,248');
});

Scenario('q15', async (I) => {
    I.reloadPage();
    I.askBot('What is compound interest?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    I.getAnswer('Now that you have a general idea of what investing is and why you should do it, it\'s time to ' +
        'learn about how investing lets you take advantage of one of the miracles of mathematics: compound interest.');

});

// Questions with no answers

Scenario('q16', async (I) => {
    I.reloadPage();
    I.askBot('What\'s the fastest way to university?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
});

Scenario('q17', async (I) => {
    I.reloadPage();
    I.askBot('Is it going to rain tomorrow?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
});

Scenario('q18', async (I) => {
    I.reloadPage();
    I.askBot('What is it like to work for Apple?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
});

Scenario('q19', async (I) => {
    I.reloadPage();
    I.askBot('Steve Jobs or Bill Gates?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
});

Scenario('q20', async (I) => {
    I.reloadPage();
    I.askBot('What\'s Warren Buffett\'s hair colour?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
});