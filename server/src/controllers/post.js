const {Post} = require('../models');

class PostController {
    async getAll(req, res) {
        const posts = await Post.findAll({
            order: [['updatedAt', 'DESC']],
        });
        return res.json(posts);
    }

    addPost(req, res) {
        const request = req.body;
        const img = req.file;
        Post.create({
            user: request.user,
            title: request.title,
            content: request.content,
            image: img.path,
        })
        .catch(err => {
            console.log(err);
        });
        return res.json('Added a new post successfully !');
    }

    async getById(req, res) {
        if (!isNaN(req.params.id)) {
            const post = await Post.findByPk(req.params.id);
            return res.json(post);
        }
        return res.json('The param is not valid !');
    }

    async getPostByUser(req, res) {
        if (isNaN(req.params.id)) {
            return res.json('Param is not valid !');
        }
        const posts = await Post.findAll({
            where: {
                user: req.params.id,
            },
            order: [['updatedAt', 'DESC']],
        });
        return res.json(posts);
    }

    async getThreeLastestPosts(req, res) {
        const posts = await Post.findAll({
            limit: 3,
            order: [['updatedAt', 'DESC']],
        });
        return res.json(posts);
    }

    async updatePost(req, res) {
        const request = req.body;
        const img = req.file;
        const post = await Post.findByPk(request.postId);
        post.title = request.title;
        post.content = request.content;
        post.image = img.path;
        await post.save();
        return res.json('Updated the post successfully !');
    }

    async deletePost(req, res) {
        const post = await Post.findByPk(req.params.id);
        await post.destroy();
        return res.json('Deleted the post successfully !');
    }
}

module.exports = new PostController;