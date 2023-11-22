exports.getProfile = (req, res) => {
    // Logic to fetch user profile data from file storage
    res.render('user/profile', { user: fetchedUserData });
};
