$.getScript('javascripts/botQueryController.js', function() {
});

const api = {

    submitBotQuery: async function (query, previousQueryObject) {
        var returnData;
        await $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {query: query, previousQueryObject: previousQueryObject},
            url: "http://localhost:8080/api/chatBotQueryManager/"
        })
            .done(function (data) {
                returnData = data
            });
        return returnData;
    }

};

