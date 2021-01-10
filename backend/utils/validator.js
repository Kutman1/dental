const { check } = require('express-validator')

const validateRegisterUser = () => [
    check('password')
        .isLength({ min: 6 })
        .withMessage('Минимальная длина пароля 6 символов'),
    check('phone')
        .isLength({ min: 9 })
        .withMessage('Минимальная длина номера 9 символов'),
    check('fullName').notEmpty().withMessage('Укажите полное ФИО'),
];


module.exports = {
    validateRegisterUser,
};
