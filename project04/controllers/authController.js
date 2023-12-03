// Import any necessary modules for user registration logic

// Simulated database to store user records (replace this with a real database)
const userDatabase = [];

exports.getRegisterPage = (req, res) => {
    res.render('auth/register');
};

exports.registerUser = (req, res) => {
    const { email, name, password } = req.body;

    // Check if all information is available
    if (!email || !name || !password) {
        // Redirect back to registration form with an error message
        return res.render('auth/register', { error: 'All fields are required', email, name });
    }

    // Check if the email is unique (you might want to improve this check)
    const isEmailUnique = !userDatabase.some(user => user.email === email);

    if (!isEmailUnique) {
        // Redirect back to registration form with an error message
        return res.render('auth/register', { error: 'Email is already registered', email, name });
    }

    // Store the user data in the simulated database
    const newUser = { email, name, password };
    userDatabase.push(newUser);

    // Render the "Account Created" page with a link to the login page
    res.render('auth/accountCreated', { email });
};

// Import any necessary modules for user login logic

exports.getLoginPage = (req, res) => {
    res.render('auth/login');
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Check if all information is available
    if (!email || !password) {
        // Redirect back to login form with an error message
        return res.render('auth/login', { error: 'Both email and password are required', email });
    }

    // Check if the user exists in the simulated database
    const user = userDatabase.find(user => user.email === email && user.password === password);

    if (!user) {
        // Redirect back to login form with an error message
        return res.render('auth/login', { error: 'Invalid email or password', email });
    }

    // Render the user's profile page (you might want to redirect to a dashboard or another page)
    res.redirect(`/users/profile/:id`); // You might need to replace :id with the actual user ID
};
