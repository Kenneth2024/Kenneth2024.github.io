const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Apply the requireAuth middleware to protect routes
router.use(requireAuth);

// Display the video submission form
router.get('/add', (req, res) => {
  res.render('videos/add');
});

// Handle the video submission form
router.post('/add', (req, res) => {
  // Validate and process the submitted video URL
  // Add the video to your "database"
  // Redirect to the video dashboard or show a success message
});

router.get('/dashboard', (req, res) => {
    const videos = []; // Replace with actual logic to fetch videos
    res.render('videos/dashboard', { videos });
  });
  
  module.exports = router;