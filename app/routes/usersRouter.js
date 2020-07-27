const express = require('express');
const router = express.Router();
const {allUser, getEditUser, editUser} = require('../controllers/usersController')
const { editUserV } = require('../helpers/expressValidator')

router.get('/', allUser)
router.get('/users/edit/:id', getEditUser)
router.post('/users/edit', editUserV(), editUser)

module.exports = router