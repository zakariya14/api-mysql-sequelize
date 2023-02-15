const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const product2Controller = require("./controller");

router.get("/product", product2Controller.getAllData);
router.get("/product/:id", product2Controller.getAllDataByID);
router.post("/product", upload.single("image"), product2Controller.postData);

module.exports = router;
