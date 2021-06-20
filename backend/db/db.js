require('dotenv').config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id: " + connection.threadId);
});

module.exports = connection;

// const mongoose = require('mongoose');

// const options = {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false,
// };

// // connecting mongoose
// mongoose.connect(process.env.DB_URI, options).then(
// 	() => {
// 		console.log('DB Ready To Use');
// 	},
// 	(err) => {
// 		console.log(err);
// 	},
// );
