
Feature('TestChatBot');

Scenario('test something', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.fillField('#input','what can you do?');
    I.pressKey('Enter');
    I.seeInField("#input","");
    I.wait(2);
    I.seeInField("#response","Virtual Assistant");
});
