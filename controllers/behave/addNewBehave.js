const {
  RENDER_BAD_REQUEST,
  GET_SUCCESS_RESPONSE,
  GET_ERROR_RESPONSE,
  CHECK_REQUEST_PARAMS,
} = require("../common/utils");

const _ = require("lodash");

const { behaveModel } = require("../../models/Behave");

const addNewBehave = async (req, res) => {
  try {
    const body = _.pick(req.body, ["name", "points"]);

    const params_required = ["name", "points"];

    const req_check = CHECK_REQUEST_PARAMS(body, params_required);

    if (!req_check.all_ok) {
      return res.status(404).send({
        status: "error",
        message: "Invalid Params",
      });
    }

    const new_behave = new behaveModel({
      name: body.name,
      points: body.points,
    });

    const new_behve_object = await new_behave.save();

    if (!new_behave) {
      return res.status(500).send({
        status: "error",
        message: "Unable to Save data",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Record saves sucssefully",
      data: new_behve_object,
    });
  } catch (e) {
    console.log("error", e);
  }

  return 0;
};

module.exports = addNewBehave;
