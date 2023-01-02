const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");

const BehaveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    required: true,
  },
});

BehaveSchema.plugin(timestamps);

BehaveSchema.methods.toJSON = function () {
  const BehaveSchema = this;
  const BehaveSchemaObject = BehaveSchema.toObject();
  const BehaveSchemaJson = _.pick(BehaveSchemaObject, [
    "name",
    "points",
    "_id",
  ]);
  return BehaveSchemaJson;
};

const behaveModel = mongoose.model("behave", BehaveSchema);
module.exports = { behaveModel };
