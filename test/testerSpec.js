var port = require("../config/index");
var Request = require("request");
//var app = require("../controllers/application");
var server;
beforeAll(() => {
    server = require("../index");

});
var data = {};
beforeAll((done) => {
    Request.get("http://localhost:4000/", (req, res, next) => {
            data.status = res.statusCode;
            data.next = next;
            done();
    });
});
// Test cases begin
describe("Website", function() {
    it("Correct port", function() {
        var portNum = 4000;
        expect(port.DEV_PORT).toBe(portNum)
    });
    it("Status 200 - Successful connection", function(){
        expect(data.status).toBe(200);
    });
});