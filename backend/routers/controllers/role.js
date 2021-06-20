// const { db } = require('./../../db/models/db');
const db = require("./../../db/db")
// const roleModel = require('./../../db/models/role');


// const createNewRole = (req, res) => {
// 	const { role, permissions } = req.body;

// 	const newRole = new roleModel({
// 		role,
// 		permissions,
// 	});

// 	newRole
// 		.save()
// 		.then((result) => {
// 			res.status(201).json(result);
// 		})
// 		.catch((err) => {
// 			res.send(err);
// 		});
// };

const createNewRole = (req, res) =>{
 const command = `INSERT INTO roles (role) VALUES (?);`
 const arr = [req.body.role]
 console.log("============",arr);
 db.query(command,arr,(err,result)=>{
	 if (err) throw err
	 res.json(result)
 })

}

module.exports = {
	createNewRole,
};
