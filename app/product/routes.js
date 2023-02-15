const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productController = require("./controller");

router.get("/product", productController.getAllData);
router.get("/product/:id", productController.getAllDataById);
router.post("/product/", upload.single("image"), productController.dataStore);
router.put("/product/:id", upload.single("image"), productController.updateData);
router.delete("/product/:id", upload.single("image"), productController.destroyData);

module.exports = router;
