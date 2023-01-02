require("dotenv").config();
const { behaveModel } = require("../../models/Behave");
const mongoose = require("mongoose");

beforeAll(() => {
  mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_NAME, {
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
