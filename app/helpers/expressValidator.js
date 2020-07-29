const { body } = require('express-validator/check');

const editUserV = () => {
    const validate = [
        body('name', 'Nama tidak valid').notEmpty().isLength({ min: 3, max:30 }),
        body('username', 'Username tidak valid').notEmpty().isLength({ min: 6, max:30 }),
        body('email', 'Email tidak validl').exists().isEmail(),
        body('role', 'Role tidak valid').isNumeric().isLength({ max: 1}),
        body('status', 'Status tidak valid').notEmpty().isLength({ min: 4, max:5 })
    ]
    return validate    
}

module.exports = { editUserV }