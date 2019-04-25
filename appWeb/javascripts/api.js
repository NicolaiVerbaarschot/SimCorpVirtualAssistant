$.getScript('javascripts/botQueryController.js', function() {
});

const api = {

    submitBotQuery: async function (query) {
        var returnData;
        await $.ajax({
            url: "http://localhost:8080/api/chatBotQueryManager/"+query
        })
            .done(function( data ) {
                returnData = data
            });
        return returnData;
    }

};

