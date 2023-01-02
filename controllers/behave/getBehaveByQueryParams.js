const {
  RENDER_BAD_REQUEST,
  GET_SUCCESS_RESPONSE,
  GET_ERROR_RESPONSE,
} = require("../common/utils");

const _ = require("lodash");

const moment = require("moment");

const { behaveModel } = require("../../models/Behave");
const { default: mongoose } = require("mongoose");

const getBehaveByQuery = async (req, res) => {
  const durataionArr = ["TODAY", "WEEK", "MONTH"];

  const { duration, page, pageSize } = req.query;

  const pageNum = page ? parseInt(req.query.page) : 0;
  const pageSizeNum = pageSize ? parseInt(req.query.pageSize) : 0;

  if (!durataionArr.includes(duration)) {
    res.status(404).send({
      status: "error",
      message: "VALID PARMS ARE : TODAY, WEEK, MONTH",
    });
    return;
  }
  try {
    if (duration === "TODAY") {
      const currentDate = moment(moment().format("YYYYMMDD")).toISOString();

      const behaveList = await behaveModel
        .find({
          createdAt: { $gte: currentDate },
        })
        .limit(pageSizeNum)
        .skip(pageSizeNum * pageNum);
      res.status(200).send({
        status: "success",
        data: behaveList,
      });
      return;
    }
    if (duration === "WEEK") {
      const weekAgo = moment().subtract(7, "days").toISOString();
      const behaveList = await behaveModel
        .find({
          createdAt: { $gte: weekAgo },
        })
        .limit(pageSizeNum)
        .skip(pageSizeNum * pageNum);
      res.status(200).send({
        status: "success",
        data: behaveList,
      });
      return;
    }
    if (duration === "MONTH") {
      const monthAgo = moment().subtract(30, "days").toISOString();
      const behaveList = await behaveModel
        .find({
          createdAt: { $gte: monthAgo },
        })
        .limit(pageSizeNum)
        .skip(pageSizeNum * pageNum);

      res.status(200).send({
        status: "success",
        data: behaveList,
      });

      return;
    }
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
    // return;
  }
};

module.exports = getBehaveByQuery;
