const {validationResult} = require('express-validator')
const {authService} = require('../services/auth')
const User = require('../models/user');
class AuthController {
    createUser = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Некорректные данные при регистрации пользователя',
                    errors: errors.array(),
                })
            }
            const {token, user} = await authService.registerUser(req.body)
            console.log(req.body)
            return res.status(201).json({
                message: 'Пользователь создан',
                token,
                user,
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    };

    loginUser = async (req, res) => {
        try {
            const {token, user} = await authService.loginUser(req.body)
            return res.status(201).json({
                message: 'Success',
                token,
                user,
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    };
    getAllUsers = async (req, res) => {
        try {
            const users = await User.find({});
            return res.status(201).json({
                message: "Success",
                users
            })
        } catch(e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    }
    uploadUserPhoto = async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.user._id, {$set: {photo: req.body.photo}}, {new: true}, (err, result) => {
                if(err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                res.json(result)
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    }
}

const authController = new AuthController();

module.exports = {
    authController,
};
