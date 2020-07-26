const LocalStrategy = require('passport-local').Strategy
const db = require('./database')
const { comparePassword } = require('../helpers/validations');
const e = require('express');
const moment = require('moment')

let epochTime = moment().toDate().getTime();

module.exports = (passport) => {
    passport.serializeUser((user, done)=> {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    (req, email, password, done) => {
        loginUser();
        async function loginUser(){
            try {
                db.one('SELECT * FROM tbl_users WHERE email = $1', [email])
                .then(async(result) => {
                    if (!result.status){
                        return done(null, false, req.flash('error', "Akun anda belum aktif"))
                    }
                    if (!comparePassword(password, result.password)){
                        return done(null, false, req.flash('error', "Password yang anda masukkan salah"))
                    } else {
                        await db.none('UPDATE tbl_users SET last_login = NOW() WHERE email = $1', [email])
                        console.log('User [' + req.body.email + '] has logged in.')
                        return done(null, result)
                    }
                })
                .catch((e) => {
                    if(e.received == 0){
                        return done(null, false, req.flash('error', "Email yang anda masukkan salah"))
                    }
                })
            } catch (e) {
                throw(e)
            }
        }
    }))
}