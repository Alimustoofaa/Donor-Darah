const bcyrpt = require('bcryptjs')

// Hash Password
const saltRounds = 10;
const salt = bcyrpt.genSaltSync(saltRounds);
const hashPassword = password => bcyrpt.hashSync(password, salt)

// Compare password
const comparePassword = (password, hashPassword) => {
    return bcyrpt.compareSync(password, hashPassword);
}


module.exports = {
    hashPassword,
    comparePassword
}