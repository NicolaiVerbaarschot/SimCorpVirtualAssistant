function QueryManager() {

    var errorHandler = function() {
        console.log("network error happened");
    }

    var successHandler = function(data) {
        console.log("this is a normal success");
    }

    this.network = Network(successHandler, errorHandler);
}

QueryManager.prototype.manageInput = function(input) {
    
    // Split input based on 'and'. 
    //If no 'and' is detected, 'subqueries' will be [input]
    var subqueries = input.split("and");

    // send each query to DF as a promise
    subqueries.forEach(subquery => {
        sendAsync(subquery).then( (data) => {
            console.log(data);
        });
    });
}

let sendAsync = async function(value) {
    let result; 
    try {
        result = await $.ajax({
            type: "POST",
            url: baseUrl + "query?v=20150910",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),
        });

        return result;

    } catch (error) {
        console.log(error)
    }
}
