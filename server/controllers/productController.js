const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const addProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (image) => image !== undefined
  );

  const imagesUrl = await Promise.all(
    images.map((image) =>
      cloudinary.uploader.upload(image.path).then((result) => result.secure_url)
    )
  );

  const productData = {
    name,
    description,
    price: +price,
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    bestseller: bestseller === "true" ? true : false,
    date: Date.now(),
  };

  const product = await Product.create(productData);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      product,
    },
  });
};

const listProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      products,
    },
  });
};

const removeProduct = async (req, res) => {
  res.send("removeProduct");
};

const singleProduct = async (req, res) => {
  res.send("singleProduct");
};

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
