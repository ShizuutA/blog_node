const db = require("../models");
const Posts = db.posts;

const session = require("express-session");

const fetchSession = async (req, res) => {
    let username = session.username;
    let admin = session.admin;
    let pfpdata = session.pfpdata;

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

module.exports = {
    fetchSession,
    fetchPosts,
};
