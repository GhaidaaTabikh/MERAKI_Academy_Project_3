//Starting step MongoDB

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String , unique : true },
  age: { type: Number },
  country: { type: String },
  email: { type: String , unique : true },
  password: { type: String },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String , unique : true},
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const users = mongoose.model("users",usersSchema)
const articles = mongoose.model("articles",articlesSchema)


module.exports.users = users;
module.exports.articles = articles;