const { behaveModel } = require("../../models/Behave");
const mongoose = require("mongoose");


beforeAll(() => {
  mongoose.connect("mongodb://localhost:27017/" + "behaviour", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("Delete Model", () => {
  it("delete Behave", async () => {
    const behaveData = new behaveModel();
    const deleteBehave = await behaveData.remove({ name: "unitTest" });
    expect(deleteBehave._id).toBeDefined();
  });
});
