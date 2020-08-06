const express = require('express');
const router = express.Router();
const {getCompany, editCompany} = require('../controllers/companyController')
const { editCompanyV } = require('../helpers/expressValidator')
const { upload } = require('../helpers/multer')

router.get('/', getCompany)
router.post('/edit', upload.single('image'), editCompanyV(), editCompany)

module.exports = router