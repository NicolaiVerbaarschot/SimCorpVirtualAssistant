function QueryManager() {

    var errorHandler = function() {
        console.log("network error happened");
    }

    var successHandler = function(data) {
        return data;
    }

    this.network = Network(successHandler, errorHandler);
}

QueryManager.prototype.manageInput = function(input) {
    
    // Split input based on 'and'. 
    //If no 'and' is detected, 'subqueries will be [input]
    var subqueries = input.split("and");

    // send each query to DF as a promise
    for (var i = 0; i < subqueries.length; i++) {
        
        
        
        // check if last element
        if (i == subqueries.length - 1) {
            // last query found. Update successhandler to include UI update
            network.successHandler = function(data) {
                console.log("this was the last element")
            }
            network.send(subqueries[i])
            
        } else {
            network.send(subqueries[i])
            
        }
    }
}