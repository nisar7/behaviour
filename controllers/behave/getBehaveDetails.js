const {
  RENDER_BAD_REQUEST,
  GET_SUCCESS_RESPONSE,
  GET_ERROR_RESPONSE,
} = require("../common/utils");

const _ = require("lodash");

const { behaveModel } = require("../../models/Behave");
const { default: mongoose } = require("mongoose");

const addNewBehave = async (req, res) => {
  try {
    const behaveId = req.params.behaveId;

    if (!behaveId) {
      return res.status(404).send({
        status: "error",
        message: "Invalid Params",
      });
    }

    const behave_object = await behaveModel.findById(
      mongoose.Types.ObjectId(behaveId)
    );

    return res.status(200).send({
      status: "success",
      message: "Record saves sucssefully",
      data: behave_object,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }

  return 0;
};

module.exports = addNewBehave;
