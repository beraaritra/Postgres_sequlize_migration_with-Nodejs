const signup = (req, res, nxt) => {
    res.json({ status: "success", message: "signup Routes are working" })
};


module.exports = { signup };