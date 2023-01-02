const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
// console.log("process.env.MONGODB_URI in mongoose", process.env.MONGODB_URI + process.env.MONGODB_NAME)

const db = mongoose.connection;

db.on("connecting", function () {
  console.log("connecting to MongoDB...");
});

db.on("error", function (error) {
  console.error(`Error in MongoDb connection: ${error}`);
  mongoose.disconnect();
});
db.on("connected", function () {
  console.log("MongoDB connected!");
});
db.once("open", function () {
  console.log("MongoDB connection opened!");
});
db.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});
db.on("disconnected", function () {
  console.log("MongoDB disconnected!");
  mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

mongoose.connect("mongodb://localhost:27017/" + "behaviour", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { mongoose };
