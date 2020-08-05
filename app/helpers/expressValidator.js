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

const addUserV = () => {
    const validate = [
        body('name', 'Nama tidak valid').notEmpty().isLength({ min: 3, max:30 }),
        body('username', 'Username tidak valid').notEmpty().isLength({ min: 6, max:30 }),
        body('email', 'Email tidak validl').exists().isEmail(),
        body('role', 'Role tidak valid').isNumeric().isLength({ max: 1}),
        body('status', 'Status tidak valid').notEmpty().isLength({ min: 4, max:5 })
    ]
    return validate
}

const editCompanyV = () => {
    const validate = [
        body('id', 'id tidak valid').notEmpty().isNumeric().isLength({  max:2 }),
        body('name', 'Nama tidak valid').notEmpty().isLength({ min: 6, max:255 }),
        body('address', 'Alamat tidak valid').notEmpty(),
        body('email', 'Email tidak valid').notEmpty().isEmail(),
        body('tlp', 'Telephone tidak valid').notEmpty().isNumeric().isLength({ min: 8, max: 15}),
        body('website', 'Website tidak valid').notEmpty().isLength({ min: 7})
    ]
    return validate
}

module.exports = { editUserV, addUserV, editCompanyV}