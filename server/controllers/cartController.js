const addToCart = async (req, res) => {
  res.send("add to cart");
};

const updateCart = async (req, res) => {
  res.send("update cart");
};

const getUserCart = async (req, res) => {
  res.send("get user cart");
};

module.exports = {
  addToCart,
  updateCart,
  getUserCart,
};
