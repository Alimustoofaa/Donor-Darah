const db = require('../config/database');
const e = require('express');

const allPosts = async (req, res) => {
    if (req.isAuthenticated()){
        db.task('Get posts publish and draf', async t => {
            const postPublish = await t.any(`SELECT * FROM tbl_posts WHERE status = true`);
            const postDraf = await t.any(`SELECT * FROM tbl_posts WHERE status = false`);
            return { postPublish, postDraf}
        })
        .then(data => {
            res.render('posts/posts', {
                publish: data.postPublish,
                draf: data.postDraf,
                title: 'Content Post'
            })
        }).catch(e => {
            res.send(e)
        })
    } else {
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}

const deletePost = async (req, res) => {
    const { id, title } = req.body;
    await db.none(`DELETE FROM tbl_posts WHERE id = ${id}`)
    .then(() => { req.flash('success', `Post ${title} berhasil dihapus`); res.redirect('/posts'); })
    .catch(() => { req.flash('error', `Gagal menghapus post ${tittle} silahkan coba lagi`); res.redirect('/posts'); })
}

module.exports = {
    allPosts, deletePost
}