
Feature('SearchFeature');

Scenario('Home View', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.see('Search');

});

Scenario('Hello Bot', (I) => {
    I.amOnPage('http://localhost:8080/');
    I.fillField('#input','hello');
    I.pressKey('Enter');
    I.seeInField("#input","");
    I.wait(1);
    I.seeInField("#response","Bot:");
});

