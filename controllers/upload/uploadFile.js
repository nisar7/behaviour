/* eslint-disable security/detect-object-injection */
const { mongoose } = require("mongoose");

const crypto = require("crypto");

const moment = require("moment");

const fs = require("fs");

const path = require("path");

const {
  RENDER_BAD_REQUEST,
  GET_ERROR_RESPONSE,
  GET_SUCCESS_RESPONSE,
} = require("../common/utils");

const uploadApk = async (req, res) => {
  try {
    if (!req.files.name) {
      return GET_ERROR_RESPONSE(res, 400, {
        message: "Unable to upload file",
      });
    }

    const fileName = req.files.name;

    const ext = fileName.mimetype.split("/");

    const uplaodPathOfFile = `${path.join(__dirname, "/upload")}/${
      fileName.md5
    }.${ext[1]}`;

    try {
      await fileName.mv(uplaodPathOfFile);
    } catch (e) {
      return res.status(500).send({
        status: "error",
        message: "Unable to upload file",
      });
    }

    return res.status(200).send({
      status: "success",
      data: `${process.env.BASE_URL}/upload?md5=${fileName.md5}&mime=${ext[1]}`,
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      message: "Something Went Wrong",
    });
  }

  return 0;
};

module.exports = uploadApk;
