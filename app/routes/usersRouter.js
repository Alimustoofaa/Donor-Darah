const express = require('express');
const router = express.Router();
const {allUser} = require('../controllers/usersController')

router.get('/', allUser)

module.exports = router