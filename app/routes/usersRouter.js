const express = require('express');
const router = express.Router();
const {allUser, getEditUser, editUser, addUser, getAddUser} = require('../controllers/usersController')
const { editUserV, addUserV } = require('../helpers/expressValidator')

router.get('/', allUser)
router.get('/users/edit/:id', getEditUser)
router.post('/users/edit', editUserV(), editUser)
router.get('/users/add', getAddUser),
router.post('/users/add', addUserV(), addUser)

module.exports = router