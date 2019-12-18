const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole("instructor"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole(role) {
  return function(req, res, next) {
    if (req.token && role === req.token.role) {
      // req.token.role exists because the middleware for this came AFTER the restricted middleware did, which set it
      next();
    } else {
      res
        .status(403)
        .json({ message: `You are forbidden! You must be an ${role}.` });
    }
  };
}
// this didn't work initially because it was added later and I needed to update the token.
module.exports = router;
