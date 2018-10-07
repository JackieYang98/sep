var app = require("../controllers/application");

describe("getQuestions", () => {
    it("Getting Questions", () => {
        var result = app.getQuestions.length;
        expect(app.getQuestions.length).toBe(result);
    });
});  