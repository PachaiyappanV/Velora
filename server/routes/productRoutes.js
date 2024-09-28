const express = require("express");
const router = express.Router();
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");

router.post("/addProduct", addProduct);
router.get("/listProducts", listProducts);
router.delete("/removeProduct", removeProduct);
router.get("/singleProduct", singleProduct);

module.exports = router;
