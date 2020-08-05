const express = require('express');
const router = express.Router();
const {getCompany, editCompany} = require('../controllers/companyController')
const { editCompanyV } = require('../helpers/expressValidator')


router.get('/', getCompany)
router.post('/edit', editCompanyV(), editCompany)

module.exports = router