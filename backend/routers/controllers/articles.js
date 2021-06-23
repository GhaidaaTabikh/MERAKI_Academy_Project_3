// const articlesModel = require('./../../db/models/articles');
const db = require("./../../db/db");

const getAllArticles = (req, res) => {
  const command = `SELECT * FROM articles WHERE is_deleted=0`;
  db.query(command, (err, result) => {
    if (err) res.send(err);
    res.status(200).json(result);
  });

  // articlesModel
  // 	.find({})
  // 	.then((result) => {
  // 		res.status(200).json(result);
  // 	})
  // 	.catch((err) => {
  // 		res.send(err);
  // 	});
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author_id;

  const command = `SELECT * FROM articles WHERE author_id = ? AND  is_deleted=0 `;
  const arr = [author];
  db.query(command, arr, (err, result) => {
    if (err) res.send(err);
    if (result.length === 0) {
      return res.json("not found");
    }
    res.status(200).json(result);
  });

  // if (!author) return res.status(404).json('not found');

  // articlesModel
  // 	.find({ author })
  // 	.then((result) => {
  // 		res.status(200).json(result);
  // 	})
  // 	.catch((err) => {
  // 		res.send(err);
  // 	});
};

const getAnArticleById = (req, res) => {
  const id = req.params.id;

  const command= `SELECT articles.*  , users.firstName FROM articles
   INNER JOIN users ON articles.author_id = users.id WHERE  articles.id = ?`
  const arr=[id]
  db.query(command,arr,(err,result)=>{
	if (err) res.send(err);
	res.status(200).json(result);
  })

//   if (!_id) return res.status(404).json("not found");

//   articlesModel
//     .findOne({ _id })
//     .populate("author", "firstName -_id")
//     .exec()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
};

const createNewArticle = (req, res) => {
  const { title, description, author_id } = req.body;

  const command = `INSERT INTO articles (title, description, author_id) VALUES (?, ?, ?)`;
  const arr = [title, description, author_id];

  db.query(command, arr, (err, result) => {
    if (err) res.send(err);
    res.status(201).json(result);
  });

  // const article = new articlesModel({
  // 	title,
  // 	description,
  // 	author,
  // });

  // article
  // 	.save()
  // 	.then((result) => {

  // 		res.status(201).json(result);

  // 	})
  // 	.catch((err) => {

  // 		res.send(err);

  // 	});
};

const updateAnArticleById = (req, res) => {
  const { title, description, author_id } = req.body;
  const id = req.params.id;

  const command = `UPDATE articles
SET title = ?, description = ?,author_id=?
WHERE id = ?;`;

  const arr = [title, description, author_id, id];
  db.query(command, arr, (err, result) => {
    if (err) res.send(err);
    res.status(201).json(result);
  });

  // articlesModel
  // 	.findByIdAndUpdate(id, req.body, { new: true })
  // 	.then((result) => {
  // 		res.status(200).json(result);
  // 	})
  // 	.catch((err) => {
  // 		res.send(err);
  // 	});
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const command = `DELETE FROM articles WHERE id= ?`;
  const arr = [id];
  db.query(command, arr, (err, result) => {
    if (err) res.send(err);
    res.status(201).json(result);
  });
  // articlesModel
  // 	.findByIdAndDelete(id)
  // 	.then((result) => {
  // 		res.status(200).json({
  // 			success: true,
  // 			message: `Success Delete atricle with id => ${id}`,
  // 		});
  // 	})
  // 	.catch((err) => {
  // 		res.send(err);
  // 	});
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  // const command =`​
  // SELECT users.id ,users.firstName
  // FROM users
  // INNER JOIN articles ON users.id=articles.author_id;`
  const query = `SELECT articles.*  , users.firstName FROM articles 
  INNER JOIN users ON articles.author_id = users.id WHERE  users.firstName = ?;`;
  const arr = [author];

  db.query(query, arr, (err, result) => {
    console.log(result);
    if (err) res.send(err);
    res.status(201).json(result);
    command = `DELETE FROM articles WHERE id= ?`;
    const arr = [result[0].id];
    db.query(command, arr, (err, result) => {
      if (err) res.send(err);
    });
  });

  // articlesModel
  // 	.deleteMany({ author })
  // 	.then((result) => {
  // 		res.status(200).json({
  // 			success: true,
  // 			message: `Success Delete atricle with id => ${author}`,
  // 		});
  // 	})
  // 	.catch((err) => {
  // 		res.send(err);
  // 	});
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
