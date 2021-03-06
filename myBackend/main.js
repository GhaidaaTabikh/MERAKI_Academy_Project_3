const express = require("express");
const app = express();
app.use(express.json());

const { uuid } = require("uuidv4");
console.log(uuid());

const axios = require("axios");

const port = 5000;

const articlesRouter = express.Router();

// getAllArticles ticket
// const articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];

// const getAllArticles = (req, res, next) => {
//   res.status(200);
//   res.json(articles);
//   next();
// };

// articlesRouter.get("", getAllArticles);

//getArticlesByAuthor ticket

// const getArticlesByAuthor = (req, res) => {
//   res.json(
//     articles.filter((element, index) => {
//       const stayAuthor = req.query.author;
//       return element.author.toLowerCase() === stayAuthor.toLowerCase();
//     })
//   );
//   res.status(200);
// };

// articlesRouter.get("/search_1", getArticlesByAuthor);

// getAnArticleById ticket

// const getAnArticleById = (req, res) => {
//   res.json(
//     articles.filter((element, index) => {
//       const t = req.query.id;

//       return element.id == t;
//     })
//   );
//   res.status(200);
// };

// articlesRouter.get("/search_2", getAnArticleById);

//createNewArticle

// const createNewArticle = (req, res) => {
//   let newArticle = {
//     title: req.body.title,
//     description: req.body.description,
//     author: req.body.author,
//     id: uuid(),
//   };
//   articles.push(newArticle);
//   res.status = 201;
//   res.json(newArticle);
// };

// articlesRouter.post("", createNewArticle);

//updateAnArticleById Ticket

// const updateAnArticleById = (req, res) => {
//   let i;
//   a = articles.find((element, index) => {
//     i = index;
//     return element.id == req.params.id;
//   });

//   if (req.body.title && req.body.description && req.body.author) {
//     console.log("gggggggg");
//     let updateArticles = {
//       id: a.id,
//       title: req.body.title,
//       description: req.body.description,
//       author: req.body.author,
//     };
//     console.log(updateArticles);
//     articles.splice(i, 1, updateArticles);

//     res.json(updateArticles);
//   } else res.json("forget one of keys");

//   res.status(200);
// };

// articlesRouter.put("/:id", updateAnArticleById);

//deleteArticleById

// const deleteArticleById = (req, res) => {
//   let i;
//   articles.find((element, index) => {
//     i = index;
//     return element.id == req.params.id;
//   });
//   articles.splice(i, 1);
//   res.json({
//     success: true,
//     massage: `Success Delete article with id =>${req.params.id}`,
//   });
// };

// articlesRouter.delete("/:id", deleteArticleById);

// deleteArticlesByAuthor

// const deleteArticlesByAuthor = (req, res) => {
//   articles.forEach((element, index) => {
//     if (element.author.toLowerCase() === req.body.author.toLowerCase()) {
//       articles.splice(index, 1);
//     }
//   });
//   res.json({
//     success: true,
//     massage: `Success Delete articles for the author=>${req.body.author}`,
//   });
// };

// articlesRouter.delete("", deleteArticlesByAuthor);

// app.use("/articles", articlesRouter);

//News
// app.get("/news",(req,res)=>{
// // api key 246eb856f285429289af63c142eccab3
// axios.get(`https://newsapi.org/v2/everything?q="Rebecca Bellan"&apiKey=246eb856f285429289af63c142eccab3`)
// .then((response)=>{
// res.json(response)

// })
// .catch((err)=>{
//   throw err
// })
// })

//weather

//api key 23cbca9cd4acf2fd77772b3c01d3ff6f
// http://api.openweathermap.org/data/2.5/weather?q=London&appid=886705b4c1182eb1c69f28eb8c520e20

// axios.get(`api.openweathermap.org/data/2.5/weather?q=London&appid=23cbca9cd4acf2fd77772b3c01d3ff6f`)
// .then((response)=>{
//   console.log(response);
// res.json(response)

// })
// .catch((err)=>{
//   console.log("====================================");
//   throw err
// })

//part2
const db = require("./db");
const { users, articles, comments, roles } = require("./schema");

//Authentication
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//createNewAuthor [2]
const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password, roles } =
    req.body;
  const author = new users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    roles,
  });

  author
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/users", createNewAuthor);

