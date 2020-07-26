const express = require('express');
const router = express.Router();
const {allUser, getEditUser, editUser} = require('../controllers/usersController')

router.get('/', allUser)
router.get('/users/edit/:id', getEditUser)
router.post('/users/edit', editUser)

module.exports = router