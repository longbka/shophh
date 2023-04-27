require("dotenv").config();
const jwt = require("jsonwebtoken");
const nonSecurePaths = ["/", "/login-html", "/login", "/register","/fetch-crab"];
const checkJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  try {
    let token = req.cookies.jwt;
    let verify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (verify) {
      next();
    }
  } catch (error) {
    return res.redirect("/login-html")
  }
};
module.exports = { checkJWT };
