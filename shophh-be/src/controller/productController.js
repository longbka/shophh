const db = require("../models");
const handleFetchCrab = async (req, res, next) => {
  try {
    let data = await db.Product.findAll({ where: { categoryId: 4 } });
    if (data && data.length > 0) {
      return res.status(200).json({
        EM: "Successfully",
        EC: 0,
        DT: data,
      });
    } else {
      return res.status(200).json({
        EM: "No data",
        EC: 1,
        DT: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      EM: "Failed from server",
      EC: 2,
      DT: [],
    });
  }
};
const handlePostProduct = async (req, res, next) => {
  //Get all the list category
  const categoryList = await db.Category.findAll({});
  res.render("postProduct.ejs", { categoryList });
};
const handleUploadProduct = async (req, res, next) => {
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  const name = req.body.nameProduct;
  const price = req.body.price;
  const discount = req.body.discount;
  const size = req.body.size;
  const imgUpload = req.body.imgUpload;
  const description = req.body.description;
  const category = req.body.category;
  const data = await db.Product.create({
    title: name,
    price: price,
    discount: discount,
    size: size,
    description: description,
    thumnail: "/image/" + req.file.filename,
    categoryId: category,
  });
  return res.redirect("back");
};
module.exports = { handlePostProduct, handleUploadProduct, handleFetchCrab };
