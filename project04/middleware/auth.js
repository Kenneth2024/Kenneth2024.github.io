const requireAuth = (req, res, next) => {
    const isAuthenticated = true; // Replace with actual authentication logic
    if (isAuthenticated) {
      next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      res.redirect('/login'); // Redirect to login page if not authenticated
    }
  };
  
  module.exports = { requireAuth };
  