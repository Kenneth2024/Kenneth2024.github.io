const express = require('express');
const app = express();
const path = require('path');

// Middleware and configuration

const requireAuth = (req, res, next) => {
    next();
  };
  
  module.exports = { requireAuth };

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('Welcome to the Video Sharing App!');
});

app.get('/', (req, res) => {
    const layout = require('./views/layout');
    res.render(layout);
});

app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);

// Root route
app.use(express.urlencoded({ extended: true })); 

// Server start
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}