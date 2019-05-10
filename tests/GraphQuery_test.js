
Feature('GraphQuery');

Scenario('Get graph query using direct query',(I)=>{
    I.amOnPage('http://localhost:8080/');
    I.see('Graph Query');
    I.fillField('#queryTextForGraph','  '); //TODO insert something here
    I.click("#VisualizeButton");
    //I.see("SYMBOL");
});