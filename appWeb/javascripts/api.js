$.getScript('javascripts/botQueryController.js', function() {
});

const api = {

    submitBotQuery: async function (query, topQueryObject, secondTopMostQueryObject) {
        var returnData;
        await $.ajax({
            type: 'GET',
            dataType: 'json',
            data: {
                query: query,
                topQueryObject: topQueryObject,
                secondTopMostQueryObject: secondTopMostQueryObject
                },
            url: "http://localhost:8080/api/chatBotQueryManager/"
        })
            .done(function (data) {
                returnData = data
                console.log(data)
            });
        return returnData;
    }

};

