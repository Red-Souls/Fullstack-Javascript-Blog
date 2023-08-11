const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const upload = require('../fileUpload');
const authenticationMiddleware = require('../middlewares/authentication');

router.use('/getall/', postController.getAll);
router.use('/addpost/', [upload.single('image'), authenticationMiddleware], postController.addPost);
router.use('/getbyid/:id/', postController.getById);
router.use('/getpostbyuser/:id/', postController.getPostByUser);
router.use('/getthreelatestposts/', postController.getThreeLastestPosts);
router.use('/updatepost/', [upload.single('image'), authenticationMiddleware], postController.updatePost);
router.use('/deletepost/:id/', authenticationMiddleware, postController.deletePost);

module.exports = router;