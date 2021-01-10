const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

class AuthService {

    async registerUser(data) {
        try {
            const {phone, password, fullName} = data;
            const existingUser = await User.findOne({phone});

            if (existingUser) {
                throw new Error('Пользователь с таким номером уже существует')
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                ...data,
                password: hashedPassword,
            });

            await user.save()


            const token = await jwt.sign(
                {
                    _id: user._id,
                    fullName,
                    phone
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h',
                }
            )

            return {
                token,
                user: {
                    phone,
                    id: user._id,
                    role: user.role,
                    fullName,
                    photo: user.photo
                },
            }
        } catch (e) {
            throw new Error(e.message)
        }
    };

    async loginUser(data) {
        try {
            const {phone, password} = data
            const user = await User.findOne({phone})
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw new Error('Вы ввели не правильный пароль')
            }
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

            return {
                token,
                user: {
                    email: user.email,
                    fullName: user.fullName,
                    phone: user.phone,
                    role: user.role,
                    _id: user.id,
                    photo: user.photo
                },
            }
        } catch (e) {
            throw new Error(e.message)
        }
    }
};
const authService = new AuthService()

module.exports = {
    authService,
}
