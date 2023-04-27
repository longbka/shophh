require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const handleLoginForm = (req, res) => {
  res.render("loginForm.ejs");
};
const handleCheckLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  await db.User.findOne({ where: { email: email, password: password } })
    .then((data) => {
      if (data) {
        let token = jwt.sign({ id: data.id }, process.env.JWT_PRIVATE_KEY);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
        return res.redirect("/home");
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      res.status(500).json("loi sever");
    });
};
const handleUsersPage = async (req, res, next) => {
  let page = req.query.page;
  let pageSize = req.query.page_size;
  if (page && pageSize) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    var skip = (page - 1) * pageSize;
    await db.User.findAll({
      offset: skip,
      limit: pageSize,
      include: { model: db.Group },
      nest: true,
    })
      .then(async (data) => {
        await db.User.count()
          .then((usersCount) => {
            res.json({ total: usersCount, data: data });
          })
          .catch((err) => {
            res.status(500).json("loi server");
          });
      })
      .catch((err) => {
        res.status(500).json("loi server");
      });
  } else {
    await db.User.findAll({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("loi server");
      });
  }
};
module.exports = { handleLoginForm, handleCheckLogin, handleUsersPage };
