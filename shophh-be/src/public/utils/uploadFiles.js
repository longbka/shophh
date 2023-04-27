function uploadFile(req, res, next) {
  const formidable = require("formidable");
  var form = new formidable.IncomingForm();
  form.uploadDir = "/image";
  form.keepExtensions = true;
  form.maxFiledsSize = 10 * 1024 * 1024;
  form.multiples = true;
  form.parse(req, (err, filds, files) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Cannot upload file. Error :${err}`,
      });
    }
    var arrayOfFiles = files[""];
    if (arrayOfFiles.length > 0) {
      var fileNames = [];
      arrayOfFiles.forEach((item) => {
        fileNames.push(eachFile.path);
      });
      res.json({
        result: "ok",
        data: { fileNames },
        numberOfImages: fileNames.length,
        message: `Upload image successfully`,
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        numberOfImages: 0,
        message: `No images to upload`,
      });
    }
  });
}
module.exports = { uploadFile };
