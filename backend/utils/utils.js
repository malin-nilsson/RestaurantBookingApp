const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashedPwd = (password) => {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
};

const comparePwd = (password, hash) => {
  const correct = bcrypt.compareSync(password, hash);
  return correct;
};

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.SECRET)) {
    const tokenData = jwt.decode(token, process.env.SECRET);
    if (tokenData.role !== "admin") {
      res.send("Unauthorized");
    } else {
      next();
    }
  } else {
    res.sendStatus(401);
  }
};

const validateUser = (name) => {
  let valid = true;

  valid = valid && name.username;
  valid = valid && name.username.length > 3;
  valid = valid && name.username.length < 20;
  valid = valid && name.username.indexOf(" ") < 0;

  return valid;
};

const nodemailer = require("nodemailer");

export async function confirmationMail() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"La Mere" <info@lamere.com>',
    to: "mikel@roffe.se",
    subject: "Your reservation at La Mere",
    text: "Thank you for making a reservation, you have a table for",
  });

  console.log("Message sent: %s", info.messageId);
}

confirmationMail().catch(console.error);

module.exports = {
  hashedPwd,
  comparePwd,
  adminAuth,
  validateUser,
};
