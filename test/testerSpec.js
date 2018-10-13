var port = require("../config/index");
var Request = require("request");
var app = require("../controllers");
var auth = require("../controllers/authentication");
var index = require("../controllers/index");
var routee = require("../routes/authentication");
var server;
beforeAll(() => {
    server = require("../index");

});

// Test cases begin
describe("Website Connectivity", function() {
    var data = {};
    beforeAll((test) => {
        Request.get("http://localhost:8080/", (req, res, next) => {
            data.status = res.statusCode;
            data.next = next;
            test();
        });
    });
    it("Correct port", function() {
        var portNum = 8080;
        expect(port.DEV_PORT).toBe(portNum)
    });
    it("Status 200 - Successful connection", function(){
        expect(data.status).toBe(200);
    });

});
// describe("Login Functionality", function() {   
//     var data2 = {};
//     beforeAll((test2) => {
//         Request.get("http://localhost:4000/authentication/login", (req, res, next) => {
//                 data2.body = res.body;
//                 data2.next = next;
//                 test2();
//         });
//     });
//     it("Get email", function() {
//         expect(data2.body).toContain("admin@student.uts.edu.au");
//     });
// });