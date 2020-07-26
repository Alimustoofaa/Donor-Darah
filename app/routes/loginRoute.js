const express = require('express')
const router = express.Router()
const passport = require('passport')
const {logoutUser, loginUser, postLoginUser} = require('../controllers/loginController')

// Login user
router.get('/login', loginUser)

// Logout user
router.get('/logout', logoutUser)

// Post login user
router.post('/login', postLoginUser, 
    passport.authenticate('login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}))

module.exports = router