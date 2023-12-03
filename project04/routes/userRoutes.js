const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile/:id', userController.getProfile);
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.registerUser);
router.get('/login', userController.getLoginPage);
router.post('/login', userController.loginUser);

module.exports = router;
