var request = require('request');

var exotel = {

    postUrl: "https://teamosc:e824ca5c3e6ad677616999faee276298c4af4fdd@twilix.exotel.in/v1/Accounts/teamosc/Calls/connect",
    postUrlSms: "https://teamosc:e824ca5c3e6ad677616999faee276298c4af4fdd@twilix.exotel.in/v1/Accounts/teamosc/Sms/send"
};

exotel.makeCall = function (mobileNumber) {

    request.post(
        this.postUrl,
        {
            form: {
                From: mobileNumber,
                CallerId: "01139595719",
                CallType: "trans",
                Url: "http://my.exotel.in/exoml/start/60071"
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

};

exotel.sendSms = function (mobileNumber, body) {

    request.post(
        this.postUrlSms,
        {
            form: {
                From: "09243422233",
                To: mobileNumber,
                Body: body
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

};

module.exports = exotel;