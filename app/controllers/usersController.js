const db = require('../config/database')
const expres = require('express')
const moment = require('moment')
const { result } = require('../config/database')
const e = require('express')
const { usernameRegex, hashPassword, passwordRegex}  = require('../helpers/validations')
const { validationResult } = require('express-validator/check')
const { assert, empty } = require('joi')

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

const getEditUser = async (req, res) => {
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

const editUser = async (req, res) => {
    if (req.isAuthenticated()){
        // Validation
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()){
           for(let i =0; i < validationResult.length; i++){
                req.flash('error', errors.array()[i].msg), res.redirect('/users/edit/'+req.body.id)
           }
        }
        const { 
            name, username, email, 
            newPass, newPassKonf, status, id 
        } = req.body
        if (!usernameRegex(username)) { req.flash('error', 'Format username salah'), res.redirect('/users/edit/'+id) };
        await db.any(`SELECT email, username FROM tbl_users 
                    WHERE email = (SELECT email FROM tbl_users WHERE NOT id = ${id})
                    OR username = (SELECT username FROM tbl_users WHERE NOT id = ${id})`)
        .then(async (result) => {
            if (result.length > 0) {
                // Check email
                if (result[0].email) { req.flash('error', 'Email sudah digunakan'), res.redirect('/users/edit/'+id) };
                // Check username
                if (result[0].username) { req.flash('error', 'Username sudah digunakan'), res.redirect('/users/edit/'+id) };
            }

            // new Password and new password Konfirmasi empty
            if (newPass == '' && newPassKonf == '') {
                await db.none(`UPDATE tbl_users SET name = '${name}', username = '${username}',
                                email = '${email}', status = '${status}'  WHERE id = ${id}`)
                .then(() => { req.flash('success', 'User berhasil diedit'), res.redirect('/')} )
                .catch(() => { req.flash('error', 'Gagal edit user silahkan coba lagi'), res.redirect('/users/edit/'+id)} );
            } else {
                if ( !passwordRegex(newPass)) { req.flash('error', 'Password validasi salah'), res.redirect('/users/edit/'+id)};
                if ( !passwordRegex(newPassKonf)) { req.flash('error', 'Password validasi salah'), res.redirect('/users/edit/'+id)};

                if (newPass != newPassKonf) { 
                    req.flash('error', 'New Password dan Konfirmasi password tidak sama'), res.redirect('/users/edit/'+id) 
                };

                let newpassHash = await hashPassword(newPass);
                await db.none( `UPDATE tbl_users SET name = '${name}', username = '${username}',
                                email = '${email}', password = '${newpassHash}', status = '${status}'  WHERE id = ${id}`)
                .then(() => { req.flash('success', 'User berhasil diedit'), res.redirect('/')} )
                .catch(() => { req.flash('error', 'Gagal edit user silahkan coba lagi'), res.redirect('/users/edit/'+id)} )
            }           
        }).catch(() => { req.flash('error', 'Silahkan coba lagi'), res.redirect('/users/edit/'+id)} );
    } else {
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}

module.exports = {allUser, getEditUser, editUser}