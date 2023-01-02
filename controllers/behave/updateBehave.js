const {
  RENDER_BAD_REQUEST,
  GET_SUCCESS_RESPONSE,
  GET_ERROR_RESPONSE,
} = require("../common/utils");

const _ = require("lodash");

const moment = require("moment");

const { behaveModel } = require("../../models/Behave");
const { mongoose } = require("mongoose");

const updateBehave = async (req, res) => {
  const { behaveId } = req.params;

  const body = _.pick(req.body, ["name", "points"]);

  if (!body) {
    return res.status(404).send({
      status: "error",
      message: "Invalid Params",
    });
  }

  if (!behaveId) {
    return res.status(404).send({
      status: "error",
      message: "Invalid Params",
    });
  }
  try {
    for (const key in body) {

      await behaveModel.updateOne(
        { _id: mongoose.Types.ObjectId(behaveId) },
        { [key]: body[key] }
      );
    }

    return res.status(200).send({
      status: "success",
      message: "Record Updated Successfully",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }

  return 0;
};

module.exports = updateBehave;