//createNewArticle [2]

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;

  const newArticle = new articles({
    title,
    description,
    author,
  });

  newArticle
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/articles", createNewArticle);

//getAllArticles [2]

const getAllArticles = (req, res) => {
  articles
    .find({}, " title  description author")
    .then((result) => {
      res.send(result);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.get("/articles", getAllArticles);

//getArticlesByAuthor [2]

const getArticlesByAuthor = (req, res) => {
  articles
    .find({ author: req.query.author }, " title  description author")

    .then((result) => {
      res.send(result);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.get("/articles/search_1", getArticlesByAuthor);

//getAnArticleById [2]  Use Populate (so the author value will be his firstName not his ID)

const getAnArticleById = (req, res) => {
  _id = req.query._id;

  articles
    .find({ _id })
    .populate("author", "firstName")
    .exec()
    .then((result) => {
      res.json(result);
    });
};

app.get("/articles/search_2", getAnArticleById);

//5. updateAnArticleById [2]

const updateArticlesByAuthor = (req, res) => {
  articles.update(
    { _id: req.query._id },
    { description: req.body.description },
    () => {
      res.send("result");
      console.log("result");
    }
  );

  res.status(200);
};

app.put("/articles", updateArticlesByAuthor);

//6. deleteAnArticleById [2]

const deleteArticleById = async (req, res) => {
  await articles.deleteOne({ _id: req.query.articlesId });
  res.json("delete");
};

app.delete("/articles", deleteArticleById);

//7. deleteArticlesByAuthor [2]

const deleteArticlesByAuthor = async (req, res) => {
  await articles.deleteMany({ author: req.params.authorId });
  res.json("deleteAuthor");
};

app.delete("/articles/:authorId", deleteArticlesByAuthor);

// 2. login (Level 1)

// const login = (req, res) => {
//  const {email,password}=req.body

// users.findOne({email},"password")
// .then((result)=>{
// if  (result.password=== password ){res.status(200).json(" Valid login credentials")}
// else{res.status(200).json("in  Valid login credentials")}
// })
// .catch((err) => {
//         res.send(err);
//        });
//   };

// 2. login (Level 2)
//aaaaaaaaaaa
//ggg   12345678
let result1;
const secret = process.env.SECRET;

const login = (req, res) => {
  const reqEmail = req.body.email;

  users
    .findOne({ email: reqEmail.toLowerCase() })

    .then(async (result) => {
      result1 = result;
      if (result === null) {
        res.status(404);
        res.json({ message: "The email doesn't exist", status: 404 });
      } else {
        await bcrypt.compare(
          req.body.password,
          result.password,
          (err, result) => {
            if (err) {
              res.send(err);
            }
            if (result === false) {
              res.status(403);
              res.json({
                message: "The password you???ve entered is incorrect",
                status: 403,
              });
            }
            if (result === true) {
              res.status(200);
              const payload = {
                firstName: result1.firstName,
                userId: result1._id,
                country: result1.country,
                roles: result1.roles,
              };
              console.log(payload);
              const options = {
                expiresIn: "60m",
              };
              const token = jwt.sign(payload, secret, options);
              console.log(payload);
              res.json({ token: token });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/login", login);

//5. createNewComment [Level 3]

const authorization = (string) => {
  return (req, res, next) => {
    if (req.token) {
      roles
        .findOne({ _id: req.token.roles })

        // users
        // .find({})
        // .populate("roles", "permissions" )
        // .then(result){

        // }

        .then((result) => {
          result.permissions.include(string)
            ? next()
            : res.json({ message: "forbidden ", status: 403 });
        });
    } else {
      return "user not defined ";
    }
  };
};

//3. createNewComment

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.json("no token");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result) {
      req.token = result;

      next();
    }
  });
};

const createNewComment = (req, res) => {
  const { comment, commenter } = req.body;
  const newComment = new comments({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post(
  "/articles/:id/comments",
  authentication,
  authorization("CREATE_COMMENT"),
  createNewComment
);

//add comment to article

const addNewComment = (req, res) => {
  const { comment, commenter } = req.body;
  const newComment = new comments({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      articles
        .update({ _id: req.params.id }, { $push: { comments: result._id } })
        .exec();
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/articles/:id/addComments", addNewComment);

const addRoles = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roles({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/roles", addRoles);

app.listen(port, () => {
  console.log("hi in project 3");
});
