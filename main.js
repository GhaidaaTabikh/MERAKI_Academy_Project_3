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

const getAllArticles = (req, res, next) => {
  res.status(200);
  res.json(articles);
  next();
};

articlesRouter.get("", getAllArticles);

//getArticlesByAuthor ticket

const getArticlesByAuthor = (req, res) => {
  res.json(
    articles.filter((element, index) => {
      const stayAuthor = req.query.author;
      return element.author.toLowerCase() === stayAuthor.toLowerCase();
    })
  );
  res.status(200);
};

articlesRouter.get("/search_1", getArticlesByAuthor);

// getAnArticleById ticket

const getAnArticleById = (req, res) => {
  res.json(
    articles.filter((element, index) => {
      const t = req.query.id;

      return element.id == t;
    })
  );
  res.status(200);
};

articlesRouter.get("/search_2", getAnArticleById);

//createNewArticle

const createNewArticle = (req, res) => {
  let newArticle = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: uuid(),
  };
  articles.push(newArticle);
  res.status = 201;
  res.json(newArticle);
};

articlesRouter.post("", createNewArticle);

//updateAnArticleById Ticket

const updateAnArticleById = (req, res) => {
  let i;
  a = articles.find((element, index) => {
    i = index;
    return element.id == req.params.id;
  });

  if (req.body.title && req.body.description && req.body.author) {
    console.log("gggggggg");
    let updateArticles = {
      id: a.id,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
    };
    console.log(updateArticles);
    articles.splice(i, 1, updateArticles);

    res.json(updateArticles);
  } else res.json("forget one of keys");

  res.status(200);
};

articlesRouter.put("/:id", updateAnArticleById);

//deleteArticleById

const deleteArticleById = (req, res) => {
  let i;
  articles.find((element, index) => {
    i = index;
    return element.id == req.params.id;
  });
  articles.splice(i, 1);
  res.json({
    success: true,
    massage: `Success Delete article with id =>${req.params.id}`,
  });
};

articlesRouter.delete("/:id", deleteArticleById);

// deleteArticlesByAuthor

const deleteArticlesByAuthor = (req, res) => {
  articles.forEach((element, index) => {
    if (element.author.toLowerCase() === req.body.author.toLowerCase()) {
      articles.splice(index, 1);
    }
  });
  res.json({
    success: true,
    massage: `Success Delete articles for the author=>${req.body.author}`,
  });
};

articlesRouter.delete("", deleteArticlesByAuthor);

app.use("/articles", articlesRouter);

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
const { users, articles } = require("./schema");


//Starting step MongoDB

app.get("/users", (req, res) => {
  articles
    .find({}, "name author")
    .populate("users", "firstName")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(port, () => {
  console.log("hi in project 3");
});
