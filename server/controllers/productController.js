const addProduct = async (req, res) => {
  res.send("addProduct");
};

const listProducts = async (req, res) => {
  res.send("listProducts");
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
