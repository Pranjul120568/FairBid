const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const connectDB = async () => {
  try {
    //   if (process.env.NODE_ENV === "test") {
    //     var dbName = "test";
    //   } else {
    var dbName = "Production";
    // }

    await mongoose.connect(
      "mongodb+srv://lakhan:lakhan@cluster0.7jfm9sx.mongodb.net/myFirstDatabase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        dbName,
      }
    );

    console.log(`MongoDB Connected to ${dbName} DB...`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
console.log(connectDB);
module.exports = connectDB;
