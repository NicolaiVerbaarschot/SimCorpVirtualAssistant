
Feature('SearchFeature');

Scenario('Home View', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.see('Search');

});

Scenario('Hello Bot Responding', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.fillField('#input','hello');
    I.pressKey('Enter');
    I.wait(2);
    I.seeInField("#response","Bot:");
});

/*
Scenario('Ask KnowledgeBase',(I) => {
    I.amOnPage('http://localhost:8080/');
    I.fillField('#input','how do i invest');
    I.pressKey('Enter');
    I.wait(4);
    I.seeInField("#response","Bot:");
    I.see("how do i invest","#searchQuestion");
});*/

