// const { db } = require('./../../db/models/users');
// const usersModel = require('./../../db/models/users');
const db = require("./../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// authenticateBasic = async () =>{
// 	try {
// 		const {email, password}=req.body
// 	 }
// 	catch (error) {
// 		throw new Error(error.message);}}

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);

  command = `SELECT * FROM users WHERE email= ? ;`;
  const arr = [email];
  console.log("arr", arr);

  db.query(command, arr, async (err, result) => {
    if (err) throw err;
	console.log("result",result);
	console.log(result==[]);
    if (result.length===0) {
      res.status(404);
      res.json("The email doesn't exist");
    } else {
		console.log("password",result.password);
      const valid = await bcrypt.compare(password, result.password);
      if (valid) {
        const payload = {
          userId: result.id,
          country: result.country,
          role: result.role_id,
        };

        const options = {
          expiresIn: "60m",
        };
       const token = jwt.sign(payload, process.env.SECRET, options)
	   console.log({token});
	   res.json({token})
      } else {
        res.status(403);
        res.json("The password you’ve entered is incorrect");
      }
    }
  });
};

// usersModel
// 	.authenticateBasic(email, password)
// 	.then((result) => {
// 		if (result[1] === 200)
// 			return res.status(result[1]).json({ token: result[0] });

// 		res.status(result[1]).json(result[0]);
// 	})
// 	.catch((err) => {
// 		res.send(err);
// 	});

module.exports = {
  login,
};
