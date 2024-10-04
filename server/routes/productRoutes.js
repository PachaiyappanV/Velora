const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { authenticateAdmin } = require("../middleware/authentication");
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");

router
  .route("/")
  .post(
    authenticateAdmin,
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
    addProduct
  )
  .get(authenticateAdmin, listProducts);

router
  .route("/:id")
  .get(singleProduct)
  .delete(authenticateAdmin, removeProduct);

module.exports = router;
