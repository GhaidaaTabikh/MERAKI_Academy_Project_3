// const usersModel = require("./../../db/models/users");
const db = require("./../../db/db");

// const createNewAuthor = (req, res) => {
// 	const { firstName, lastName, age, country, email, password, role } = req.body;

// 	const user = new usersModel({
// 		firstName,
// 		lastName,
// 		age,
// 		country,
// 		email,
// 		password,
// 		role,
// 	});

// 	user
// 		.save()
// 		.then((result) => {
// 			res.status(201).json(result);
// 		})
// 		.catch((err) => {
// 			res.send(err);
// 		});
// };

const bcrypt = require("bcrypt");

const createNewAuthor = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;
  const command = `INSERT INTO users (firstName, lastName, age, country, email,password,  role_id) VALUES (?,?,?,?,?,?,?);`;
 
 
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("hashPassword",hashedPassword);
  
  const arr = [firstName, lastName, age, country, email, hashedPassword, role_id];
  db.query(command, arr, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = {
  createNewAuthor,
};
