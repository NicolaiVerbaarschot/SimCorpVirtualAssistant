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
    assert((docSearchDivText.indexOf('Vivan was the initial ')>=0));
});

Scenario('q7', async (I) => {
    I.reloadPage();
    I.askBot('What dependencies are required?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('DialogFlow is a Google product used for creating chat bots')>=0));
});

Scenario('q8', async (I) => {
    I.reloadPage();
    I.askBot('How does the document search work?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('search Vitos documentation pages via the assistant')>=0));
});

Scenario('q9', async (I) => {
    I.reloadPage();
    I.askBot('Which grid operations are supported?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('Sorting Grouping Showing/hiding columns Reversing the table')>=0));
});

Scenario('q10', async (I) => {
    I.reloadPage();
    I.askBot('What is Price?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('Price shows the price of a single asset')>=0));
});

// Questions with external answers

Scenario('q11', async (I) => {
    I.reloadPage();
    I.askBot('What is investing?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('Investing is really about')>=0));
});

Scenario('q12', async (I) => {
    I.reloadPage();
    I.askBot('What is an investing vehicle?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('different ways you can go about investing')>=0));
});

Scenario('q13', async (I) => {
    I.reloadPage();
    I.askBot('How much does a 25 year-old have to put aside each month to become a millionaire?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('need to invest $880.21 each ')>=0));
});

Scenario('q14', async (I) => {
    I.reloadPage();
    I.askBot('Why should I have invested in Apple?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('grown to $2,709,248')>=0));
});

Scenario('q15', async (I) => {
    I.reloadPage();
    I.askBot('What is compound interest?');
    let docSearchDivText = await I.grabTextFrom('#fuseContainer');
    assert((docSearchDivText.length > 0));
    assert((docSearchDivText.indexOf('miracles of mathematics: compound interest')>=0));
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