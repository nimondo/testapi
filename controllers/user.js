const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "User created successfully !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};
exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Invalid password",
            });
          }
          res.status(200).json({
            userId: user._id,
            role: user.role,
            email: user.email,
            token: jwt.sign(
              {
                userId: user._id,
                role: user.role,
                email: user.email,
              },
              process.env.TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};
