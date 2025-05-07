const db = require("../models");
const Users = db.users;

const sha1 = require("js-sha1");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = sha1(password);
  try {
    const user = await Users.findOne({
      where: { username: username, password: hashedPassword },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.session.username = user.username;
    req.session.rights = user.rights;
    req.session.pfpdata = user.pfpdata;
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Error logging in user" });
  }

  return res.redirect("/");
};

module.exports = {
  loginUser,
};
