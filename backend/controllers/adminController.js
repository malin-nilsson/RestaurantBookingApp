const { Admin, AdminModel } = require("../models/adminModel");

// CREATE TOKEN FOR MONGO ID i.e. _id
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

// GET /ADMIN
const getAdminMain = (req, res) => {
  res.sendStatus(200);
};

// GET /AMIN/REGISTER
const getRegisterAdmin = async (req, res) => {
  res.sendStatus(200);
};

//LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const [username, password] = req.body;

  try {
    const admin = await Admin.login(username, password);

    // const token = createToken(admin._id);

    res.sendStatus(200).json({ username });
  } catch (error) {
    res.sendStatus(400).json({ error: error.message });
  }

  res.json({ msg: "Login Admin" });
};

//REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const { username, password, role, secret } = req.body;

  try {
    // const admin = await Admin.signup(username, password);
    console.log(AdminModel);

    const admin = await new AdminModel.create({
      username: username,
      password: utils.hashedPwd(password),
      role: role,
      secret: "",
    });

    // const token = createToken(admin._id);

    res.sendStatus(200).json({ username });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: error.message });
  }

  // res.json({ msg: "Register Admin" });
};

module.exports = { getAdminMain, loginAdmin, getRegisterAdmin, registerAdmin };
