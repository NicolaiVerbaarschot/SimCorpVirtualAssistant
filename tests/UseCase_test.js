
Feature('UseCase');

/*
What can you do
Show all
graph price
How to invest
Search for dkk
group by type
sort by dirty value qc
 */

Scenario('What can you do', (I) => {
    I.reloadPage();
    I.askBot('what can you do');
    I.getAnswer("Virtual Assistant");
    I.askBot('show all');
    I.see('SUQJ');


});

Scenario('how to invest', (I) => {
    I.reloadPage();
    I.askBot("how to invest");
    I.getAnswer('investment');
});

Scenario('table operations', (I) => {
    I.reloadPage();
    I.askBot('search for dkk');
    I.see('DKK');
    I.askBot('group by type');
    I.askBot('sort by dirty value qc');
    I.saveScreenshot('result.png')
});