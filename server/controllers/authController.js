const register = async (req, res) => {
  res.send("register");
};

const login = async (req, res) => {
  res.send("login");
};

const adminLogin = async (req, res) => {
  res.send("adminLogin");
};

module.exports = { register, login, adminLogin };
