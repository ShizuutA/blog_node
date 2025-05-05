const db = require("../models");
const Posts = db.posts;
const Users = db.users;

const session = require("express-session");

const fetchSession = async (req, res) => {
    let username = session.username;
    let admin = session.admin;
    let pfpdata = session.pfpdata;

    if (admin != 'Admin') {
        admin = false;
    }
    if (!username) {
        username = false;
        admin = false;
        pfpdata = false;
    }
    return { username, admin, pfpdata };
}

const fetchPosts = async (req, res, post_numbers) => {
    let posts = await Posts.findAll({
        order: [['ID', 'DESC']],
        limit: post_numbers,
    });
    return posts;

}

const fetchUsers = async (req, res) => {
    let users = await Users.findAll({
        order: [['ID', 'DESC']],
    });
    return users;
}

const fetchUser = async (req, res, username) => {
    let user = await Users.findOne({
        where: {
            username: username,
        },
    });
    return user;
}

const userOwnPage = async (req, res, username, user) => {
    if (username = user.username) {
        return true;
    }
    else {
        return false;
    }
}


module.exports = {
    fetchSession,
    fetchPosts,
    fetchUsers,
    fetchUser,
    userOwnPage,
};
