const { body } = require('express-validator/check');

const editUserV = () => {
    const validate = [
        body('name', 'Invalid email').exists().isEmail()
    ]
    return validate    
}

module.exports = { editUserV }