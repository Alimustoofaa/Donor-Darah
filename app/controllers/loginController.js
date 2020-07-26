const passport = require('passport')

const loginUser = async (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    }else{
        res.render('login', {
            title: 'Login',
            error: res.locals.error,
            success:  res.locals.success
        })
    }
}

const logoutUser = async (req, res) => {
    if(req.isAuthenticated()){
        console.log(new Date())
        console.log('User [' + req.user.username + '] has logged out.')
        req.logout()
        res.redirect('/');
    }else{
        res.redirect('/')
    }
}

const postLoginUser = async (req, res, next) => {
    if (req.isAuthenticated()){
        req.flash('success', 'You are already logged in.')
        res.redirect('/')
    } else {
        let user = req.body.email
        let pass = req.body.password
        if (user.length === 0 || pass.length === 0){
            req.flash('error', 'You must provide a username and password.')
            res.redirect('/login')
        } else {
            next()
        }
    }
}

module.exports = {loginUser, logoutUser, postLoginUser}