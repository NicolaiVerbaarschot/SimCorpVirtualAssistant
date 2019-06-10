
Feature('SearchFeature');

Scenario('Home View', (I) => {
    I.reloadPage()
    I.see('Search');

});

Scenario('Hello Bot Responding', (I) => {
    I.reloadPage();
    I.askBot('hello');
    I.getAnswer('!');
});


Scenario('Ask KnowledgeBase',(I) => {
    I.reloadPage();
    I.askBot('? how do i invest in stocks');
    I.getAnswer('investment');
    I.save('how_do_i_invest_in_stocks.png');
});

