const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration routes
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);

// Login routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginUser);

module.exports = router;