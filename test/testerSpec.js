var app = require("../controllers/application");
var userAuth = require("../models/authentication")

describe("getQuestions", () => { //TESTING THE TEST
    it("Getting Questions", () => {
         var result = app.getQuestions.length;
         expect(app.getQuestions.length).toBe(result);
        
    });
});  
describe("Login", () => {
    it("User Login", () =>{
        var username = bob;
        var password = password123
        
    });
});
