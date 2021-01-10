const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) {
            return res.status(401).json({error: "Зарегистрируйтесь пожалуйста."})
        }
        const {_id} = result;
        User.findById(_id).then(userData => {
            req.user = userData
            next();
        });
    })
};
