const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/list', videoController.getVideoList);
router.get('/details/:id', videoController.getVideoDetails);

module.exports = router;
