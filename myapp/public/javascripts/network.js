// var accessToken = "fe3ac7ce30b340d1b6802eb18de04809";
// var baseUrl = "https://api.api.ai/v1/";

// //var network = new Network(successHandler, errorHandler);

// function Network(successHandler, errorHandler, chainSuccessHandler) {
//     this.successHandler = successHandler; 
//     this.errorHandler = errorHandler;
// }

// Network.prototype.send = function(value) {
//     $.ajax({
//         type: "POST",
//         url: baseUrl + "query?v=20150910",
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         headers: {
//             "Authorization": "Bearer " + accessToken
//         },
//         data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),

//         success: this.successHandler,
//         error: this.errorHandler
//     });
// }

// Network.prototype.sendChain = function(value) {
//     $.ajax({
//         type: "POST",
//         url: baseUrl + "query?v=20150910",
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         headers: {
//             "Authorization": "Bearer " + accessToken
//         },
//         data: JSON.stringify({ query: value, lang: "en", sessionId: "somerandomthing" }),

//         success: this.chainSuccessHandler,
//         error: this.errorHandler
//     });
// }
