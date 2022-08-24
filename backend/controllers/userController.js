const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getNew = async (req, res) => {
  res.status(200);
};

//LOGIN USER
const loginUser = async (req, res) => {
  const [username, password] = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ msg: "Login user" });
};

//SIGNUP USER
const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ msg: "Signup user" });
};

module.exports = { loginUser, signupUser, getNew };
