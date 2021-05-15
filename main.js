const express = require("express");
const app = express();
app.use(express.json());

const { uuid } = require("uuidv4");
console.log(uuid());

const port = 5000;

const articlesRouter = express.Router();

// getAllArticles ticket
const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

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

app.use("/articles", articlesRouter);

app.listen(port, () => {
  console.log("hi in project 3");
});
