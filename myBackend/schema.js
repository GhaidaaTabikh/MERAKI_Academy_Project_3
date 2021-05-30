//Starting step MongoDB
const bcrypt = require("bcrypt");



const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String, unique: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles :{type: mongoose.Schema.Types.ObjectId,ref:"roles"}
});







const articlesSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

//8. Comments Starting Steps (MongoDB)[2]

const commentsSchema = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

usersSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

//Create roles schema

rolesSchema = new mongoose.Schema({
  role :{type: String },
  permissions :[{type:String}]
})

const users = mongoose.model("users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comments", commentsSchema);
const roles = mongoose.model("roles",rolesSchema)

module.exports.users = users;
module.exports.articles = articles;
module.exports.comments = comments;
module.exports.roles = roles;
