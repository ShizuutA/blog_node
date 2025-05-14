const db = require("../models");
const Posts = db.posts;
const Users = db.users;
const Comments = db.comments;

const fetchSession = async (req, res) => {
    let username = req.session.username;
    let admin = req.session.rights;
    let pfpdata = req.session.pfpdata;

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

const fetchPosts = async (req, res, post_numbers, offset) => {
    let posts = await Posts.findAll({
        order: [['ID', 'DESC']],
        limit: post_numbers,
        offset: offset, 

    });
    return posts;
}

const fetchPostsPageLimit = async (req, res) => {
    let posts = await Posts.findAll({
        order: [['ID', 'DESC']],
    });
    return posts.length;
}

const fetchPost = async (req, res, post_id) => {
    let post = await Posts.findOne({
        where: {
            ID: post_id,
        },
    });
    return post;
}

const fetchComments = async (req, res, post_id) => {
    let comments = await Comments.findAll({
        where: {
            post_id: post_id,
        },
        order: [['ID', 'DESC']],
    });
    return comments;
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

const fetchUserComments = async (req, res, username) => {
    let comments = await Comments.findAll({
        where: {
            username: username,
        },
        order: [['ID', 'DESC']],
    });
    return comments;
}


module.exports = {
    fetchSession,
    fetchPosts,
    fetchPost,
    fetchComments,
    fetchUsers,
    fetchUser,
    userOwnPage,
    fetchPostsPageLimit,
    fetchUserComments,
};
