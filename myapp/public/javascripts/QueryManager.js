function QueryManager() {}


QueryManager.prototype.manageInput = function(input) {

    var sendInChain = function(subqueries, currentIndex) {

        sendAsync(subqueries[currentIndex]).then((data) => {
            console.log(currentIndex)
            console.log(data)

            if (currentIndex == subqueries.length - 1) {
                // last elem
                console.log("updating UI")
            } else {
                // Recursive 
                something(subqueries, currentIndex + 1)
            }
        })
    }

    sendInChain(subqueries, 0);
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
