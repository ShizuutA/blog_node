const fs = require("fs");

const sha1 = require('js-sha1');

const generateAvatar = require("../middleware/generateAvatar");

const db = require("../models");
const Users = db.users;


const createUser = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const hashedPassword = sha1(password);

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  let pfpdata = generateAvatar(username);
  try {
    const user = await Users.create({
      username: username,
      password: hashedPassword,
      pfpdata: pfpdata,
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

const uploadPfp = async (req, res, username) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    await Users.update(
      {
        pfpname: req.file.originalname,
        pfpdata: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
      },
      {
        where: { username: username },
      }
    ).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadPfp,
  createUser,
};