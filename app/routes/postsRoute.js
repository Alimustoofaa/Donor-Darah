const express = require('express');
const router = express.Router();
const { allPosts, deletePost } = require('../controllers/postsContoller');

router.get('/', allPosts);
router.post('/delete', deletePost);

module.exports = router