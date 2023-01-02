const { behaveModel } = require("../../models/Behave");
const mongoose = require("mongoose");

beforeAll(() => {
  mongoose.connect("mongodb://localhost:27017/" + "behaviour", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("Behave Model", () => {
  it("should return all products", async () => {
    const res = await behaveModel.find();
    expect(res.length).toBeGreaterThan(0);
  });
});
