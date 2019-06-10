
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
      askBot: function(query) {
          this.fillField('#input',query);
          this.pressKey('Enter');
          this.wait(2);
      },

      getAnswer: function(answer){
          this.see(answer);
      },

      reloadPage: function(){
          this.amOnPage('http://localhost:8080/');
      }
  });
}
