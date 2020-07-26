const bcyrpt = require('bcryptjs')

// Hash Password
const saltRounds = 10;
const salt = bcyrpt.genSaltSync(saltRounds);
const hashPassword = password => bcyrpt.hashSync(password, salt)

// Compare password
const comparePassword = (password, hashPassword) => {
    return bcyrpt.compareSync(password, hashPassword);
}

const usernameRegex = (username) => {
   const regex = /^(?=.{8,20}$)[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
   return regex.test(username);
}

module.exports = {
    hashPassword,
    comparePassword,
    usernameRegex
}