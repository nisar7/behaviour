module.exports.CHECK_REQUEST_PARAMS = (received, required) => {
  let all_ok = true;
  let missing = "";

  for (let item of required) {
    if (!(item in received)) {
      all_ok = false;
      missing = item;
    }
  }

  return {
    all_ok,
    missing,
  };
};

module.exports.RENDER_BAD_REQUEST = (res, error) => {
  // console.log(error);
  if (error.message) {
    res.status(400).json({
      message: error.message,
    });
    throw new Error("Error in system", error);
  } else {
    res.status(400).send(error);
    // throw new Error("Error in system", error);
  }
};
