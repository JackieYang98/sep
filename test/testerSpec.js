describe("Website", function() {

    var app = require("../controllers/application");
    var loginInfo = require("../controllers/authentication");
    var userAuth = require("../routes/authentication");
    var loanApp = require("../routes/application");
    var port = require("../config/index");
    it("Correct port", () => {
        var portNum = 4000;
        expect(port.DEV_PORT).toBe(portNum)
    });
});