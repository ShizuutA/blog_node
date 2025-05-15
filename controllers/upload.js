const fs = require("fs");

const sha1 = require('js-sha1');

const db = require("../models");
const session = require("express-session");
const Users = db.users;
const Posts = db.posts;
const Comments = db.comments;
const PostsImage = db.postsimage;

const createUser = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const hashedPassword = sha1(password);

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  let defaultAvatar = "/u/default-pfp.jpg";
  try {
    const user = await Users.create({
      username: username,
      password: hashedPassword,
      pfpdata: defaultAvatar,
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

const createPost = async (req, res) => {
  const { title, content, preview } = req.body;

  try {
    const post = await Posts.create({
      title: title,
      content: content,
      preview: preview,
      date: new Date(),
    });

    if (req.files) {
      await uploadPostImage(req, res, post.ID);
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const createComment = async (req, res, postId, username) => {
  const { comment } = req.body;
  
  try {
    await Comments.create({
      post_id: postId,
      user: username,
      content: comment,
      date: new Date(),
    });

    res.redirect("/posts/" + postId);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

const uploadPostImage = async (req, res, postId) => {
  try {
    if (req.files == undefined) {
      return res.send(`You must select a file.`);
    }
    if (req.files.length < 1) {
      req.files.forEach( async file => {
        await PostsImage.create({
      postId: postId,
      imageName: req.file[0].originalname,
      imageData: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file[0].filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );
    });
      return res.send(`File has been uploaded.`);
    });
  }
  } 
  catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
  

    
};

const uploadPfp = async (req, res, username) => {
  try {
    console.log("Uploaded file:", req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const filePath = "/u/" + username + ".jpg";
    await Users.update(
      {
        pfpname: username + ".jpg",
        pfpdata: filePath,
      },
      {
        where: { username: username },
      }
    )
    req.session.pfpdata = filePath;
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

const updateUserInfo = async (req, res, username) => {
  const { about } = req.body;

  try {
    await Users.update(
      {
        about: about,
      },
      {
        where: { username: username },
      }
    );

    res.redirect("/users/" + username);
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Error updating user info" });
  }
}

module.exports = {
  uploadPfp,
  updateUserInfo,
  uploadPostImage,
  createUser,
  createPost,
  createComment,
};