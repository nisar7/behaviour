const path = require("path");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const getFile = async (req, res) => {
  try {
    const { md5, mime } = req.query;

    if (!md5 || !mime) {
      res.status(400).send({
        status: "error",
        message: "Invalid Params",
      });
    }

    res.download(
      `${path.join(__dirname, "/upload")}/${md5}.png`,
      `file.png`,
      (err) => {
        console.log("error===", err);
      }
    );
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }

  return 0;
};

module.exports = getFile;
