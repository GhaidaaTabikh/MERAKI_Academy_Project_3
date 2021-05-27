//Starting step MongoDB

const mongoose = require("mongoose");
require("dotenv").config()


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const mongoDp= process.env.DB_URI

mongoose.connect(mongoDp, options).then(
  () => {
    console.log("project_3_v01 Ready To Use");
  },
  (err) => {
     console.log(err);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
  }
);

