'use strict';
var GmailClient = {
    globalVar : "aaaa",
}

GmailClient.fetchEmail = function(fetchEmail) {
    console.log('fetching email ' + this.globalVar);
}


module.exports = GmailClient;
