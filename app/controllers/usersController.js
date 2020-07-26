const db = require('../config/database')
const expres = require('express')
const moment = require('moment')
const { result } = require('../config/database')
const e = require('express')

const allUser = async (req, res) => {
    if (req.isAuthenticated()){
        await db.any(`SELECT 
                tbl_users.id AS idU, tbl_users.name AS name, tbl_users.email AS email,
                tbl_users.username AS username, tbl_users.role AS roleU, tbl_users.created AS created, 
                tbl_users.last_login AS last_login, tbl_users.status AS status,
                tbl_role.role AS role_name, tbl_role.id AS idR 
                FROM tbl_role INNER JOIN tbl_users ON tbl_role.id = tbl_users.role
                ORDER BY tbl_users.id DESC`)
        .then(results => {
            res.render('users', {
                results: results,
                tittle: 'Data Users'
            })
        })
        .catch(e => {throw e})
    } else {
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}

const editUser = async (req, res) => {
    let id = req.params.id
    if (req.isAuthenticated()){
        db.task('Get user role', async t => {
            const resultUser = await t.one(`SELECT * FROM tbl_users WHERE id = $1`, [id]);
            const resultRole = await t.any(`SELECT * FROM tbl_role`);
            return { resultUser, resultRole }
        })
        .then(data => {
           res.render('edit-user', {
                user: data.resultUser,
                role: data.resultRole,
                tittle: 'Data Users'
           })
            
        }).catch((err) => {
            res.send(err)
        });
            
    } else {
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}

module.exports = {allUser, editUser}