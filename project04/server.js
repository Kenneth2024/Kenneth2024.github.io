const express = require('express');
const app = express();
const port = 3000;

// Middleware and configuration

// Routes
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);

// Server start
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});