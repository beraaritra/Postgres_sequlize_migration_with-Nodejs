const userModel = require('../models/user');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');

const signup = async (req, res, nxt) => {
    const body = req.body;
    try {

        // FOr check user type
        if (!['1', '2',].includes(body.userType)) {
            return res.status(400).json({ status: false, error: 'Invalid userType' });
        }

        const newUser = await userModel.create({
            userType: body.userType,
            fristName: body.fristName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword
        });

        // for response result to deleted password field and deletedAt field
        const result = newUser.toJSON();
        delete result.password;
        delete result.deletedAt;

        // Generate JWT token and
        result.token = generateTokenAndSetCookie({ id: result.id })

        console.log("New user created successfully".bgYellow);
        return res.status(201).json({ sucess: 'true', data: result });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

};


module.exports = { signup };