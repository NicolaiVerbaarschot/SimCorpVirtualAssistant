
Feature('TableQuery');

Scenario('test something', (I) => {

});

Scenario('query',(I)=>{
    I.amOnPage('http://localhost:8080/');
    I.see('Table Query');
    I.click("#HButton");
    I.see("SYMBOL");
});