const db = require("../models");
const comments = db.comments;

const delComment = async (req, res, postID, commentID) => {
    try {
        const deletedComment = await comments.destroy({
            where: {
                post_id: postID,
                id: commentID
            }
        });
        if (deletedComment) {
            res.redirect('/posts/' + postID);
        } else {
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Error deleting comment" });
    }
}

module.exports = {
    delComment,
}