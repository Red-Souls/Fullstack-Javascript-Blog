const {Comment} = require('../models');

class CommentController {
    async getAllByPost(req, res) {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.json('Post id is not valid !');
        }
        const comments = await Comment.findAll({
            where: {
                post: id,
            },
            order: [['updatedAt', 'DESC']],
        });
        return res.json(comments);
    }

    async getCommentById(req, res) {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.json('Comment id is not valid !');
        }
        const comment = await Comment.findByPk(id);
        return res.json(comment);
    }

    addComment(req, res) {
        const request = req.body;
        Comment.create({
            post: request.post,
            user: request.user,
            username: request.username,
            content: request.content,
        })
        .catch(err => {
            console.log(err);
        });
        return res.json('Added comment successfully !');
    }

    async updateComment(req, res) {
        const request = req.body;
        const comment = await Comment.findByPk(req.params.id);
        comment.content = request.content;
        await comment.save();
        return res.json('Updated the comment successfully !');
    }

    async deleteComment(req, res) {
        const comment = await Comment.findByPk(req.params.id);
        await comment.destroy();
        return res.json('Deleted the comment successfully !');
    }
}

module.exports = new CommentController;