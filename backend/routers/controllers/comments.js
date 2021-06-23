// const commentsModel = require('./../../db/models/comments');
const db=require("./../../db/db")

const createNewComment = (req, res) => {
	const { comment, commenter } = req.body;
	const article_id = req.params.id

	const command = `INSERT INTO comments (comment,article_id ,commenter_id) VALUES (?,?,?)`
const arr =[comment,article_id,commenter]
db.query(command,arr,(err,result)=>{
	if (err) throw err
	res.status(201).json(result)
})

	// const newComment = new commentsModel({
	// 	comment,
	// 	commenter,
	// });

	// newComment
	// 	.save()
	// 	.then((result) => {
	// 		res.status(201).json(result);
	// 	})
	// 	.catch((err) => {
	// 		res.send(err);
	// 	});
};

module.exports = {
	createNewComment,
};
