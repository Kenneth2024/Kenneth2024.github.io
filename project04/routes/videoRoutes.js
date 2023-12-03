const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', (req, res) => {
    res.send("Hello from /videos");
});
router.get('/list', videoController.getVideoList);
router.get('/video/:id', videoController.getVideoDetail);

module.exports = router;