const { behaveModel } = require("../../models/Behave");
const mongoose = require("mongoose");

const behaveDataObject = {
  name: "unitTest",
  points: 10,
};

beforeAll(() => {
  mongoose.connect("mongodb://localhost:27017/" + "behaviour", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("Add Behave Model", () => {
  it("create & save behave successfully", async () => {
    const behaveData = new behaveModel(behaveDataObject);
    const savedBehaveData = await behaveData.save();
    expect(savedBehaveData._id).toBeDefined();
    expect(savedBehaveData.name).toBe(behaveDataObject.name);
    expect(savedBehaveData.points).toBe(behaveDataObject.points);
  });

  it("create & save behave successfully", async () => {
    const behaveData = new behaveModel({ name: "TekLoon" });

    let err;
    try {
      const savedBehaveData = await behaveData.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.points).toBeDefined();
  });
});
