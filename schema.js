//Starting step MongoDB

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String , unique : true },
  age: { type: Number },
  country: { type: String },
  email: { type: String , unique : true , required :true },
  password: { type: String , required :true },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String , unique : true},
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comments: [ {type: mongoose.Schema.Types.ObjectId , ref :"comments"} ] 

});

//8. Comments Starting Steps (MongoDB)[2]

const commentsSchema = new mongoose.Schema({
  comment: { type: String },
commenter: { type: mongoose.Schema.Types.ObjectId ,ref :"users"}
})



const users = mongoose.model("users",usersSchema)
const articles = mongoose.model("articles",articlesSchema)
const comments  = mongoose.model("comments",commentsSchema)



module.exports.users = users;
module.exports.articles = articles;
module.exports.comments = comments
