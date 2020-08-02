const express = require('express');
const router = express.Router();
const {allUser, getEditUser, editUser, addUser, getAddUser, deleteUser} = require('../controllers/usersController')
const { editUserV, addUserV } = require('../helpers/expressValidator')

router.get('/', allUser)
router.get('/edit/:id', getEditUser)
router.post('/edit', editUserV(), editUser)
router.get('/add', getAddUser),
router.post('/add', addUserV(), addUser)
router.post('/delete', deleteUser)

module.exports = router