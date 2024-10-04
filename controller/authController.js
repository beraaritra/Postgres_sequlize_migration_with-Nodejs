const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { where } = require('sequelize');

// For Signup
const signup = async (req, res, nxt) => {
    const { userType, fristName, lastName, email, password, confirmPassword } = req.body;
    try {

        // Check if password and confirmPassword matches
        if (!userType || !fristName || !lastName || !email || !password || !confirmPassword) {
            console.log("All fields must be required".bgRed);
            return res.status(400).json({ success: false, message: "All fields must be required" });
        }

        // Check if email already exists
        const userAlreadyExists = await userModel.findOne({ where: { email } });
        if (userAlreadyExists) {
            console.log("user mail already exists".bgRed);
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // For check user type
        if (!['1', '2',].includes(userType)) {
            return res.status(400).json({ status: false, error: 'Invalid userType' });
        }

        const newUser = await userModel.create({
            userType,
            fristName,
            lastName,
            email,
            password,
            confirmPassword
        });

        // for response result to deleted password field and deletedAt field
        const user = newUser.toJSON();
        delete user.password;
        delete user.deletedAt;

        // Generate JWT token and
        user.token = generateTokenAndSetCookie({ id: user.id })

        console.log("New user created successfully".bgYellow);
        return res.status(201).json({ sucess: 'true', data: user });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log("Error in signup user:-  ".bgRed + error.message);
    }

};

// For Login
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        // here check the email and password fields
        if (!email || !password) {
            console.log('please enter the email id and password'.bgRed);
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Check if user have accout or valid email address
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            console.log("User not found".bgRed);

            return res.status(401).json({ success: false, message: "Email not found" });
        }

        // Check if password is correct  or valid
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (!isPasswordvalid) {
            console.log("Password is not correct".bgRed);
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Generate JWT token and
        const token = generateTokenAndSetCookie({ id: user.id })

        res.status(200).json({ success: true, message: "Login Successfully", token });
        console.log("Login Successfully".bgYellow);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log("Error in login user: ".bgRed + error.message);
    }

};

// For Authentication Routes
const authentications = async (req, res, next) => {
    // Get the token from headers
    let idToken = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return res.status(401).json({ success: false, message: "Authentication token missing" });
    }

    try {
        // Verify the token
        const decodedToken = await jwt.verify(idToken, process.env.JWT_SECRET);

        // Find the user by the decoded token's id
        const freshUser = await userModel.findByPk(decodedToken.id);
        if (!freshUser) {
            return res.status(401).json({ success: false, message: "User not found in the database" });
        }

        // Attach the user to the request object
        req.user = freshUser;

        // Move to the next middleware
        return next();
    } catch (error) {
        console.log("Error in authenticate user please login :- ".bgRed + error.message);
        return res.status(401).json({ success: false, message: "Invalid token: " + error.message });
    }
};


// For restricted routes 
const restricTo = (...userTypes) => {
    const checkPermission = async (req, res, next) => {
        // If the userType is not allowed, respond with an error
        if (!userTypes.includes(req.user.userType)) {
            return res.status(403).json({ success: false, message: "You don't have permission to perform this action" });
        }
        // Proceed to the next middleware
        next();
    };

    return checkPermission; // Return the async function
};


module.exports = { signup, login, authentications, restricTo };