const express = require('express');
const router = express.Router();
const {allUser, editUser} = require('../controllers/usersController')

router.get('/', allUser)
router.get('/users/edit/:id', editUser)

module.exports = router