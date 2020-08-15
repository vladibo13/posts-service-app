require("dotenv").config();
const mongoose = require("mongoose");

// process.env.DB_URL_LOCAL,
// process.env.DB_URL,

module.exports = async () => {
  console.log(process.env.DB_URL);
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
      (e, conn) => {
        if (e) console.log(e);
        console.log("connected to DB");
      }
    );
  } catch (e) {
    console.log(e);
  }
};
