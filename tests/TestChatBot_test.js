
Feature('TestChatBot');

Scenario('what you can do', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.askBot('what can you do?');
    I.wait(2);
    I.getAnswer("Virtual Assistant");
});
