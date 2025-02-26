// const bcrypt = require("bcryptjs");

// const Users = require("../users/users-model.js");
const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "Ran into an unexpected error" });
//       });
//   } else {
//     res.status(400).json({ message: "No credentials provided" });
//   }
// };
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
    jwt.verify(authorization, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({ message: "You shall not pass!" });
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again." });
  }
};
