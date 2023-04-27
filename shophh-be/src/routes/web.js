const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const { handleHelloWorld } = require("../controller/home");
const { checkJWT } = require("../middlewares/jwt.js");
const {
  handleLoginForm,
  handleCheckLogin,
  handleUsersPage,
} = require("../controller/userController");
const {
  handlePostProduct,
  handleUploadProduct,
} = require("../controller/productController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoutes = (app) => {
  //user
  router.all("*", checkJWT);
  router.get("/home", handleHelloWorld);
  router.get("/login-html", handleLoginForm);
  router.get("/user", handleUsersPage);
  router.post("/login", handleCheckLogin);
  //product
  router.get("/post-product", handlePostProduct);
  router.post(
    "/upload-product",
    upload.single("imgUpload"),
    handleUploadProduct
  );
  app.use("/", router);
};
module.exports = { initWebRoutes };
