const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication');
const upload = require('../fileUpload');

router.use('/signup/', authenticationController.signUp);
router.use('/signin/', authenticationController.signIn);
router.use('/checkauth/', authenticationController.checkAuth);
router.use('/refresh/', authenticationController.refresh);
router.use('/signout/', authenticationController.signOut);
router.use('/getinfo/', authenticationController.getInfo);
router.use('/getuserbyid/:id/', authenticationController.getUserById);
router.use('/update/', upload.single('avatar'), authenticationController.update);

module.exports = router;