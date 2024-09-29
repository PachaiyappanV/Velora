const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");

router.post(
  "/addProduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.get("/listProducts", listProducts);
router.delete("/removeProduct", removeProduct);
router.get("/singleProduct", singleProduct);

module.exports = router;
