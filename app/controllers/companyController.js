const db = require('../config/database');
const { validationResult, body } = require('express-validator/check')
const fs = require('fs-extra')


const getCompany = async (req, res) => {
    if(!req.isAuthenticated()) {
        db.one(`SELECT * FROM tbl_company`)
        .then(result => {
            res.render('company', {
                result: result,
                tittle: 'Data Company'
            })
             
         }).catch((err) => {
             res.send(err)
         });
    } else {
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}

const editCompany = async (req, res) => {
    if(!req.isAuthenticated()) {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
           for(let i =0; i < validationResult.length; i++){
                req.flash('error', errors.array()[i].msg), res.redirect('/company')
           }
        }
        const {
            id, name, address, email,
            tlp, website
        } = req.body;

        // if condition upload image file
        let imagePath;
        if (req.file){ imagePath = req.file.path };

        db.tx(t => {
            if(!req.file){
                t.none(`UPDATE tbl_company SET name = '${name}', address = '${address}', 
                        email = '${email}', tlp = '${tlp}', website = '${website}'
                        WHERE id = '${id}'`);
            } else{
                t.none(`UPDATE tbl_company SET name = '${name}', address = '${address}', 
                        email = '${email}', tlp = '${tlp}', website = '${website}', logo = '${imagePath}'
                        WHERE id = '${id}'`);    
            }
        })
        .then(() => { req.flash('success', 'User berhasil diedit'), res.redirect('/company')} )
        .catch(() => { req.flash('error', 'Gagal edit user silahkan coba lagi'), res.redirect('/company')} );
    }else{
        req.flash('error', 'Silahkan login dahulu')
        res.redirect('/login')
    }
}


module.exports = { getCompany, editCompany }