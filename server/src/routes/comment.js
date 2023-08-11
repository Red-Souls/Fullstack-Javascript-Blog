const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const authenticationMiddleware = require('../middlewares/authentication');

router.use('/getallbypost/:id/', commentController.getAllByPost);
router.use('/getcommentbyid/:id/', commentController.getCommentById);
router.use('/addcomment/', authenticationMiddleware, commentController.addComment);
router.use('/updatecomment/:id/', authenticationMiddleware, commentController.updateComment);
router.use('/deletecomment/:id/', authenticationMiddleware, commentController.deleteComment);

module.exports = router;