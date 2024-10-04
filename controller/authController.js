const bcrypt = require('bcrypt');

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


module.exports = { signup, login };